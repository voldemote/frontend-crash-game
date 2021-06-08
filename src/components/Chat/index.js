import _               from 'lodash';
import ApiConstants    from '../../constants/Api';
import ChatMessage     from '../ChatMessage';
import Icon            from '../Icon';
import IconTheme       from '../Icon/IconTheme';
import IconType        from '../../components/Icon/IconType';
import styles          from './styles.module.scss';
import { connect }     from 'react-redux';
import { useEffect }   from 'react';
import { UserActions } from '../../store/actions/user';
import { useRef }      from 'react';
import { useState }    from 'react';
import Input           from '../Input';
import classNames      from 'classnames';
import { io }          from 'socket.io-client';

const Chat = ({ className, token, event, fetchUser }) => {
    const websocket                       = useRef(null);
    const messageListRef                  = useRef();
    const [message, setMessage]           = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const createSocket = () => {
        const socket = io(
            ApiConstants.getBackendUrl(),
            {
                query:        `token=${token}`,
                extraHeaders: { Authorization: `Bearer ${token}` },
            },
        );

        return socket;
    };

    const getCurrentSocket = () => {
        return websocket.current;
    };

    useEffect(
        () => {
            const createdSocket = createSocket();

            createdSocket.on('connect', () => {
                console.debug('opened socket');

                sendJoinRoom();
            });

            createdSocket.on('chatMessage', data => {
                const userId  = data.userId;
                const message = {
                    message: data.message,
                    date:    data.date,
                    userId,
                };

                fetchUser(userId);
                addNewMessage(message);
            });

            websocket.current = createdSocket;

            return () => createdSocket.disconnect();
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
        getCurrentSocket().emit('message', object);
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
        messageListScrollToBottom();
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

    const messageListScrollToBottom = () => {
        if (messageListRef) {
            messageListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            className={classNames(
                styles.chatContainer,
                className,
            )}
        >
            <div className={styles.messageContainer}>
                {renderMessages()}
                <span ref={messageListRef}>
                </span>
            </div>
            <div className={styles.messageContainerRunOut}>
            </div>
            <div className={styles.messageInput}>
                <Input
                    type={'text'}
                    placeholder={'Comment...'}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onSubmit={onMessageSend}
                />
                <button
                    type={'submit'}
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
