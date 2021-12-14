import ButtonTheme from './ButtonTheme';
import classNames from 'classnames';
import React from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import style from './styles.module.scss';
import Highlight from '../Highlight';
import ButtonPattern from '../../data/backgrounds/but-pattern.svg';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';

const Button = ({
  children,
  highlightType,
  highlightTheme,
  className,
  theme,
  onClick,
  withoutBackground = false,
  disabled,
  disabledWithOverlay = true,
  fixed,
  dataTrackingId,
}) => {

  const renderHighlight = () => {
    if (highlightType) {
      return (
        <Highlight
          className={style.highlight}
          highlightType={highlightType}
          highlightTheme={highlightTheme}
        />
      );
    }

    return null;
  };
  return (
    <span
      className={classNames(
        className,
        style.button,
        disabled ? style.disabled : null,
        SelectionHelper.get(theme, {
          [ButtonTheme.authenticationScreenButton]:
            style.authenticationScreenButton,
          [ButtonTheme.welcomeScreenButton]: style.welcomeScreenButton,
        })
      )}
      disabled={disabled}
      onClick={disabled ? null : onClick}
      data-tracking-id={dataTrackingId}
    >
      <div className={style.buttonInnerBackground}>
        <img className={style.buttonPattern} src={ButtonPattern} alt='button-pattern'/>
        <div className={style.butonSecondInnerBackground}>
          <div className={classNames(style.buttonThirdInnerBackground)}>
            {children}
          </div>
        </div>
      </div>
      {renderHighlight()}
    </span>
  );
};

export default Button;
