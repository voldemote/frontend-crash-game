import LiveBadge from '../LiveBadge';
import React     from 'react';
import styles    from './styles.module.scss';
import Tags      from '../Tags';

const Header = ({ backgroundImage, title, tags }) => {
    const getContainerStyle = () => {
        return {
            backgroundImage: 'url("' + backgroundImage + '")',
        };
    };

    return (
        <div
            className={styles.header}
            style={getContainerStyle()}
        >
            <div className={styles.headerOverlay}>
            </div>
            <div className={styles.headerContentContainer}>
                <div className={styles.badgeContainer}>
                    <LiveBadge />
                </div>
                <span className={styles.title}>
                    {title}
                </span>
                <Tags tags={tags}/>
            </div>
        </div>
    );
};

export default Header;