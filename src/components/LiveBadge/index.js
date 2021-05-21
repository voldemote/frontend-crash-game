import React  from 'react';
import styles from './styles.module.scss';

const LiveBadge = () => {
    return (
        <span className={styles.liveBadge}>
            <span></span>
            Live
        </span>
    );
};

export default LiveBadge;