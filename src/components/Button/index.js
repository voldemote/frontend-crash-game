import React           from 'react';
import style           from './styles.module.scss';
import classNames      from 'classnames';
import SelectionHelper from '../../helper/SelectionHelper';
import ButtonTheme     from './ButtonTheme';

const Button = ({ children, theme, onClick }) => {
    return (
        <span
            className={classNames(
                style.button,
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
