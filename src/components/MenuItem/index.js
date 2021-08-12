import React           from 'react';
import styles          from './styles.module.scss';
import Icon          from '../Icon';
import classNames from 'classnames';

const MenuItem = ({ label, onClick, icon, classes }) => {
    
    return (
        <div className={classNames(styles.menuItem, ...classes)} role="button" onClick={onClick}>
            {icon}
            <span className={styles.itemLabel}>
                {label}
            </span>
            <Icon className={styles.arrowIcon} iconType={'arrowSmallRight'}/>
        </div>

    );
};

export default MenuItem;
