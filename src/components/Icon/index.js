import classNames                  from 'classnames';
import IconType                    from './IconType';
import React                       from 'react';
import SelectionHelper             from '../../helper/SelectionHelper';
import style                       from './styles.module.scss';
import { ReactComponent as IconX } from '../../data/icons/x-circle.svg';

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
