import { useState } from 'react';
import Button from 'components/Button';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';

import TwitchImport from './TwitchImport';
import ManualCreate from './ManualCreate';

const NewLiveEvents = ({ history }) => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const openTwitchMenu = () => {
    setSelectedMenu('twitch');
  };
  const openManualMenu = () => {
    setSelectedMenu('manual');
  };

  console.log('MENU: ', selectedMenu);

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
        {selectedMenu === 'twitch' && <TwitchImport />}
        {selectedMenu === 'manual' && <ManualCreate />}
      </div>
    </BaseContainerWithNavbar>
  );
};

export default NewLiveEvents;
