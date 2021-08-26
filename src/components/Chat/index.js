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
import { usePrevPropValue }  from '../../hooks/usePrevPropValue';
import { useIsMount }        from '../hoc/useIsMount';

const Chat = ({ className, inputClassName, messagesClassName, userId, userName, event, messages, sendChatMessage, hideInput = false }) => {
    const messageListRef                        = useRef();
    const [message, setMessage]                 = useState('');
    const [lastMessageSent, setLastMessageSent] = useState(0);
    const eventId                               = _.get(event, '_id');
    const prevMessages                          = usePrevPropValue(messages);
    const isMount                               = useIsMount();

    useEffect(
        () => {
            if (
                (
                    messages && prevMessages && messages.length && prevMessages.length && messages.length > prevMessages.length
                ) ||
                isMount
            ) {
                messageListScrollToBottom();
            }

        }, [messages, prevMessages],
    );

    const onMessageSend = () => {
        if (message) {
            const currentTimeStamp = +new Date;
            const difference       = currentTimeStamp - lastMessageSent;

            if (difference >= 2 * 1000) {
                const messageData = {
                    type:    ChatMessageType.chatMessage,
                    message: message,
                    date:    new Date(),
                    name:    userName,
                    eventId,
                    userId,
                };

                setMessage('');
                sendChatMessage(messageData);
                setLastMessageSent(currentTimeStamp);
            }
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
            messageListRef.current.scrollTo({
                top:      messageListRef.current.scrollHeight,
                left:     0,
                behavior: 'smooth',
            });
        }
    };

    const onMessageInputChange = (event) => {
        const value   = _.get(event, ['target', 'value'], '');
        const message = _.truncate(value, { length: 400 });

        setMessage(message);
    };

    return (
        <div
            className={classNames(
                styles.chatContainer,
                className,
            )}
        >
            <div
                className={classNames(messagesClassName, styles.messageContainer)}
                ref={messageListRef}
            >
                {renderMessages()}
            </div>
            <div className={classNames(
                styles.messageInput,
                inputClassName,
                hideInput ? styles.messageInputHidden : null,
                !userId ? styles.disabled : null,
            )}>
                <Input
                    type={'text'}
                    placeholder={'Comment...'}
                    value={message}
                    disabled={!userId}
                    onChange={onMessageInputChange}
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
        userName:  state.authentication.name,
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
