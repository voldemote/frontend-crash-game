import React            from 'react';
import styles           from './styles.module.scss';
import ScreenWithHeader from '../ScreenWithHeaderContainer';
import Routes           from '../../constants/Routes';
import PaymentAction    from '../../constants/PaymentAction';
import HighlightType    from '../Highlight/HighlightType';
import Button           from '../Button';
import IconType         from '../Icon/IconType';
import classNames       from 'classnames';
import HighlightTheme   from '../Highlight/HighlightTheme';

const PaymentScreenContainer = ({ paymentAction, success = false, onConfirmButtonClick, children }) => {
    const getSubtitle = () => {
        if (success) {
            return (
                <>
                    Awesome!
                    <br />
                    Your new balance is:
                </>
            );
        }

        switch (paymentAction) {
            case PaymentAction.withdrawal:
                return 'How much do you want to withdraw?';

            case PaymentAction.deposit:
                return 'How much do you want to deposit?';
        }
    };

    const getConfirmButtonText = () => {
        if (success) {
            return 'Go back to Wallet';
        }

        switch (paymentAction) {
            case PaymentAction.withdrawal:
                return 'Confirm Withdrawal';

            case PaymentAction.deposit:
                return 'Confirm Deposit';
        }
    };

    const getIconType = () => {
        if (success) {
            return IconType.success;
        }

        switch (paymentAction) {
            case PaymentAction.withdrawal:
                return IconType.withdrawal;

            case PaymentAction.deposit:
                return IconType.deposit;
        }
    };

    return (
        <ScreenWithHeader
            iconType={getIconType()}
            subtitle={getSubtitle()}
            returnRoute={Routes.wallet}
        >
            <div
                className={classNames(
                    styles.paymentScreenContainer,
                    success ? styles.paymentScreenSuccessContainer : null,
                )}
            >
                {children}
                <Button
                    className={styles.confirmButton}
                    highlightType={HighlightType.highlightHomeCtaBet}
                    withoutBackground={true}
                    disabled={true}
                    highlightTheme={HighlightTheme.fillRed}
                    disabledWithOverlay={false}
                    onClick={onConfirmButtonClick}
                >
                    <span>
                        {getConfirmButtonText()}
                    </span>
                </Button>
            </div>
        </ScreenWithHeader>
    );
};

export default PaymentScreenContainer;
