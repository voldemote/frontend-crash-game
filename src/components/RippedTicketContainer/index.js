import React      from 'react';
import styles     from './styles.module.scss';
import classNames from 'classnames';

const RippedTicketContainer = ({ className, children }) => {
    return (
        <div
            className={classNames(
                styles.rippedTicketContainer,
                className,
            )}
        >
            {children}
        </div>
    );
};

export default RippedTicketContainer;