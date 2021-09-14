import { useState } from 'react';
import { useHistory } from 'react-router';
import Moment from 'moment';
import {
  DateTimePicker,
  FormGroup,
  Input,
  InputLabel,
  Select,
  Tags,
} from '../Form';
import * as Api from 'api';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import Routes from 'constants/Routes';
import styles from './styles.module.scss';

const categoriesOptions = LIVE_EVENTS_CATEGORIES.map(c => ({
  label: c.value,
  value: c.value,
}));

const AdminEventForm = ({ event = null }) => {
  const history = useHistory();
  const [name, setName] = useState(event?.name || '');
  const [slug, setSlug] = useState(event?.slug || '');
  const [streamUrl, setStreamUrl] = useState(event?.streamUrl || '');
  const [previewImageUrl, setPreviewImageUrl] = useState(
    event?.previewImageUrl || ''
  );
  const [category, setCategory] = useState(
    event?.category || categoriesOptions[0].value
  );
  const [tags, setTags] = useState(
    event?.tags || [{ _id: Date.now().toString(), name: '' }]
  );
  const [date, setDate] = useState(event?.date || new Moment());

  const handleSave = () => {
    Api.createEvent({
      name,
      slug,
      streamUrl,
      previewImageUrl,
      category,
      tags: tags.map(t => ({ name: t.name })).filter(t => t.name !== ''),
      date,
      type: 'streamed',
    })
      .then(response => response.response.data)
      .then(data => {
        history.push(
          Routes.getRouteWithParameters(Routes.bet, {
            eventSlug: data.slug,
            betSlug: '',
          })
        );
      });
  };

  const handleTagChange = (name, id) => {
    setTags(prevTags =>
      prevTags.map(tag => (tag._id === id ? { ...tag, name } : tag))
    );
  };

  const addTag = () => {
    setTags(prevTags => [
      ...prevTags,
      { _id: Date.now().toString(), name: '' },
    ]);
  };

  const removeTag = id => {
    setTags(prevTags => prevTags.filter(tag => tag._id !== id));
  };

  return (
    <>
      <FormGroup>
        <InputLabel>Event Name</InputLabel>
        <Input type="text" value={name} onChange={setName} />
      </FormGroup>
      <FormGroup>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" value={slug} onChange={setSlug} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Stream URL</InputLabel>
        <Input type="text" value={streamUrl} onChange={setStreamUrl} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Offline Picture URL</InputLabel>
        <Input
          type="text"
          value={previewImageUrl}
          onChange={setPreviewImageUrl}
        />
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
        <Tags
          tags={tags}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
        />
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

export default AdminEventForm;
