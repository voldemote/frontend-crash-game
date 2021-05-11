import ButtonTheme     from './ButtonTheme';
import classNames      from 'classnames';
import React           from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import style           from './styles.module.scss';

const Button = ({ children, className, theme, onClick }) => {
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
            onClick={onClick}
        >
            {children}
        </span>
    );
};

export default Button;
