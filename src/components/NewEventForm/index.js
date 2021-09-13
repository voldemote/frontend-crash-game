import { useState } from 'react';
import {
  DateTimePicker,
  FormGroup,
  Input,
  InputLabel,
  Select,
  Tags,
} from '../Form';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
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
      <FormGroup>
        <InputLabel>Event Name</InputLabel>
        <Input type="text" onChange={setEventName} />
      </FormGroup>
      <FormGroup>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" onChange={setSeoPiece} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Stream URL</InputLabel>
        <Input type="text" onChange={setStreamUrl} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Offline Picture URL</InputLabel>
        <Input type="text" onChange={setOfflinePictureUrl} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          handleSelect={setCategory}
          options={categoriesOptions}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>Tags</InputLabel>
        <Tags tags={tags} onTagChange={handleTagChange} addTag={addNewTag} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Date</InputLabel>
        <DateTimePicker
          value={date}
          onChange={date => setDate(date)}
          ampm={false}
        />
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

export default NewEventForm;
