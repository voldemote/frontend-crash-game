import Link from 'components/Link';
import { ReactComponent as ArrowIcon } from '../../data/icons/arrow-left.svg';
import styles from './styles.module.scss';

const BackLink = ({ to, text }) => {
  return (
    <Link to={to} className={styles.link}>
      <ArrowIcon />
      <h2>{text}</h2>
    </Link>
  );
};

export default BackLink;
