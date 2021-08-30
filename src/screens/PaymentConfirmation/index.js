import AccountBalance from '../../components/AccountBalanceView';
import PaymentScreenContainer from '../../components/PaymentScreenContainer';
import React from 'react';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { TOKEN_NAME } from '../../constants/Token';

const PaymentConfirmation = ({ balance, cancelActionTill }) => {
  const { paymentAction } = useParams();
  const history = useHistory();
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(
    calcTimeLeftInSeconds(cancelActionTill)
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timeLeftInSeconds <= 0) {
        clearTimeout(timerId);
      } else {
        setTimeLeftInSeconds(calcTimeLeftInSeconds(cancelActionTill));
      }
    }, 1000);

    return () => clearTimeout(timerId);
  });

  function calcTimeLeftInSeconds(endDate) {
    const date = new Date();
    const difference = endDate.getTime() - date.getTime();
    const secondsLeft = Math.floor((difference / 1000) % 60);

    return secondsLeft;
  }

  const onGoBackToWalletButtonClick = () => {
    history.push(Routes.wallet);
  };

  const renderCancelContainer = () => {
    if (timeLeftInSeconds > 0) {
      return (
        <div className={styles.cancelContainer}>
          Do you want to cancel {paymentAction}?
          <span className={styles.timeLeftText}>
            {timeLeftInSeconds} sec left to cancel
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <PaymentScreenContainer
      paymentAction={paymentAction}
      success={true}
      onConfirmButtonClick={onGoBackToWalletButtonClick}
    >
      <AccountBalance balance={balance} coloredActionText={`+ ${TOKEN_NAME} 500.00`} />
      {renderCancelContainer()}
    </PaymentScreenContainer>
  );
};

const mapStateToProps = state => {
  const cancelActionTill = new Date();

  cancelActionTill.setSeconds(cancelActionTill.getSeconds() + 30);

  return {
    balance: state.authentication.balance,
    cancelActionTill,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentConfirmation);
