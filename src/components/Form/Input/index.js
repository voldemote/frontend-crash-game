import styles from './styles.module.scss';

const Input = ({ value, onChange, ...props }) => {
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <input
      type={props.type || 'text'}
      onChange={handleChange}
      className={styles.input}
      {...props}
    />
  );
};

export default Input;
