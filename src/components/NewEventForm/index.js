import { useState } from 'react';
import Select from './Select';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import Tags from './Tags';
import DateTimePicker from './DateTimePicker';
import styles from './styles.module.scss';

const categoriesOptions = LIVE_EVENTS_CATEGORIES.map(c => ({
  label: c.value,
  value: c.value,
}));

const NewEventForm = () => {
  const [eventName, setEventName] = useState('');
  const [seoPiece, setSeoPiece] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [offlinePictureUrl, setOfflinePictureUrl] = useState('');
  const [category, setCategory] = useState(categoriesOptions[0].value);
  const [tags, setTags] = useState([{ id: Date.now(), value: '' }]);
  const [date, setDate] = useState(null);

  const handleSave = () => {
    console.log({
      eventName,
      seoPiece,
      streamUrl,
      offlinePictureUrl,
      category,
      tags: tags.map(t => t.value).filter(t => t !== ''),
      date,
    });
  };

  const handleTagChange = (value, id) => {
    setTags(prevTags =>
      prevTags.map(tag => (tag.id === id ? { ...tag, value } : tag))
    );
  };

  const addNewTag = () => {
    setTags(prevTags => [...prevTags, { id: Date.now(), value: '' }]);
  };

  return (
    <>
      <div className={styles.formGroup}>
        <div className={styles.label}>Event Name</div>
        <input
          type="text"
          onChange={e => setEventName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>SEO-Optimized URL Piece</div>
        <input
          type="text"
          onChange={e => setSeoPiece(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>Stream URL</div>
        <input
          type="text"
          onChange={e => setStreamUrl(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>Offline Picture URL</div>
        <input
          type="text"
          onChange={e => setOfflinePictureUrl(e.target.value)}
          className={styles.input}
        />
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
        <Tags tags={tags} onTagChange={handleTagChange} addTag={addNewTag} />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.label}>Date</div>
        <DateTimePicker
          value={date}
          onChange={date => setDate(date)}
          ampm={false}
          className={styles.datePicker}
          InputLabelProps={{ shrink: true, className: styles.inputLabel }}
          InputProps={{ className: styles.inputBase }}
        />
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

export default NewEventForm;
