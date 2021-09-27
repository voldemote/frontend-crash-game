import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import DateText from '../../helper/DateText';
import ChatMessage from '../ChatMessage';
import BetActionChatMessage from '../BetActionChatMessage';
import ChatMessageType from '../ChatMessageWrapper/ChatMessageType';
import styles from './styles.module.scss';

const ActivityMessage = ({ activity, date }) => {
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

  const getEventUrl = event => {
    if (event.type === 'streamed') {
      return (
        <a href={`${window.location.origin}/trade/${event.slug}`}>
          {event.name}
        </a>
      );
    } else if (event.type === 'non-streamed' && event.bets.length === 1) {
      return (
        <a
          href={`${window.location.origin}/trade/${event.slug}/${event.bets[0].slug}`}
        >
          {event.bets[0].marketQuestion}
        </a>
      );
    }
  };

  const prepareMessageByType = activity => {
    console.log('message', activity);

    const data = activity.data;
    const { event, user } = data;

    switch (activity.type) {
      case 'EVENT_START':
        return `Event [NAME] `;
      case 'EVENT_RESOLVE':
        return `Event resolved [EVENT DATA] `;
      case 'EVENT_CANCEL':
        return `Event cancelled [EVENT DATA] `;
      case 'EVENT_NEW_REWARD':
        return `New reward [EVENT DATA] `;
      case 'EVENT_ONLINE':
        return `Stream ${data.event.name} has become online.`; //EDITED
      case 'EVENT_OFFLINE':
        return `Stream ${data.event.name} has become offline.`; //EDITED
      case 'EVENT_NEW':
        return `New event has been created ${getEventUrl(data)}.`; //EDITED
      case 'EVENT_NEW_BET':
        return `New bet has created ${(
          <a
            href={`${window.location.origin}/trade/${event.slug}/${event.bets[0].slug}`}
          >
            {event.bets[0].marketQuestion}
          </a>
        )}.`; //EDITED
      case 'EVENT_BET_PLACED':
        return `${user.username} has bet ${
          data.trade.investmentAmount
        } WFAIR on ${(
          <a
            href={`${window.location.origin}/trade/${event.slug}/${data.bet.slug}`}
          >
            {data.bet.marketQuestion}
          </a>
        )} with ${data.bet.outcomes[data.trade.outcomeIndex].name}.`;
      case 'EVENT_BET_CASHED_OUT':
        return `${user.username} has cashed out from ${data}.`;
      case 'EVENT_BET_RESOLVED':
        return `Event has been resolved [EVENT DATA] `;
      default:
        return '';
    }
  };

  const renderMessageContent = () => {
    const type = _.get(activity, 'type');
    const user = _.get(activity, 'user');

    return (
      <ChatMessage
        className={styles.messageItem}
        user={user}
        message={prepareMessageByType(activity)}
        dateString={dateString}
      />
    );

    return null;
  };

  return renderMessageContent();
};

export default ActivityMessage;
