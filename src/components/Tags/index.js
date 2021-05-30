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
                            #{_.get(tag, 'name', tag)}
                        </span>
                    ),
                )
            }
        </div>
    );
};

export default Tags;