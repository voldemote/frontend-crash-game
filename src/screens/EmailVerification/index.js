import _ from 'lodash';
import Highlight from '../../components/Highlight';
import HighlightType from '../../components/Highlight/HighlightType';
import React, { useEffect } from 'react';
import Routes from '../../constants/Routes';
import ScreenWithHeader from '../../components/ScreenWithHeaderContainer';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AuthenticationActions } from '../../store/actions/authentication';
import { resendEmailVerification } from '../../api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmailVerification = ({
  emailVerificationState,
  verifyEmail,
  showPopup,
}) => {
  const userId = useQuery().get('userId');
  const code = useQuery().get('code');

  useEffect(() => {
    verifyEmail(userId, code);
  }, [userId, code]);

  const onResendClick = async () => {
    await resendEmailVerification();
  };

  return (
    <ScreenWithHeader title={'Email Verification'} returnRoute={Routes.home}>
      <div className={styles.emailVerificationContainer}>
        <div className={styles.shortcutButton}>
          <Highlight
            width={'auto'}
            highlightType={HighlightType.highlightSettingsMyWallet}
          />
          <span className={styles.shortcutText}>
            Verification{' '}
            {emailVerificationState === true
              ? 'was successful'
              : emailVerificationState === false
              ? 'has failed'
              : 'is running'}
            .
          </span>
          <a onClick={onResendClick}>Resend verification email</a>
        </div>
      </div>
    </ScreenWithHeader>
  );
};

const mapStateToProps = state => {
  const emailVerificationState = state.authentication.emailVerificationState;

  return {
    emailVerificationState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyEmail: (userId, code) => {
      dispatch(AuthenticationActions.verifyEmail({ userId, code }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
