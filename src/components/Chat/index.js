import _                  from 'lodash';
import Icon               from '../Icon';
import IconTheme          from '../Icon/IconTheme';
import IconType           from '../../components/Icon/IconType';
import styles             from './styles.module.scss';
import { connect }        from 'react-redux';
import { useEffect }      from 'react';
import { ChatActions }    from '../../store/actions/chat';
import { WebsocketsActions }    from '../../store/actions/websockets';
import { useRef }         from 'react';
import { useState }       from 'react';
import Input              from '../Input';
import classNames         from 'classnames';

import ChatMessageWrapper from '../ChatMessageWrapper';
import ChatMessageType    from '../ChatMessageWrapper/ChatMessageType';

const Chat = ({ className, userId, event, messages, connected, fetchChatMessages, sendChatMessage }) => {
    const messageListRef                  = useRef();
    const [message, setMessage]           = useState('');

    const eventId =  _.get(event, '_id');

    useEffect(() => {
        if(eventId) {
            fetchChatMessages(eventId);
        }
    }, [eventId, fetchChatMessages]);

    useEffect(
        () => {
            messageListScrollToBottom();
        }, [messages]
    );

    const onMessageSend = () => {
        if (message) {
            const messageData = {
                type: ChatMessageType.chatMessage,
                message: message,
                date: new Date(),
                eventId,
                userId,
            };

            sendChatMessage( messageData);
            setMessage('');
        }
    };

    const renderMessages = () => {
        return _.map(
            messages,
            (chatMessage, index) => {
                const userId = _.get(chatMessage, 'userId');
                const date   = _.get(chatMessage, 'date');

                return <ChatMessageWrapper
                    key={index}
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

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.authentication.userId,
        messages: state.chat.messagesByEvent[_.get(ownProps.event, '_id')] || [],
        connected: state.websockets.connected
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        fetchChatMessages: (eventId) => {
            dispatch(ChatActions.fetch({ eventId }));
        },
        sendChatMessage: (messageObject) => {
            dispatch(WebsocketsActions.sendChatMessage({ messageObject }));
        },

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Chat);
