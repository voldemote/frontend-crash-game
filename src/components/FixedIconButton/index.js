import classNames    from 'classnames';
import Highlight     from '../Highlight';
import HighlightType from '../Highlight/HighlightType';
import Icon          from '../Icon';
import IconTheme     from '../Icon/IconTheme';
import React         from 'react';
import styles        from './styles.module.scss';

const FixedIconButton = ({ className, text, iconType, onClick, left = false, showHighlight = true }) => {
    const renderText = () => {
        if (text) {
            return (
                <span className={styles.fixedIconButtonText}>
                    {text}
                </span>
            );
        }

        return null;
    };

    return (
        <div
            className={classNames(
                styles.fixedIconButtonContainer,
                left ? styles.alignedLeft : null,
                className,
            )}
            onClick={onClick}
        >
            {renderText()}
            {
                showHighlight && 
                <Highlight
                    highlightType={HighlightType.highlightSettingsSupport}
                    className={styles.fixedIconHighlight}
                />
            }
            <Icon
                iconType={iconType}
                iconTheme={IconTheme.primary}
            />
        </div>
    );
};

export default FixedIconButton;
