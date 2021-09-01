import styles from './styles.module.scss';
import classNames from 'classnames';

const Placeholder = ({ children, style }) => {
  return (
    <div className={styles.placeholderContainer} style={style}>
      {children}
    </div>
  );
};

export default Placeholder;
