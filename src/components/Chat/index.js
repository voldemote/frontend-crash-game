import _                                from 'lodash';
import ApiConstants                     from '../../constants/Api';
import ChatMessage                      from '../ChatMessage';
import Icon                             from '../Icon';
import IconTheme                        from '../Icon/IconTheme';
import IconType                         from '../../components/Icon/IconType';
import styles                           from './styles.module.scss';
import { connect }                      from 'react-redux';
import { useEffect }                    from 'react';
import { UserActions }                  from '../../store/actions/user';
import { useRef }                       from 'react';
import { useState }                     from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const Chat = ({ token, event, fetchUser }) => {
    const websocket                       = useRef(null);
    const [message, setMessage]           = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const createSocket = () => {
        const socket = new W3CWebSocket(
            ApiConstants.getBackendSocketUrl() + '/' + token,
        );

        return socket;
    };

    const getCurrentSocket = () => {
        return websocket.current;
    };

    useEffect(
        () => {
            const createdSocket = createSocket();

            createdSocket.onopen = () => {
                console.debug('opened socket');

                sendJoinRoom();
            };

            createdSocket.onmessage = (messageEvent) => {
                const data = JSON.parse(messageEvent.data);

                if (data.event === 'chat') {
                    const userId  = data.userId;
                    const message = {
                        message: data.message,
                        date:    data.date,
                        userId,
                    };
                    fetchUser(userId);

                    addNewMessage(message);
                }
            };

            websocket.current = createdSocket;
        },
        [token],
    );

    const getEventObject = (type) => {
        return {
            event:   type,
            eventId: _.get(event, '_id'),
        };
    };

    const sendJoinRoom = () => {
        sendObject(getEventObject('joinRoom'));
    };

    const sendObject = (object) => {
        getCurrentSocket().send(JSON.stringify(
            object,
        ));
    };

    const onMessageSend = () => {
        const messageData = {
            message: message,
            ...getEventObject('chat'),
        };

        sendObject(messageData);
        setMessage('');
    };

    const addNewMessage = (message) => {
        setChatMessages(chatMessages => [...chatMessages, message]);
    };

    const renderMessages = () => {
        return _.map(
            chatMessages,
            (chatMessage, index) => {
                return (
                    <ChatMessage
                        key={index}
                        userId={chatMessage.userId}
                        message={chatMessage.message}
                        date={chatMessage.date}
                    />
                );
            },
        );
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chat}>
                {renderMessages()}
            </div>
            <div className={styles.messageInput}>
                <input
                    type={'text'}
                    placeholder={'Comment...'}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button
                    type="submit"
                    onClick={onMessageSend}
                >
                    <Icon
                        iconType={IconType.chat}
                        iconTheme={IconTheme.primary}
                    />
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.authentication.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (userId) => {
            dispatch(UserActions.fetch({ userId }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Chat);
