import React               from 'react';
import styles              from './styles.module.scss';
import classNames          from 'classnames';
import SelectionHelper     from '../../helper/SelectionHelper';
import ChoiceSelectorTheme from './ChoiceSelectorTheme';

const ChoiceSelector = ({ name, winAmount, selected, className, theme, onClick }) => {
    const renderWinAmount = () => {
        const winAmountString = winAmount ? winAmount.toLocaleString() : '-';

        return (
            <span className={styles.choiceWinAmount}>
                {winAmountString} EVNT
            </span>
        );
    };

    return (
        <div
            className={classNames(
                styles.choiceButton,
                selected ? styles.choiceButtonSelected : null,
                SelectionHelper.get(
                    theme,
                    {
                        [ChoiceSelectorTheme.colorMint]:        styles.choiceColorMint,
                        [ChoiceSelectorTheme.colorLightPurple]: styles.choiceColorLightPurple,
                    },
                ),
                className,
            )}
            onClick={onClick}
        >
            <span className={styles.choiceName}>
                {name}
            </span>
            {renderWinAmount()}
        </div>
    );
};

export default ChoiceSelector;