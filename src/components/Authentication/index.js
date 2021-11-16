import styles from './styles.module.scss';
import AuthenticationType from './AuthenticationType';
import Register from './Register';
import Login from './Login';

const Authentication = ({
  authenticationType,
  preloadEmailSignUp
}) => {
  return {
    [AuthenticationType.register]: 
      <Register styles={styles} preloadEmailSignUp={preloadEmailSignUp} />,
    [AuthenticationType.login]: 
      <Login styles={styles} />
  }[authenticationType] || ''
};

export default Authentication;
