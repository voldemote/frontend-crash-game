import classNames                                    from 'classnames';
import IconTheme                                     from './IconTheme';
import IconType                                      from './IconType';
import React                                         from 'react';
import SelectionHelper                               from '../../helper/SelectionHelper';
import styles                                        from './styles.module.scss';
import { ReactComponent as IconCheck }               from '../../data/icons/check.svg';
import { ReactComponent as IconFeatherArrowUpRight } from '../../data/icons/feather-arrow-up-right.svg';
import { ReactComponent as IconError }               from '../../data/icons/error.svg';
import { ReactComponent as IconInfo }                from '../../data/icons/info.svg';
import { ReactComponent as IconLeft }                from '../../data/icons/chevron-left.svg';
import { ReactComponent as IconRight }               from '../../data/icons/chevron-right.svg';
import { ReactComponent as IconSuccess }             from '../../data/icons/success.svg';
import { ReactComponent as IconX }                   from '../../data/icons/x-circle.svg';

const Icon = ({ className, iconType, iconTheme = IconTheme.white, circle, width, height, onClick }) => {
    const renderIcon = () => {
        return SelectionHelper.get(
            iconType,
            {
                [IconType.check]:               <IconCheck />,
                [IconType.error]:               <IconError />,
                [IconType.featherArrowUpRight]: <IconFeatherArrowUpRight />,
                [IconType.info]:                <IconInfo />,
                [IconType.left]:                <IconLeft />,
                [IconType.right]:               <IconRight />,
                [IconType.success]:             <IconSuccess />,
                [IconType.x]:                   <IconX />,
            },
        );
    };

    const getIconStyle = () => {
        return {
            width:  width,
            height: height,
        };
    };

    return (
        <span
            style={getIconStyle()}
            className={classNames(
                styles.icon,
                className,
                SelectionHelper.get(
                    iconTheme,
                    {
                        [IconTheme.primary]:                 styles.iconPrimary,
                        [IconTheme.primaryLightTransparent]: styles.iconPrimaryLightTransparent,
                        [IconTheme.white]:                   styles.iconWhite,
                    },
                ),
                circle === true ? styles.iconCircled : null,
            )}
            onClick={onClick}
        >
            {renderIcon()}
        </span>
    );
};

export default Icon;
