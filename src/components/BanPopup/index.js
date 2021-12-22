import React from 'react'
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import moment from 'moment';
import { PopupActions } from '../../store/actions/popup';

const BanPopup = ({
  banData,
  closePopup,
}) => {

  const { reactivateOn, statusDescription, username, } = banData;

  return (
    <div className={styles.banPopup}>
      <div className={styles.container}>
        <h2 className={styles.title}>{username} has been banned</h2>
        <div className={styles.description}>
          <p>
            You have been banned until{' '}
            <strong>{moment(reactivateOn).format('DD/MM/YYYY HH:mm')}</strong>.
          </p>
          {!!statusDescription && (
            <p className={styles.banReason}>
              <p>The reason for the ban is:</p>
              <p>{statusDescription}</p>
            </p>
          )}
          <p>
            You will <strong>not</strong> be able to log in, place bets, or send
            messages until the ban expires.
          </p>
          <p>
            You can contact{' '}
            <a href="mailto:support@alpacasino.io">support@alpacasino.io</a> to
            dispute the ban.
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={closePopup}
            withoutBackground={true}
            className={styles.button}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    closePopup: () => {
      dispatch(
        PopupActions.hide()
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(BanPopup);
