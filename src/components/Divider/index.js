import React      from 'react';
import classNames from 'classnames';
import styles     from './styles.module.scss';

const Divider = ({ className, noMargin = false }) => {
    return (
        <hr
            className={classNames(
                styles.divider,
                className,
                noMargin ? styles.noMargin : null,
            )}
        />
    );
};

export default Divider;