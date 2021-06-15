import _          from 'lodash';
import classNames from 'classnames';
import Icon       from '../Icon';
import IconTheme  from '../Icon/IconTheme';
import React      from 'react';
import styles     from './styles.module.scss';

const SwitchableContainer = ({ switchableViews, currentIndex, setCurrentIndex }) => {
    const renderAll = () => {
        return _.map(switchableViews, renderSwitchableView);
    };

    const onClick = (index) => {
        return () => {
            setCurrentIndex(index);
        };
    };

    const renderSwitchableView = (viewOptions, index) => {
        const isCurrent = index === currentIndex;
        const name      = _.get(viewOptions, 'name', _.isString(viewOptions) ? viewOptions : null);
        const iconType  = _.get(viewOptions, 'iconType');
        const iconTheme = _.get(viewOptions, 'iconTheme', IconTheme.primary);

        return (
            <div
                key={index}
                className={classNames(
                    styles.switchableViews,
                    isCurrent ? styles.selected : null,
                )}
                onClick={onClick(index)}
            >
                <div className={styles.text}>
                    {
                        iconType && <Icon
                            width={'auto'}
                            iconTheme={iconTheme}
                            iconType={iconType}
                        />
                    }
                    <span>
                        {name}
                    </span>
                </div>
                <span className={styles.line}>
                </span>
            </div>
        );
    };

    return (
        <div
            className={styles.switchableViewsContainer}
        >
            {renderAll()}
        </div>
    );
};

export default SwitchableContainer;
