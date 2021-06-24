import _                    from 'lodash';
import styles               from './styles.module.scss';
import { connect }          from 'react-redux';
import { useEffect }        from 'react';
import { useState }         from 'react';
import DateText             from '../../helper/DateText';
import ChatMessageType      from './ChatMessageType';
import ChatMessage          from '../ChatMessage';
import BetActionChatMessage from '../BetActionChatMessage';

const ChatMessageWrapper = ({ user, message, date }) => {
    const [dateString, setDateString] = useState('');

    useEffect(
        () => {
            updateDateText();

            const timerId = setTimeout(
                updateDateText,
                5 * 1000,
            );

            return () => clearTimeout(timerId);
        },
        [],
    );

    const updateDateText = () => {
        const dateText = DateText.getSecondsDateText(date);

        setDateString(dateText);
    };

    if (!user) {
        return null;
    }

    const renderMessageContent = () => {
        const type        = _.get(message, 'type', ChatMessageType.chatMessage);
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
    };

    return renderMessageContent();
};

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps;
    const user       = _.get(
        state.user.users,
        userId,
    );

    return {
        user: user,
    };
};

export default connect(
    mapStateToProps,
    null,
)(ChatMessageWrapper);
