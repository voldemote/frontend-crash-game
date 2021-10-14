import styles from './styles.module.scss';
import _ from 'lodash';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';

const Favorite = props => {
  const {
    isFavorite = false,
    onBookmark = () => {},
    onBookmarkCancel = () => {},
  } = props;

  const iconToUse = isFavorite ? IconType.starFull : IconType.star;

  return (
    <div className={styles.fvtTrigger}>
      <div className={styles.fvtContainer}>
        <div
          className={styles.fvtButton}
          onClick={() => {
            isFavorite ? onBookmarkCancel() : onBookmark();
          }}
        >
          <div className={styles.fvtIcon}>
            <Icon iconType={iconToUse} iconTheme={IconTheme.favorite} />
          </div>
          Favorite
        </div>
      </div>
    </div>
  );
};

export default Favorite;
