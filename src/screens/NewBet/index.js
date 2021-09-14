import AdminBetForm from 'components/AdminBetForm';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';

const NewLiveEvents = () => {
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.layout}>
        <h2>Bet Settings</h2>
        <br />
        <AdminBetForm />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default NewLiveEvents;
