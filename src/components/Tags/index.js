import React  from 'react';
import styles from './styles.module.scss';

const Tags = ({ tags }) => {
    return (
        <div className={styles.tags}>
            {
                tags.map(
                    (tag) => <span>#{tag}</span>,
                )
            }
        </div>
    );
};

export default Tags;