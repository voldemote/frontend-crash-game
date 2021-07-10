import _                     from 'lodash';
import ChatMessageType       from '../ChatMessageWrapper/ChatMessageType';
import ChatMessageWrapper    from '../ChatMessageWrapper';
import classNames            from 'classnames';
import Icon                  from '../Icon';
import IconTheme             from '../Icon/IconTheme';
import IconType              from '../../components/Icon/IconType';
import Input                 from '../Input';
import styles                from './styles.module.scss';
import { connect }           from 'react-redux';
import { useEffect }         from 'react';
import { useRef }            from 'react';
import { useState }          from 'react';
import { WebsocketsActions } from '../../store/actions/websockets';

const Chat = ({ className, userId, event, messages, sendChatMessage }) => {
    const messageListRef        = useRef();
    const [message, setMessage] = useState('');
    const eventId               = _.get(event, '_id');

    useEffect(
        () => {
            messageListScrollToBottom();
        }, [messages],
    );

    const onMessageSend = () => {
        if (message) {
            const messageData = {
                type:    ChatMessageType.chatMessage,
                message: message,
                date:    new Date(),
                eventId,
                userId,
            };

            setMessage('');
            sendChatMessage(messageData);
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
        userId:    state.authentication.userId,
        messages:  _.get(state, ['chat', 'messagesByEvent', _.get(ownProps.event, '_id')], []),
        connected: state.websockets.connected,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendChatMessage: (messageObject) => {
            dispatch(WebsocketsActions.sendChatMessage({ messageObject }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Chat);
