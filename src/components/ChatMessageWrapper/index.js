import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import DateText from '../../helper/DateText';
import ChatMessageType from './ChatMessageType';
import ChatMessage from '../ChatMessage';
import BetActionChatMessage from '../BetActionChatMessage';

const ChatMessageWrapper = ({ message, date, parentRef, lastMessage }) => {
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

  const isInView = (parent, el) => {
    const container = parent.current;
    const element = el.current;
    const { bottom, height, top } = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return top <= containerRect.top
      ? containerRect.top - top <= height
      : bottom - containerRect.bottom <= height;
  };

  const renderMessageContent = () => {
    const type = _.get(message, 'type');
    const user = _.get(message, 'user');

    switch (type) {
      case ChatMessageType.event:
      case ChatMessageType.game:
      case ChatMessageType.user:
        return (
          <ChatMessage
            lastMessage={lastMessage}
            observer={isInView}
            parentRef={parentRef}
            user={user}
            message={_.get(message, 'message')}
            dateString={dateString}
          />
        );

      case ChatMessageType.createBet:
      case ChatMessageType.placeBet:
      case ChatMessageType.pulloutBet:
        return (
          <BetActionChatMessage
            lastMessage={lastMessage}
            observer={isInView}
            parentRef={parentRef}
            chatMessageType={type}
            message={message}
            user={user}
            dateString={dateString}
          />
        );
    }

    return null;
  };

  return renderMessageContent();
};

export default ChatMessageWrapper;
