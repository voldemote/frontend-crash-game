import _                  from 'lodash';
import ApiConstants       from '../../constants/Api';
import Icon               from '../Icon';
import IconTheme          from '../Icon/IconTheme';
import IconType           from '../../components/Icon/IconType';
import styles             from './styles.module.scss';
import { connect }        from 'react-redux';
import { useEffect }      from 'react';
import { UserActions }    from '../../store/actions/user';
import { useRef }         from 'react';
import { useState }       from 'react';
import Input              from '../Input';
import classNames         from 'classnames';
import { io }             from 'socket.io-client';
import ChatMessageWrapper from '../ChatMessageWrapper';
import ChatMessageType    from '../ChatMessageWrapper/ChatMessageType';

const Chat = ({ className, token, event, fetchUser }) => {
    const websocket                       = useRef(null);
    const messageListRef                  = useRef();
    const [message, setMessage]           = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const createSocket = () => {
        const socket = io(
            ApiConstants.getBackendSocketUrl(),
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

            createdSocket.on('betPlaced', data => {
                addNewBetPlace(data);
            });

            websocket.current = createdSocket;

            return () => createdSocket.disconnect();
        },
        [token],
    );

    const getEventObject = () => {
        return {
            eventId: _.get(event, '_id'),
        };
    };

    const sendJoinRoom = () => {
        sendObject('joinRoom', getEventObject());
    };

    const sendObject = (eventName, data) => {
        getCurrentSocket().emit(eventName, data);
    };

    const onMessageSend = () => {
        const messageData = {
            message: message,
            ...getEventObject(),
        };

        sendObject('chatMessage', messageData);
        setMessage('');
    };

    const addNewMessage = (message) => {
        const chatMessage = {
            type: ChatMessageType.chatMessage,
            ...message,
        };

        setChatMessages(chatMessages => [...chatMessages, chatMessage]);
        messageListScrollToBottom();
    };

    const addNewBetPlace = (betPlaceData) => {
        const chatMessage = {
            type: ChatMessageType.placeBet,
            ...betPlaceData,
        };
        const userId      = _.get(betPlaceData, 'userId');

        if (userId) {
            fetchUser(userId);
        }

        setChatMessages(chatMessages => [...chatMessages, chatMessage]);
        messageListScrollToBottom();
    };

    const renderMessages = () => {
        return _.map(
            chatMessages,
            (chatMessage, index) => {
                const userId = _.get(chatMessage, 'userId');
                const date   = _.get(chatMessage, 'date');

                return <ChatMessageWrapper
                    message={chatMessage}
                    userId={userId}
                    date={date}
                />;
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
