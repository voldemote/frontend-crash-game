import { ReactComponent as AddTagIcon } from './add-icon.svg';
import styles from './styles.module.scss';

const Tags = ({ tags, onTagChange, addTag }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag, index) => (
        <div key={tag.id} className={styles.tag}>
          <input
            type="text"
            value={tags[index].value}
            onChange={(e) => onTagChange(e.target.value, tag.id)}
            className={styles.tagInput}
          />
        </div>
      ))}
      <div className={styles.tag}>
        <div className={styles.newTag} onClick={addTag}>
          <AddTagIcon />
        </div>
      </div>
    </div>
  );
};

export default Tags;
