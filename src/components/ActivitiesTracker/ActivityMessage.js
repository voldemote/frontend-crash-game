import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import DateText from '../../helper/DateText';
import ChatMessage from '../ChatMessage';
import BetActionChatMessage from '../BetActionChatMessage';
import ChatMessageType from '../ChatMessageWrapper/ChatMessageType';

const ActivityMessage = ({ message, date }) => {
  const [dateString, setDateString] = useState('');

  const updateDateText = useCallback(() => {
    const dateText = DateText.getChatTimeText(date);

    setDateString(dateText);
  }, [date]);

  useEffect(() => {
    updateDateText();
    const timerId = window.setInterval(updateDateText, 5 * 1000);

    return () => clearInterval(timerId);
  }, [date, updateDateText]);

  const renderMessageContent = () => {
    const type = _.get(message, 'type');
    const user = _.get(message, 'user');

    return (
      <ChatMessage
        user={user}
        message={_.get(message, 'message')}
        dateString={dateString}
      />
    );

    return null;
  };

  return renderMessageContent();
};

export default ActivityMessage;
