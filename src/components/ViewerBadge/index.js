import React  from 'react';
import styles from './styles.module.scss';
import style  from '../EventCard/styles.module.scss';

const ViewerBadge = ({ viewers }) => {
    return (
        <span className={styles.viewerBadge}>
            🔥 {viewers.toLocaleString()} Viewers
        </span>
    );
};

export default ViewerBadge;