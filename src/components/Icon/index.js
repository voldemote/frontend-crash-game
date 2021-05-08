import IconX           from '../../data/icons/x-circle.svg';
import React           from 'react';
import style           from './styles.module.scss';
import SelectionHelper from '../../helper/SelectionHelper';
import IconType        from './IconType';
import classNames      from 'classnames';

const Icon = ({ className, iconType }) => {
    const renderIcon = () => {
        return SelectionHelper.get(
            iconType,
            {
                [IconType.x]: <IconX />,
            },
        );
    };

    return (
        <span className={classNames(style.icon, className)}>
            {renderIcon()}
        </span>
    );
};

export default Icon;
