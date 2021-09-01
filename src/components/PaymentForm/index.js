import styles from './styles.module.scss';
import Dropdown from '../Dropdown';
import { useState } from 'react';
import _ from 'lodash';
import InputBox from 'components/InputBox';
import { TOKEN_NAME } from 'constants/Token';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import classNames from 'classnames';
import HighlightType from 'components/Highlight/HighlightType';
import Button from 'components/Button';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import { CURRENCY_OPTIONS, PAYMENT_TYPE } from '../../constants/Payment';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';

const PaymentForm = ({ paymentType, showPopup }) => {

  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [amount, setAmount] = useState(0);
  const [walletAddress, setWalletAddress] = useState(null);
  const [transactionFee, setTransactionFee] = useState(0.25);

  const isWithdrawal = () =>  {
    return paymentType === PAYMENT_TYPE.withdrawal;
  };

  const settings = {
    [PAYMENT_TYPE.withdrawal]: {
      amountLabel: `Fill amount of ${TOKEN_NAME} to be withdrawn`,
      buttonText: 'Withdraw',
      buttonIcon: IconType.withdrawal,
    },
    [PAYMENT_TYPE.deposit]: {
      amountLabel: `Fill amount of ${TOKEN_NAME}`,
      buttonText: 'Show QR',
      buttonIcon: IconType.deposit,
    },
  };

  const onCurrencyChange = val => {
    setCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  };

  const handleSubmit = () => {
    if (isWithdrawal()) {
      showPopup(PopupTheme.withdrawalSuccess, { 
        small: true,
        withdrawal: {
          amountReceived: amount,
          currency: currency.label,
          wfairAmount: 3059,
          btcEquivalent: 30495,
          fee: 0.25,
        }
      });
    } else {
      showPopup(PopupTheme.deposit, {
        small: true,
        deposit: {
          address: walletAddress || 'dgkjnvkjgkdjfvndkjnvdkfjvndfkj',
        }
      });
    }
    
  };

  return (
    <div className={styles.depositForm}>
      <div className={styles.formGroup}>
        <div className={styles.labelHeading}>
          <div className={styles.number}>1</div>
          <div className={styles.label}>Choose currency</div>
        </div>
        <Dropdown 
          // errorText={}
          value={currency.label}
          placeholder='Select currency...'
          setValue={onCurrencyChange}
          options={CURRENCY_OPTIONS}
        />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelHeading}>
          <div className={styles.number}>2</div>
          <div className={styles.label}>{settings[paymentType].amountLabel}</div>
        </div>
        {
          !isWithdrawal() &&
          <div className={classNames(styles.inputDescription, styles.top)}>
            How much {TOKEN_NAME} do you want to receive?
          </div>
        }
        <InputBox
          type={'number'}
          // errorText={}
          value={amount}
          setValue={setAmount}
        />
        <div className={classNames(styles.inputDescription, styles.bottom)}>
          Transaction Fee: <span className={styles.number}>{transactionFee}</span>
        </div>
      </div>

      <div className={classNames(styles.switchable, isWithdrawal() ? styles.reverse : null)}>
        <div className={styles.formGroup}>
          <div className={styles.labelHeading}>
            <div className={styles.number}>{isWithdrawal() ? 4 : 3}</div>
            <div className={styles.label}>Amount to be transferred</div>
          </div>
          <InputBox
            type={'string'}
            value={`${amount > 0 ? amount - transactionFee : 0} ${currency.label}`}
            theme={InputBoxTheme.dashedBorderTransparent}
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelHeading}>
            <div className={styles.number}>{isWithdrawal() ? 3 : 4}</div>
            <div className={styles.label}>Receipient's Wallet Address</div>
          </div>
          <InputBox
            type={'text'}
            value={'http://dgkjnvkjgkdjfvndkjnvdkfjvndfkj'}
            setValue={setWalletAddress}
            theme={isWithdrawal() ? InputBoxTheme.defaultInput : InputBoxTheme.dashedBorderTransparent}
          />
        </div>
      </div>

      <Button
          className={styles.submitButton}
          onClick={handleSubmit}
          highlightType={HighlightType.highlightDeposit}
          disabled={false}
          disabledWithOverlay={false}
          withoutBackground={true}
        >
          <Icon
            iconType={settings[paymentType].buttonIcon}
            iconTheme={IconTheme.black}
            width={24}
          />
          {settings[paymentType].buttonText}
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options = null) => {
      dispatch(PopupActions.show({ popupType, options }));
    },
  };
};

export default connect(null, mapDispatchToProps)(PaymentForm);