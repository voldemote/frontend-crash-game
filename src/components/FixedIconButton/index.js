import React         from 'react';
import styles        from './styles.module.scss';
import Icon          from '../Icon';
import IconTheme     from '../Icon/IconTheme';
import Highlight     from '../Highlight';
import HighlightType from '../Highlight/HighlightType';

const FixedIconButton = ({ iconType, onClick }) => {
    return (
        <div
            className={styles.fixedIconButtonContainer}
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
