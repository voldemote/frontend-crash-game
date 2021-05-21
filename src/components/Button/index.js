import ButtonTheme     from './ButtonTheme';
import classNames      from 'classnames';
import React           from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import style           from './styles.module.scss';

const Button = ({ children, className, theme, onClick, disabled }) => {
    return (
        <span
            className={classNames(
                style.button,
                className,
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
        </span>
    );
};

export default Button;
