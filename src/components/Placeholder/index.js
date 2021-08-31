import styles from './styles.module.scss';
import classNames from 'classnames';

const Placeholder = ({ children }) => {
  return <div className={styles.placeholderContainer}>{children}</div>;
};

export default Placeholder;
