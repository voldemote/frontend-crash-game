import React       from 'react';
import styles      from './styles.module.scss';
import LiveBadge   from '../LiveBadge';
import ViewerBadge from '../ViewerBadge';

const EventCard = ({ title, organizer, image, live, viewers, tags }) => {
    const getEventCardStyle = () => {
        return {
            backgroundImage: 'url("' + image + '")',
        };
    };
    return (
        <div
            className={styles.eventCard}
        >
            <div
                className={styles.eventCardBackground}
                style={getEventCardStyle()}
            ></div>
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
                <div className={styles.tags}>
                    {
                        tags.map(
                            (tag) => <span>#{tag}</span>,
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default EventCard;