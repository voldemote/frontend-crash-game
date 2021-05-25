import React       from 'react';
import styles      from './styles.module.scss';
import LiveBadge   from '../LiveBadge';
import ViewerBadge from '../ViewerBadge';
import Tags        from '../Tags';

const EventCard = ({ onClick, title, organizer, image, live, viewers, tags }) => {
    const getEventCardStyle = () => {
        return {
            backgroundImage: 'url("' + image + '")',
        };
    };
    return (
        <div
            className={styles.eventCard}
            onClick={onClick}
        >
            <div
                className={styles.eventCardBackgroundBlur}
                style={getEventCardStyle()}
            >
            </div>
            <div
                className={styles.eventCardBackground}
            >
            </div>
            <div>
                {live && (
                    <>
                        <LiveBadge />
                        <ViewerBadge viewers={viewers} />
                    </>
                )}
            </div>
            <div>
                <span className={styles.title}>
                    {title}
                    <br />
                    {organizer}
                </span>
                <Tags tags={tags} />
            </div>
        </div>
    );
};

export default EventCard;