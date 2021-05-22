import styles              from './styles.module.scss';

const RelatedEventCard = ({ title, organizer, image }) => {

    const getEventCardStyle = () => {
        return {
            backgroundImage: 'url("' + image + '")',
        };
    };

    return (
        <div className={styles.relatedEventCard}>
            <div className={styles.eventCardBackgroundBlur} style={getEventCardStyle()}></div>
            <div className={styles.eventCardBackground}></div>
            <div>
                <span className={styles.organizer}>{organizer}</span>
                <span className={styles.title}>{title}</span>
            </div>
        </div>
    );
};

export default RelatedEventCard;
