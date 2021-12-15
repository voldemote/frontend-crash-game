import ButtonTheme from './ButtonTheme';
import classNames from 'classnames';
import React from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import style from './styles.module.scss';
import Highlight from '../Highlight';

const Button = ({
  children,
  highlightType,
  highlightTheme,
  className,
  theme = ButtonTheme.primaryButton,
  onClick,
  disabled,
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
        theme === ButtonTheme.primaryButton ? style.primaryButton : style.secondaryButton,
        disabled ? style.disabled : null,
      )}
      disabled={disabled}
      onClick={disabled ? null : onClick}
      data-tracking-id={dataTrackingId}
    > 
      {theme === ButtonTheme.primaryButton ?
        <div className={style.buttonInnerBackground}>
          <div className={style.buttonPattern}/>
          <div className={style.butonSecondInnerBackground}>
            <div className={classNames(style.buttonThirdInnerBackground)}>
              <span>{children}</span>
            </div>
          </div>
        </div>
        :
        <>{children}</>
      }
      {renderHighlight()}
    </span>
  );
};

export default Button;
