import { useState } from 'react';
import Button from 'components/Button';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import ImportFromTwitch from 'components/ImportFromTwitch';
import NewEventForm from 'components/NewEventForm';
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
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.layout}>
        <h2>Event Settings</h2>
        <br />
        {selectedMenu === '' && (
          <>
            <Button
              className={styles.addOutcomeButton}
              onClick={openTwitchMenu}
            >
              Import From Twitch
            </Button>
            <br />
            <Button
              className={styles.addOutcomeButton}
              onClick={openManualMenu}
            >
              Import Manually
            </Button>
          </>
        )}
        {selectedMenu === 'twitch' && <ImportFromTwitch />}
        {selectedMenu === 'manual' && <NewEventForm />}
      </div>
    </BaseContainerWithNavbar>
  );
};

export default NewLiveEvents;
