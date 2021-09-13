import styles from './styles.module.scss';

const InputLabel = ({ children }) => {
  return <div className={styles.label}>{children}</div>;
};

export default InputLabel;
