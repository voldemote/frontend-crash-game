import React      from 'react';
import styles     from './styles.module.scss';
import classNames from 'classnames';

const RippedTicketContainer = ({ className, children, onClick }) => {
    return (
        <div
            className={classNames(
                styles.rippedTicketContainer,
                className,
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default RippedTicketContainer;