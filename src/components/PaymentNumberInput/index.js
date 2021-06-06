import _                           from 'lodash';
import classNames                  from 'classnames';
import Icon                        from '../Icon';
import IconTheme                   from '../Icon/IconTheme';
import IconType                    from '../Icon/IconType';
import Input                       from '../Input';
import React                       from 'react';
import styles                      from './styles.module.scss';
import { getPaymentProviderTitle } from '../../helper/PaymentProviderTitle';

const PaymentNumberInput = ({ paymentProvider, value, setValue, maxValue, className, ...props }) => {
    const arrowHeight = 12;
    const arrowWidth  = 'auto';

    const changeValue = (toValue) => {
        let numberValue = _.toNumber(toValue);

        if (numberValue < 0) {
            numberValue = 0;
        }

        if (
            maxValue &&
            numberValue > maxValue
        ) {
            numberValue = maxValue;
        }

        numberValue = _.round(numberValue, 2);

        setValue(numberValue);
    };

    const increaseValue = () => {
        changeValue(_.toNumber(value) + 1);
    };

    const decreaseValue = () => {
        changeValue(_.toNumber(value) - 1);
    };

    return (
        <div
            className={classNames(
                styles.paymentNumberInputContainer,
                className,
            )}
        >
            <Input
                className={styles.input}
                type={'number'}
                value={value}
                onChange={(event) => changeValue(event.target.value)}
                {...props}
            />
            <span className={styles.eventTokenLabel}>
                {getPaymentProviderTitle(paymentProvider)}
            </span>
            <div className={styles.changeNumberButtonContainer}>
                <Icon
                    iconType={IconType.arrowUp}
                    width={arrowWidth}
                    height={arrowHeight}
                    iconTheme={IconTheme.primaryLightTransparent}
                    onClick={increaseValue}
                />
                <Icon
                    iconType={IconType.arrowDown}
                    width={arrowWidth}
                    height={arrowHeight}
                    iconTheme={IconTheme.primaryLightTransparent}
                    onClick={decreaseValue}
                />
            </div>
        </div>
    );
};

export default PaymentNumberInput;