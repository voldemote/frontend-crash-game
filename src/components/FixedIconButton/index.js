import classNames      from 'classnames';
import Highlight       from '../Highlight';
import HighlightType   from '../Highlight/HighlightType';
import Icon            from '../Icon';
import IconTheme       from '../Icon/IconTheme';
import React           from 'react';
import styles          from './styles.module.scss';

const FixedIconButton = ({ className, iconType, onClick, left = false }) => {
    return (
        <div
            className={classNames(
                styles.fixedIconButtonContainer,
                left ? styles.alignedLeft : null,
                className,
            )}
            onClick={onClick}
        >
            <Highlight
                highlightType={HighlightType.highlightSettingsSupport}
            />
            <Icon
                iconType={iconType}
                iconTheme={IconTheme.primary}
            />
        </div>
    );
};

export default FixedIconButton;
