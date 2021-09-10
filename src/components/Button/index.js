import ButtonTheme from './ButtonTheme';
import classNames from 'classnames';
import React from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import style from './styles.module.scss';
import Highlight from '../Highlight';
import ReactTooltip from 'react-tooltip';

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
  showTooltip,
  tooltipDesc,
}) => {
  const renderButtonDisabledOverlay = () => {
    if (disabled && disabledWithOverlay) {
      return <span className={style.buttonDisabledOverlay}></span>;
    }

    return null;
  };

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
    <>
      <a data-for="tool-tip" data-tip={tooltipDesc}>
        <span
          className={classNames(
            style.button,
            className,
            fixed ? style.buttonFixed : null,
            withoutBackground ? style.withoutBackground : null,
            disabled ? style.disabled : null,
            SelectionHelper.get(theme, {
              [ButtonTheme.authenticationScreenButton]:
                style.authenticationScreenButton,
              [ButtonTheme.welcomeScreenButton]: style.welcomeScreenButton,
            })
          )}
          onClick={disabled ? null : onClick}
        >
          {renderButtonDisabledOverlay()}
          {children}
          {renderHighlight()}
        </span>
      </a>
      <ReactTooltip
        id="tool-tip"
        className={style.tooltip}
        place="top"
        effect="solid"
        disable={!showTooltip}
      />
    </>
  );
};

export default Button;
