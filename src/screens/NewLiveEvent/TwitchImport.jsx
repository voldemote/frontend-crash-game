import { useState } from 'react';
import Button from 'components/Button';
import InputBox from 'components/InputBox';
import styles from './styles.module.scss';

const TwitchImport = () => {
  const [url, setUrl] = useState('');

  const handleSave = () => {
    console.log(url);
  }

  return (
    <>
      <div className={styles.label}>Stream URL</div>
      <InputBox
        value={url}
        setValue={setUrl}
        showDeleteIcon={false}
        // disabled={userUnableToBet}
        // className={styles.input}
        // containerClassName={styles.inputBoxContainer}
      />
      <br />
      <Button
        className={styles.addOutcomeButton}
        onClick={handleSave}
      >
        Save
      </Button>
    </>
  );
};

export default TwitchImport;
