import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { AuthenticationActions } from '../../../store/actions/authentication';
import { selectTotalUsers } from '../../../store/selectors/leaderboard';
import EmailSignUp from './EmailSignUp';

const Register = ({ styles }) => {
  // const totalUsers = useSelector(selectTotalUsers);

  const [showEmailSignUp, setShowEmailSignup] = useState(false);
  
  return (
    <>
      <h2 className={styles.title}>Sign Up</h2>
      {/* <h3 className={styles.totalCount}>
        {totalUsers}/5000 slots available
        <span className={styles.underline}></span>
      </h3> */}
      {showEmailSignUp ? (
        <EmailSignUp styles={styles} />
      ) : (
        <div className={styles.signUpOptions}>
          <button onClick={() => setShowEmailSignup(true)}>Email</button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.authentication.loading,
    errorState: state.authentication.error,
    popupVisible: state.popup.visible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (payload) => {
      dispatch(AuthenticationActions.signUp(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
