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
                SelectionHelper.get(
                    disabled,
                    {
                        [true]: style.buttonDisabled,
                    },
                ),
            )}
            onClick={disabled ? null : onClick}
        >
            {children}
        </span>
    );
};

export default Button;
