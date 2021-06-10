import _                           from 'lodash';
import classNames                  from 'classnames';
import Divider                     from '../../components/Divider';
import PaymentAction               from '../../constants/PaymentAction';
import PaymentNumberInput          from '../../components/PaymentNumberInput';
import PaymentScreenContainer      from '../../components/PaymentScreenContainer';
import React                       from 'react';
import styles                      from './styles.module.scss';
import { connect }                 from 'react-redux';
import { getPaymentProviderTitle } from '../../helper/PaymentProviderTitle';
import { useParams }               from 'react-router-dom';
import { useState }                from 'react';
import { AlertActions }            from '../../store/actions/alert';

const WalletDeposit = ({ showError }) => {
    const { paymentProvider }             = useParams();
    const [depositValue, setDepositValue] = useState(0);

    const getFees = () => {
        return 0;
    };

    const onConfirmButtonClick = () => {
        showError('You already got your free EVNT tokens!');
    };

    const renderPaymentLine = (description, value, showSign = false, highlightValueGreen = false) => {
        let formattedValue = _.round(value, 2).toFixed(2);
        formattedValue     = getPaymentProviderTitle(paymentProvider) + ' ' + formattedValue;

        if (showSign) {
            formattedValue = (
                    value >= 0 ?
                        '+' :
                        '-'
                ) + ' '
                + formattedValue;
        }

        return (
            <div className={styles.paymentLine}>
                <span className={styles.paymentLineDescription}>
                    {description}
                </span>
                <span
                    className={classNames(
                        styles.paymentLineValue,
                        highlightValueGreen ? styles.paymentLineValueGreen : null,
                    )}
                >
                    {formattedValue}
                </span>
            </div>
        );
    };

    const renderPaymentTotalCalculation = () => {
        return (
            <>
                {renderPaymentLine('Total', depositValue, true, true)}
            </>
        );
    };

    const renderPaymentComposition = () => {
        return (
            <>
                {renderPaymentLine('Transaction fees', getFees())}
            </>
        );
    };

    return (
        <PaymentScreenContainer
            paymentAction={PaymentAction.deposit}
            onConfirmButtonClick={onConfirmButtonClick}
        >
            <div className={styles.paymentNumberContainer}>
                <PaymentNumberInput
                    paymentProvider={paymentProvider}
                    value={depositValue}
                    setValue={setDepositValue}
                    maxValue={1000000}
                />
            </div>
            <div className={styles.paymentCompositionContainer}>
                {renderPaymentComposition()}
            </div>
            <Divider noMargin={true} />
            <div className={styles.paymentTotalContainer}>
                {renderPaymentTotalCalculation()}
            </div>
        </PaymentScreenContainer>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        showError: (message) => {
            dispatch(AlertActions.showError({ message }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WalletDeposit);