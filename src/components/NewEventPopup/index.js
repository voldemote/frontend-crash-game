import { useState } from 'react';
import Button from 'components/Button';
import ImportFromTwitch from 'components/ImportFromTwitch';
import AdminEventForm from 'components/AdminEventForm';
import styles from './styles.module.scss';

const NewLiveEvents = () => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const openTwitchMenu = () => {
    setSelectedMenu('twitch');
  };
  const openManualMenu = () => {
    setSelectedMenu('manual');
  };

  return (
    <div className={styles.layout}>
      <h2>Event Settings</h2>
      <br />
      {selectedMenu === '' && (
        <>
          <Button
            className={styles.addOutcomeButton}
            onClick={openTwitchMenu}
            disabled
          >
            Import From Twitch
          </Button>
          <br />
          <Button className={styles.addOutcomeButton} onClick={openManualMenu}>
            Import Manually
          </Button>
        </>
      )}
      {selectedMenu === 'twitch' && <ImportFromTwitch />}
      {selectedMenu === 'manual' && <AdminEventForm />}
    </div>
  );
};

export default NewLiveEvents;
