import _ from 'lodash';
import ChatMessageWrapper from '../ChatMessageWrapper';
import classNames from 'classnames';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType from '../../components/Icon/IconType';
import Input from '../Input';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { WebsocketsActions } from '../../store/actions/websockets';
import { usePrevPropValue } from '../../hooks/usePrevPropValue';
import { useIsMount } from '../hoc/useIsMount';
import { LOGGED_IN } from 'constants/AuthState';
import ActivityMessage from './ActivityMessage';

const ActivitiesTracker = ({
  className,
  inputClassName,
  messagesClassName,
  user,
  roomId,
  chatMessageType,
  activities,
  sendChatMessage,
  hideInput = false,
}) => {
  const messageListRef = useRef();
  // const [activities, setActivities] = useState([
  //   {
  //     "_id": "6144df6846b30eac45f02397",
  //     "date": "2021-09-17T18:33:12.762Z",
  //     "roomId": "61306f0ff4a38e1aa57379a1",
  //     "type": "EVENT",
  //     "message": "Test",
  //     "userId": "61375f520e3c80822364daa0",
  //     "user": {
  //       "username": "appmaticstest",
  //       "name": "Appmatics",
  //       "profilePicture": ""
  //     }
  //   }
  // ]);
  const isMount = useIsMount();

  const prepareMessageByType = message => {
    switch (message.type) {
      case 'SOMETHING':
        return message;
      default:
        return message;
    }
  };

  const renderActivities = () => {
    return _.map(activities, (activityMessage, index) => {
      const date = _.get(activityMessage, 'date');
      const message = prepareMessageByType(activityMessage);
      return <ActivityMessage key={index} message={message} date={date} />;
    });
  };

  const messageListScrollToBottom = () => {
    if (messageListRef) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div
        className={classNames(messagesClassName, styles.messageContainer)}
        ref={messageListRef}
      >
        {renderActivities()}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('##state', state);
  console.log('##ownProps', ownProps);
  return {
    activities: state.activities,
    user: state.authentication,
    connected: state.websockets.connected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendChatMessage: messageObject => {
      dispatch(WebsocketsActions.sendChatMessage({ messageObject }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesTracker);
