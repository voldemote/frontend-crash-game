import _ from 'lodash';
import styles from './styles.module.scss';
import Routes from '../../constants/Routes';
import { useHistory } from 'react-router';
import ProfilePicture from '../ProfilePicture';
import ChatMessageType from '../ChatMessageWrapper/ChatMessageType';
import { connect } from 'react-redux';
import State from '../../helper/State';
import { formatToFixed } from '../../helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';

const BetActionChatMessage = ({
  chatMessageType,
  eventId,
  betId,
  event,
  bet,
  user,
  message,
  dateString,
}) => {
  const history = useHistory();

  if (!user) {
    return null;
  }

  const onClick = () => {
    history.push(
      Routes.getRouteWithParameters(Routes.bet, {
        eventId,
        betId,
      })
    );
  };

  const getMessage = () => {
    const userName = _.get(user, 'name');
    const tokenAmount = formatToFixed(_.get(message, 'amount'));
    const outcome = _.get(message, 'outcome');
    const betOutcome = _.get(bet, ['outcomes', outcome]);
    const outcomeValue = _.get(betOutcome, 'name');

    switch (chatMessageType) {
      case ChatMessageType.createBet:
        return (
          <>
            {userName} created trade{' '}
            <strong>{tokenAmount + ' ' + TOKEN_NAME}</strong> on{' '}
            <strong>{outcomeValue}</strong>.
          </>
        );

      case ChatMessageType.placeBet:
        return (
          <>
            {userName} bought <strong>{tokenAmount + ' ' + TOKEN_NAME}</strong>{' '}
            of <strong>{outcomeValue}</strong>.
          </>
        );

      case ChatMessageType.pulloutBet:
        return (
          <>
            {userName} sold <strong>{outcomeValue}</strong> for{' '}
            <strong>{tokenAmount + ' ' + TOKEN_NAME}</strong>.
          </>
        );
    }

    return null;
  };

  const renderText = () => {
    return <div>{getMessage()}</div>;
  };

  return (
    <div className={styles.betActionChatMessage} onClick={onClick}>
      <ProfilePicture user={user} width={20} height={20} />
      {renderText()}
      <small>{dateString}</small>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { message } = ownProps;
  const betId = _.get(message, 'betId');
  const eventId = _.get(message, 'eventId');
  const event = State.getEvent(eventId, state.event.events);
  const bet = State.getTradeByEvent(betId, event);

  return {
    bet,
    betId,
    event,
    eventId,
  };
};

export default connect(mapStateToProps, null)(BetActionChatMessage);
