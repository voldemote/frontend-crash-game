import { take, put, call, select } from 'redux-saga/effects';
import { eventChannel, END }       from 'redux-saga';

import _                     from 'lodash';
import ChatMessageType       from '../../components/ChatMessageWrapper/ChatMessageType';
import { ChatActions }       from '../actions/chat';
import { WebsocketsActions } from '../actions/websockets';

import { createSocket, websocket } from '../../api/websockets';
import { createMatchSelector }     from 'connected-react-router';
import Routes                      from '../../constants/Routes';
import { matchPath }               from 'react-router';

function createSocketChannel (socket) {
    return eventChannel(emit => {
        const connectHandler       = () => {
            const message = {
                type: 'connect',
            };

            emit(message);
        };
        const chatMessageHandler   = (event) => {
            const message = {
                type: ChatMessageType.chatMessage,
                ...event,
            };

            emit(message);
        };
        const addBetCreatedHandler = (event) => {
            const message = {
                type: ChatMessageType.createBet,
                ...event,
            };

            emit(message);
        };

        const addNewBetPlaceHandler = (event) => {
            const message = {
                type: ChatMessageType.placeBet,
                ...event,
            };

            emit(message);
        };

        const addNewBetPullOutHandler = (event) => {
            const message = {
                type: ChatMessageType.pulloutBet,
                ...event,
            };

            emit(message);
        };

        const errorHandler = (errorEvent) => {
            // create an Error object and put it into the channel
            emit(new Error(errorEvent.reason));
        };

        // setup the subscription
        socket.on('connect', connectHandler);
        socket.on('chatMessage', chatMessageHandler);
        socket.on('betCreated', addBetCreatedHandler);
        socket.on('betPlaced', addNewBetPlaceHandler);
        socket.on('betPulledOut', addNewBetPullOutHandler);
        socket.on('error', errorHandler);

        const unsubscribe = () => {
            socket.off('chatMessage', chatMessageHandler);
            socket.off('betCreated', addBetCreatedHandler);
            socket.off('betPlaced', addNewBetPlaceHandler);
            socket.off('betPulledOut', addNewBetPullOutHandler);
        };

        return unsubscribe;
    });
}

export function* init () {
    const token = yield select(state => state.authentication.token);

    if (token) {
        try {
            const socket        = yield call(createSocket, token);
            const socketChannel = yield call(createSocketChannel, socket);

            yield put(WebsocketsActions.initSucceeded());

            while (true) {
                try {
                    const payload = yield take(socketChannel);
                    const type    = _.get(payload, 'type');

                    switch (type) {
                        case 'connect':
                            yield put(WebsocketsActions.connected());
                            break;
                        case ChatMessageType.pulloutBet:
                        case ChatMessageType.createBet:
                        case ChatMessageType.placeBet:
                        case ChatMessageType.chatMessage:
                            yield put(ChatActions.addMessage({ eventId: payload.eventId, message: payload }));
                            break;
                    }

                } catch (err) {
                    console.error('socket error:', err);
                    // socketChannel is still open in catch block
                    // if we want end the socketChannel, we need close it explicitly
                    // socketChannel.close()
                }
            }
        } catch (error) {
            yield put(WebsocketsActions.initFailed({ error }));
        }

    }
}

export function* joinOrLeaveRoomOnRouteChange (action) {
    const connected = yield select(state => state.websockets.connected);
    if (!connected) {
        yield call(init);
        // @TODO: we need to call/fork from init to join-or-leave
    } else {
        const userId    = yield select(state => state.authentication.userId);
        const room      = yield select(state => state.websockets.room);
        let eventId     = null;
        const pathname  = action.payload.location.pathname;
        const pathSlugs = pathname.slice(1).split('/');

        // event page
        if (pathSlugs[0] === 'trade') {
            eventId = pathSlugs[1];

            if (eventId !== room) {
                if (room) {
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
            if (room) {
                yield put(WebsocketsActions.leaveRoom({
                    userId,
                    eventId: room,
                }));
            }
        }
    }

}

export function* connected (action) {
    const location          = yield select(state => state.router.location);
    const matchesTradeRoute = matchPath(location.pathname, Routes.bet);

    if (matchesTradeRoute) {
        const { params }  = yield select(state => createMatchSelector({ path: Routes.bet })(state));
        const { eventId } = params;

        if (eventId) {
            const userId = yield select(state => state.authentication.userId);

            yield put(WebsocketsActions.joinRoom({
                userId,
                eventId,
            }));
        }
    }
}

export function* joinRoom (action) {
    const init      = yield select(state => state.websockets.init);
    const connected = yield select(state => state.websockets.connected);

    if (init && websocket && connected) {
        websocket.emit('joinRoom', action);
    }
}

export function* leaveRoom (action) {
    const init = yield select(state => state.websockets.init);

    if (init && websocket) {
        websocket.emit('leaveRoom', action);
    }
}

export function* sendChatMessage (action) {
    const init      = yield select(state => state.websockets.init);
    const connected = yield select(state => state.websockets.connected);

    if (init && websocket && connected) {
        websocket.emit('chatMessage', action.messageObject);
    }
}

export default {
    init,
    connected,
    joinRoom,
    leaveRoom,
    sendChatMessage,
    joinOrLeaveRoomOnRouteChange,
};
