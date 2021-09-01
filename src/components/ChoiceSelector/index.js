import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import SelectionHelper from '../../helper/SelectionHelper';
import ChoiceSelectorTheme from './ChoiceSelectorTheme';
import _ from 'lodash';
import { formatToFixed } from '../../helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';

const ChoiceSelector = ({
  name,
  winAmount,
  selected,
  className,
  theme,
  disabled = false,
  hideAmount = false,
  onClick,
}) => {
  const renderWinAmount = () => {
    if (!hideAmount) {
      const roundedWinAmount = _.round(winAmount, 2);
      const winAmountString = roundedWinAmount
        ? formatToFixed(roundedWinAmount)
        : '-';

      return (
        <span className={styles.choiceWinAmount}>
          {winAmountString} {TOKEN_NAME}
        </span>
      );
    }

    return null;
  };

  return (
    <div
      className={classNames(
        styles.choiceButton,
        selected ? styles.choiceButtonSelected : null,
        disabled ? styles.choiceButtonDisabled : null,
        SelectionHelper.get(theme, {
          [ChoiceSelectorTheme.colorMint]: styles.choiceColorMint,
          [ChoiceSelectorTheme.colorLightPurple]: styles.choiceColorLightPurple,
        }),
        className
      )}
      onClick={onClick}
    >
      <span className={styles.choiceName}>{name}</span>
      {renderWinAmount()}
    </div>
  );
};

export default ChoiceSelector;
