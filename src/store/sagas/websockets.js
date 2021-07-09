import { take, put, call, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'


import _                  from 'lodash';
import ChatMessageType    from '../../components/ChatMessageWrapper/ChatMessageType';
import { ChatActions }             from '../actions/chat';
import { NotificationActions }             from '../actions/notification';
import { WebsocketsActions }             from '../actions/websockets';

import {createSocket, websocket} from '../../api/websockets'


function createSocketChannel(socket) {
    return eventChannel(emit => {

        const connectHandler = () => {

            const message = {
                type: 'connect'
            }
            emit(message)
        }
        const chatMessageHandler = (event) => {
            const message = {
                type: ChatMessageType.chatMessage,
                ...event,
            };

            emit(message)
        }
        const addBetCreatedHandler = (event) => {
            const message = {
                type: ChatMessageType.createBet,
                ...event,
            };
            emit(message)
        };

        const addNewBetPlaceHandler = (event) => {
            const message = {
                type: ChatMessageType.placeBet,
                ...event,
            };
            emit(message)
        };

        const addNewBetPullOutHandler = (event) => {
            const message = {
                type: ChatMessageType.pulloutBet,
                ...event,
            };
            emit(message)
        };

        const notificationHandler = (notification) => {
            emit({
                type: 'notification',
                ...notification
            })
        }

        const errorHandler = (errorEvent) => {
            // create an Error object and put it into the channel
            emit(new Error(errorEvent.reason))
        }

        // setup the subscription
        socket.on('connect', connectHandler)
        socket.on('chatMessage', chatMessageHandler)
        socket.on('betCreated', addBetCreatedHandler)
        socket.on('betPlaced', addNewBetPlaceHandler)
        socket.on('betPulledOut', addNewBetPullOutHandler)
        socket.on('notification', notificationHandler)
        socket.on('error', errorHandler)

        const unsubscribe = () => {
            socket.off('chatMessage', chatMessageHandler)
            socket.off('betCreated', addBetCreatedHandler)
            socket.off('betPlaced', addNewBetPlaceHandler)
            socket.off('betPulledOut', addNewBetPullOutHandler)
            socket.off('notification', notificationHandler)
        }

        return unsubscribe
    })
}

const notificationTypes = {
    EVENT_START: 'Notification/EVENT_START',
    EVENT_RESOLVE: 'Notification/EVENT_RESOLVE',
    EVENT_CANCEL: 'Notification/EVENT_CANCEL',
}

export function* init() {
    const token = yield select(state => state.authentication.token);
    if(token) {
        try {
            const socket = yield call(createSocket, token);
            yield put(WebsocketsActions.initSucceeded());
            const socketChannel = yield call(createSocketChannel, socket)

            while (true) {
                try {
                    // An error from socketChannel will cause the saga jump to the catch block
                    const payload = yield take(socketChannel);
                    // @TODO: remove when finished debugging
                    console.log(payload)
                    switch(payload.type) {
                        case 'connect':
                            yield put(WebsocketsActions.connected());
                            break;
                        case ChatMessageType.pulloutBet:
                        case ChatMessageType.createBet:
                        case ChatMessageType.placeBet:
                        case ChatMessageType.chatMessage:
                            yield put(ChatActions.addMessage({eventId: payload.eventId, message: payload}));
                            break;
                        case 'notification':
                        case notificationTypes.EVENT_CANCEL:
                        case notificationTypes.EVENT_RESOLVE:
                        case notificationTypes.EVENT_START:
                            yield put(NotificationActions.addNotification({eventId: payload.eventId, notification: payload}));
                            break;
                    }

                } catch(err) {
                    console.error('socket error:', err)
                    // socketChannel is still open in catch block
                    // if we want end the socketChannel, we need close it explicitly
                    // socketChannel.close()
                }
            }
        } catch(error) {
            yield put(WebsocketsActions.initFailed({error}));
        }

    }
}


export function* joinOrLeaveRoomOnRouteChange(action) {
    const connected = yield select(state => state.websockets.connected);

    if(!connected) {
        yield call(init);
        // @TODO: we need to call/fork from init to join-or-leave
    } else {
        const userId = yield select(state => state.authentication.userId);
        const room = yield select(state => state.websockets.room);
        let eventId = null;
        const pathname = action.payload.location.pathname;
        const pathSlugs = pathname.slice(1).split('/');
        // event page
        if (pathSlugs[0] === 'trade') {
            eventId = pathSlugs[1];
            if (eventId !== room) {
                if(room) {
                    yield put(WebsocketsActions.leaveRoom({
                        userId,
                        eventId: room,
                    }));
                }
                yield put(WebsocketsActions.joinRoom({
                    userId,
                    eventId,
                }));
            }

        } else {
            if(room) {
                yield put(WebsocketsActions.leaveRoom({
                    userId,
                    eventId: room,
                }));
            }
            yield put(WebsocketsActions.joinRoom({
                userId,
                eventId: 'undefinedEventId',
            }));
        }
    }

}
export function* joinRoom(action) {
    const init = yield select(state => state.websockets.init);
    const connected = yield select(state => state.websockets.connected);
    if (init && websocket && connected) {
        websocket.emit('joinRoom', action);
    }
}
export function* leaveRoom(action) {
    const init = yield select(state => state.websockets.init);
    if (init && websocket) {
        websocket.emit('leaveRoom', action);
    }
}
export function* sendChatMessage(action) {
    const init = yield select(state => state.websockets.init);
    const connected = yield select(state => state.websockets.connected);
    if (init && websocket && connected) {
        websocket.emit('chatMessage', action.messageObject);
    }
}

export default {
    init,
    joinRoom,
    leaveRoom,
    sendChatMessage,
    joinOrLeaveRoomOnRouteChange,
};
