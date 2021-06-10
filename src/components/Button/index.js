import ButtonTheme     from './ButtonTheme';
import classNames      from 'classnames';
import React           from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import style           from './styles.module.scss';
import Highlight       from '../Highlight';

const Button = ({ children, highlightType, className, theme, onClick, withoutBackground = false, disabled, fixed }) => {
    return (
        <span
            className={classNames(
                style.button,
                className,
                fixed ? style.buttonFixed : null,
                withoutBackground ? style.withoutBackground : null,
                SelectionHelper.get(
                    theme,
                    {
                        [ButtonTheme.authenticationScreenButton]: style.authenticationScreenButton,
                        [ButtonTheme.welcomeScreenButton]:        style.welcomeScreenButton,
                    },
                ),
            )}
            onClick={disabled ? null : onClick}
        >
            {disabled && <span className={style.buttonDisabledOverlay}></span>}
            {children}
            {highlightType && <Highlight className={style.highlight} highlightType={highlightType} />}
        </span>
    );
};

export default Button;
