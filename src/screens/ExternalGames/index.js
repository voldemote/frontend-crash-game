import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
//import { } from '../../constants/Games';

const ExternalGames = () => {
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  console.log("External Games")
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>


      </div>
    </BaseContainerWithNavbar>
  );
};

export default ExternalGames;
