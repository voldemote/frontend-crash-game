import styles from './styles.module.scss';

const FormGroup = ({ children }) => {
  return <div className={styles.formGroup}>{children}</div>;
};

export default FormGroup;
