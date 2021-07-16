import React  from 'react';
import styles from './styles.module.scss';

const ViewerBadge = ({ viewers }) => {
    return null;

    return (
        <span className={styles.viewerBadge}>
            🔥 {viewers.toLocaleString()} Viewers
        </span>
    );
};

export default ViewerBadge;
