import React            from 'react';
import styles           from './styles.module.scss';
import ScreenWithHeader from '../ScreenWithHeaderContainer';
import Routes           from '../../constants/Routes';
import PaymentAction    from '../../constants/PaymentAction';
import HighlightType    from '../Highlight/HighlightType';
import Button           from '../Button';

const PaymentScreenContainer = ({ paymentAction, children }) => {
    const getSubtitle = () => {
        switch (paymentAction) {
            case PaymentAction.withdrawal:
                return 'How much do you want to withdraw?';

            case PaymentAction.deposit:
                return 'How much do you want to deposit?';
        }
    };

    const getConfirmButtonText = () => {
        switch (paymentAction) {
            case PaymentAction.withdrawal:
                return 'Confirm Withdrawal';

            case PaymentAction.deposit:
                return 'Confirm Deposit';
        }
    };

    return (
        <ScreenWithHeader
            subtitle={getSubtitle()}
            returnRoute={Routes.wallet}
        >
            <div className={styles.paymentScreenContainer}>
                {children}
                <Button
                    className={styles.confirmButton}
                    highlightType={HighlightType.highlightHomeCtaBet}
                    withoutBackground={true}
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
