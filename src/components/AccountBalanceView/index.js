import React           from 'react';
import styles          from './styles.module.scss';
import classNames      from 'classnames';
import ActionTextColor from './ActionTextColor';
import SelectionHelper from '../../helper/SelectionHelper';

const AccountBalance = ({ className, balance, coloredActionText, actionTextColor = ActionTextColor.green }) => {
    const renderColoredActionText = () => {
        return coloredActionText && (
            <span
                className={classNames(
                    styles.actionText,
                    SelectionHelper.get(
                        actionTextColor,
                        {
                            [ActionTextColor.green]: styles.actionTextColorGreen,
                            [ActionTextColor.red]:   styles.actionTextColorRed,
                        },
                    ),
                )}
            >
                {coloredActionText}
            </span>
        );
    };

    return (
        <div
            className={classNames(
                styles.accountBalance,
                className,
            )}
        >
            <div>
                {balance}
                <sup>
                    EVNT
                </sup>
            </div>
            <div className={styles.infoContainer}>
                <small>
                    available
                </small>
                {renderColoredActionText()}
            </div>
        </div>
    );
};

export default AccountBalance;
