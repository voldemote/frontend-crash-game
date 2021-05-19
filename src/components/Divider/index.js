import React      from 'react';
import classNames from 'classnames';
import styles     from './styles.module.scss';

const Divider = ({ className }) => {
    return (
        <hr
            className={classNames(
                styles.divider,
                className,
            )}
        />
    );
};

export default Divider;