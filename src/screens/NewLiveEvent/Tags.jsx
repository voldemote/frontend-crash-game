import { useState } from 'react';
import Select from './Select';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import styles from './styles.module.scss';

const categoriesOptions = LIVE_EVENTS_CATEGORIES.map(c => ({ label: c.value, value: c.value }));

const ManualCreate = () => {
  const [eventName, setEventName] = useState('');

  return (
    <div>
      <input type="text" onChange={e => setEventName(e.target.value) } className={styles.input} />
    </div>
  );
};

export default ManualCreate;
