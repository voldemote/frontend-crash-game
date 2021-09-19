import * as Api from 'api';
import { useState } from 'react';
import { FormGroup, Input, InputLabel } from '../Form';
import styles from './styles.module.scss';

const ImportFromTwitch = () => {
  const [url, setUrl] = useState('');

  const handleSave = () => {
    Api.createEventFromTwitchUrl({ streamUrl: url }).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <FormGroup>
        <InputLabel>Twitch Stream URL</InputLabel>
        <Input type="text" value={url} onChange={setUrl} />
      </FormGroup>
      <span
        role="button"
        tabIndex="0"
        className={styles.button}
        onClick={handleSave}
      >
        Save
      </span>
    </>
  );
};

export default ImportFromTwitch;
