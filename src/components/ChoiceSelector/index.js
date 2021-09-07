import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import SelectionHelper from '../../helper/SelectionHelper';
import ChoiceSelectorTheme from './ChoiceSelectorTheme';
import _ from 'lodash';
import { formatToFixed } from '../../helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';

const ChoiceSelector = ({
  name,
  winAmount,
  wfairValue,
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
        ? formatToFixed(
            roundedWinAmount,
            4 - parseInt(roundedWinAmount, 10).toString().length > 0
              ? 4 - parseInt(roundedWinAmount, 10).toString().length
              : 0
          )
        : '-';

      const euroAmount = wfairValue * roundedWinAmount;
      const euroAmountString = euroAmount
        ? formatToFixed(
            euroAmount,
            3 - parseInt(euroAmount, 10).toString().length > 0
              ? 3 - parseInt(euroAmount, 10).toString().length
              : 0
          )
        : '-';

      return (
        <div className={styles.choiceWinAmountContainer}>
          <div className={styles.choiceWinAmount}>{winAmountString}</div>
          <div className={styles.choiceWinAmountUnitContainer}>
            <div className={styles.choiceWinAmountUnit}>{TOKEN_NAME}</div>
            <div className={styles.choiceWinAmountCash}>
              {euroAmountString} EURO
              <Icon
                className={styles.infoIcon}
                iconType={IconType.infoReverse}
              />
            </div>
          </div>
        </div>
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
          [ChoiceSelectorTheme.colorOrangeLight]: styles.choiceColorOrangeLight,
          [ChoiceSelectorTheme.colorGreen]: styles.choiceColorGreen,
          [ChoiceSelectorTheme.colorPinkLight]: styles.choiceColorPinkLight,
          [ChoiceSelectorTheme.colorFlamingo]: styles.choiceColorFlamingo,
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
