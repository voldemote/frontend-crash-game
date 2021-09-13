import { useState } from 'react';
import { DateTimePicker, FormGroup, Input, InputLabel, Tags } from '../Form';
import styles from './styles.module.scss';

const NewBetForm = () => {
  const [name, setName] = useState('');
  const [seoPiece, setSeoPiece] = useState('');
  const [options, setOptions] = useState([{ id: Date.now(), value: '' }]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);

  const handleSave = () => {
    console.log({
      name,
      seoPiece,
      options: options.map(t => t.value).filter(t => t !== ''),
      description,
      date,
    });
  };

  const handleTagChange = (value, id) => {
    setOptions(prevOptions =>
      prevOptions.map(tag => (tag.id === id ? { ...tag, value } : tag))
    );
  };

  const addNewTag = () => {
    setOptions(prevOptions => [...prevOptions, { id: Date.now(), value: '' }]);
  };

  return (
    <>
      <FormGroup>
        <InputLabel>Name</InputLabel>
        <Input type="text" onChange={setName} />
      </FormGroup>
      <FormGroup>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" onChange={setSeoPiece} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Options</InputLabel>
        <Tags tags={options} onTagChange={handleTagChange} addTag={addNewTag} />
      </FormGroup>
      <FormGroup>
        <InputLabel>Evidence Description</InputLabel>
        <Input type="text" onChange={setDescription} />
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

export default NewBetForm;
