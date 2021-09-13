import { useState } from 'react';
import Select from './Select';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import { ReactComponent as AddTagIcon } from './add-icon.svg';
import styles from './styles.module.scss';

const categoriesOptions = LIVE_EVENTS_CATEGORIES.map(c => ({ label: c.value, value: c.value }));

const ManualCreate = () => {
  const [eventName, setEventName] = useState('');
  const [seoPiece, setSeoPiece] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [offlinePictureUrl, setOfflinePictureUrl] = useState('');
  const [category, setCategory] = useState(categoriesOptions[0].value);
  const [tags, setTags] = useState([]);

  const handleSave = () => {
    console.log({ eventName, seoPiece, streamUrl, offlinePictureUrl, category });
  }

  return (
    <>
      <div className={styles.formGroup}>
        <div className={styles.label}>Event Name</div>
        <input type="text" onChange={e => setEventName(e.target.value) } className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>SEO-Optimized URL Piece</div>
        <input type="text" onChange={e => setSeoPiece(e.target.value) } className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>Stream URL</div>
        <input type="text" onChange={e => setStreamUrl(e.target.value) } className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>Offline Picture URL</div>
        <input type="text" onChange={e => setOfflinePictureUrl(e.target.value) } className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>Category</div>
        <Select
          value={category}
          handleSelect={setCategory}
          options={categoriesOptions}
        />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>Tags</div>
        <div className={styles.tags}>
          <div className={styles.tag}>
            <input type="text" onChange={e => setOfflinePictureUrl(e.target.value) } className={styles.tagInput} />
          </div>
          <div className={styles.tag}>
            <input type="text" onChange={e => setOfflinePictureUrl(e.target.value) } className={styles.tagInput} />
          </div>
          <div className={styles.tag}>
            <input type="text" onChange={e => setOfflinePictureUrl(e.target.value) } className={styles.tagInput} />
          </div>
          <div className={styles.tag}>
            <div className={styles.newTag}>
              <AddTagIcon />
            </div>
          </div>
        </div>
      </div>
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

export default ManualCreate;
