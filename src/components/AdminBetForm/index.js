import { useState } from 'react';
import { DateTimePicker, FormGroup, Input, InputLabel, Tags } from '../Form';
import * as Api from 'api';
import styles from './styles.module.scss';

const AdminBetForm = ({ event, bet = null }) => {
  const [marketQuestion, setMarketQuestion] = useState(
    bet?.marketQuestion || ''
  );
  const [slug, setSlug] = useState(bet?.slug || '');
  const [outcomes, setOutcomes] = useState(
    bet?.outcomes || [{ id: Date.now(), name: '' }]
  );
  const [evidenceDescription, setEvidenceDescription] = useState(
    bet?.evidenceDescription || ''
  );
  const [date, setDate] = useState(bet?.data || null);

  const handleSuccess = ({ response: { data } }) => {
    // there is a strange bug when I use history.push(); to navigate, layout becomes white
    window.location.reload();
  };

  const handleSave = () => {
    const payload = {
      event: event._id,
      marketQuestion,
      slug,
      evidenceDescription,
      outcomes: outcomes
        .map(t => ({ name: t.name }))
        .filter(t => t.name !== ''),
      date,
    };

    if (bet) {
      Api.editEventBet(bet._id, payload).then(handleSuccess);
    } else {
      Api.createEventBet(payload).then(handleSuccess);
    }
  };

  const handleTagChange = (name, id) => {
    setOutcomes(prevOutcomes =>
      prevOutcomes.map(tag => (tag._id === id ? { ...tag, name } : tag))
    );
  };

  const addTag = () => {
    setOutcomes(prevOutcomes => [
      ...prevOutcomes,
      { _id: Date.now().toString(), name: '' },
    ]);
  };

  const removeTag = id => {
    setOutcomes(prevOutcomes => prevOutcomes.filter(tag => tag._id !== id));
  };

  return (
    <>
      <FormGroup>
        <InputLabel>Name</InputLabel>
        <Input
          type="text"
          value={marketQuestion}
          onChange={setMarketQuestion}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" value={slug} onChange={setSlug} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Options</InputLabel>
        <Tags
          tags={outcomes}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>Evidence Description</InputLabel>
        <Input
          type="text"
          value={evidenceDescription}
          onChange={setEvidenceDescription}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>End Date</InputLabel>
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

export default AdminBetForm;
