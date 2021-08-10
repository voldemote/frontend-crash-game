import _                          from 'lodash';
import { connect }                from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useState }               from 'react';
import DateText                   from '../../helper/DateText';
import ChatMessageType            from './ChatMessageType';
import ChatMessage                from '../ChatMessage';
import BetActionChatMessage       from '../BetActionChatMessage';
import State                      from '../../helper/State';

const ChatMessageWrapper = ({ user, message, date }) => {
    const [dateString, setDateString] = useState('');

    const updateDateText = useCallback(() => {
        const dateText = DateText.getChatTimeText(date);

        setDateString(dateText);
    }, [date]);

    useEffect(
        () => {
            updateDateText();

            const timerId = window.setInterval(
                updateDateText,
                5 * 1000,
            );

            return () => clearInterval(timerId);
        },
        [date, updateDateText],
    );

    if (!user) {
        user = {
            name: message.name // temporary user object until we need more info when user is not logged in
        }
    }

    const renderMessageContent = () => {
        const type        = _.get(message, 'type');
        const messageText = _.get(message, 'message');

        switch (type) {
            case ChatMessageType.chatMessage:
                return <ChatMessage
                    user={user}
                    message={messageText}
                    dateString={dateString}
                />;

            case ChatMessageType.createBet:
            case ChatMessageType.placeBet:
            case ChatMessageType.pulloutBet:
                return <BetActionChatMessage
                    chatMessageType={type}
                    message={message}
                    user={user}
                    dateString={dateString}
                />;
        }

        return null;
    };

    return renderMessageContent();
};

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps;

    return {
        user: State.getUser(userId, state.user.users),
    };
};

export default connect(
    mapStateToProps,
    null,
)(ChatMessageWrapper);
