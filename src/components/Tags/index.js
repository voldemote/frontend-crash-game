import React  from 'react';
import styles from './styles.module.scss';
import _      from 'lodash';

const Tags = ({ tags }) => {
    return (
        <div className={styles.tags}>
            {
                _.map(
                    tags,
                    (tag, index) => (
                        <span key={index}>
                            #{tag.name}
                        </span>
                    ),
                )
            }
        </div>
    );
};

export default Tags;