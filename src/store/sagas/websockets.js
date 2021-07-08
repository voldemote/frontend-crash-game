import { take, put, call, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'


import _                  from 'lodash';
import ChatMessageType    from '../../components/ChatMessageWrapper/ChatMessageType';
import { ChatActions }             from '../actions/chat';
import { WebsocketsActions }             from '../actions/websockets';

import {createSocket, websocket} from '../../api/websockets'


function createSocketChannel(socket) {
    return eventChannel(emit => {

        const connectHandler = () => {
            debugger;
            const message = {
                type: 'connect'
            }
            emit(message)
        }
        const chatMessageHandler = (event) => {
            debugger;
            const message = _.pick(event,['message', 'date', 'eventId', 'userId']);
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
        socket.on('error', errorHandler)

        const unsubscribe = () => {
            socket.off('chatMessage', chatMessageHandler)
            socket.off('betCreated', addBetCreatedHandler)
            socket.off('betPlaced', addNewBetPlaceHandler)
            socket.off('betPulledOut', addNewBetPullOutHandler)
        }

        return unsubscribe
    })
}

export function* init() {
    const token = yield select(state => state.authentication.token);
    if(token) {
        try {
            const socket = yield call(createSocket, token);
            debugger;
            yield put(WebsocketsActions.initSucceeded());
            const socketChannel = yield call(createSocketChannel, socket)

            while (true) {
                try {
                    // An error from socketChannel will cause the saga jump to the catch block
                    const payload = yield take(socketChannel);
                    console.log(payload)
                    switch(payload.type) {
                        case 'connect':
                            yield put(WebsocketsActions.connected());
                            break;
                        case ChatMessageType.pulloutBet:
                        case ChatMessageType.createBet:
                        case ChatMessageType.placeBet:
                        case ChatMessageType.chatMessage:
                            debugger;
                            yield put(ChatActions.addMessage({eventId: payload.eventId, message: payload}));
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
};
