import React     from 'react';
import styles    from './styles.module.scss';
import Icon      from '../Icon';
import IconTheme from '../Icon/IconTheme';

const FixedIconButton = ({ iconType, onClick }) => {
    return (
        <div
            className={styles.fixedIconButtonContainer}
            onClick={onClick}
        >
            <Icon
                iconType={iconType}
                iconTheme={IconTheme.primary}
            />
        </div>
    );
};

export default FixedIconButton;
