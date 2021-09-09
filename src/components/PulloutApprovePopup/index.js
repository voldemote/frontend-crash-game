import _ from 'lodash';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { resendEmailVerification } from '../../api';
import Button from '../Button';
import { ReactComponent as SuccessIcon } from '../../data/icons/success-circle.svg';
import { ReactComponent as FailedIcon } from '../../data/icons/failed-circle.svg';
import { BetActions } from 'store/actions/bet';
import { TOKEN_NAME } from 'constants/Token';
import { formatToFixed } from 'helper/FormatNumbers';

const PulloutApprovePopup = ({
  hidePopup,
  pullOutBet,
  betData: { betId, amount, outcome },
}) => {
  const onApprovePulloutClick = () => {
    pullOutBet(betId, outcome, amount);
    hidePopup();
  };

  const onCancelPulloutClick = () => {
    hidePopup();
  };

  return (
    <div className={styles.pulloutContainer}>
      <span className={styles.pulloutTitle}>Confirmation</span>

      <p className={styles.pulloutText}>
        Are you sure you want to cash out&nbsp;
        <strong>
          {formatToFixed(amount)} {TOKEN_NAME}
        </strong>
      </p>

      <Button
        withoutBackground={true}
        className={styles.approvePulloutButton}
        onClick={onApprovePulloutClick}
      >
        OK
      </Button>

      <Button
        withoutBackground={true}
        className={styles.cancelPulloutButton}
        onClick={onCancelPulloutClick}
      >
        Cancel
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    pullOutBet: (betId, outcome, amount) => {
      dispatch(BetActions.pullOutBet({ betId, outcome, amount }));
    },
  };
};

export default connect(null, mapDispatchToProps)(PulloutApprovePopup);
