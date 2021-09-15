import styles from './styles.module.scss';

const ViewImagePopup = ({ imageURL }) => {
  return (
    <div className={styles.imageContainer}>
      <img src={imageURL} alt="zoomed view" />
    </div>
  );
};

export default ViewImagePopup;
