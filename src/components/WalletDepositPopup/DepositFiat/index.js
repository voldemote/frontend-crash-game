import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import {ReactComponent as LeftArrow} from '../../../data/icons/deposit/left-arrow.svg';
import Button from 'components/Button';
import PopupTheme from 'components/Popup/PopupTheme';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import { trackWalletBuywithfiatRequest } from 'config/gtm';
import { convertCurrency, sendBuyWithFiat } from 'api';
import { numberWithCommas } from 'utils/common';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';
import Dropdown from 'components/Dropdown';
import { TOKEN_NAME } from 'constants/Token';
import useDebounce from 'hooks/useDebounce';


const CURRENCY_OPTIONS = [
  {
    label: 'EUR',
    value: 0,
  },
  {
    label: 'USD',
    value: 1,
  },
];

const DepositFiat = ({user, showWalletDepositPopup}) => {

  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [currency, setCurrency] = useState(0);
  const [WFAIRToken, setWFAIRToken] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [requestSent, setRequestSent] = useState(false);

  const selectContent = event => {
    event.target.select();
  }

  const currencyChange = value => {
    const inputCurrency = value > 2000 ? 2000 : value;
    setCurrency(inputCurrency);
  }

  const onInputAmountChange = async (event) => {
    if (currency > 0) {

      const convertCurrencyPayload = {
        convertFrom: selectedCurrency.label.toLocaleUpperCase(),
        convertTo: 'WFAIR',
        amount: currency
      };

      const { response } = await convertCurrency(convertCurrencyPayload);
      const { convertedAmount } = response?.data;
      const adjustedAmount = convertedAmount * 0.9; //90% of estimated amount to consider Transak fees
      const roundedAmount = Math.floor(Number(adjustedAmount) * 100) / 100;

      // let WfairTokenValue = !roundedAmount ? 0 : numberWithCommas(roundedAmount);
      let WfairTokenValue = !roundedAmount ? 0 : roundedAmount;

      setWFAIRToken(WfairTokenValue);
      setBonus(WfairTokenValue);
    }
  }

  useEffect(() => {
    onChangeAmount();
  }, [selectedCurrency, currency])


  const OnClickContinue = async () => {
    if(currency && WFAIRToken) {

      try {
        trackWalletBuywithfiatRequest();
        sendBuyWithFiat({
          currency: selectedCurrency.label.toLocaleUpperCase(),
          userId: user.userId,
          email: user.email,
          amount: currency,
          estimate: WFAIRToken
        })

        setRequestSent(true);
      } catch (err) {
        console.err('mail not sent!');
      }
    }
  };

  const onChangeAmount = useDebounce({
    callback: onInputAmountChange,
    delay: 500,
  });

  const onCurrencyChange = val => {
    setSelectedCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  };

  const renderBackButton = () => {
    return (
      <div className={styles.chooseOtherMethod} onClick={showWalletDepositPopup}>
        <LeftArrow />
        <span>Other payment methods</span>
      </div>
    )
  }

  return (
    <div className={styles.depositFiat}>
      {/* <p className={styles.title}>
        WFAIR conversion calculator
      </p>
      <p>
        Alpacasino uses WFAIR currency to play games and win. You can convert your won WFAIR token back into crypto currency or in EUR / USD at any time around the world.
      </p> */}

      {renderBackButton()}

      <p className={styles.title}>
        Buy with EUR / USD
      </p>
      <p>
        Deposit EUR or USD to start playing in a few hours.
      </p>

      {/* Currency */}
      <div className={styles.formGroupContainer}>
        <span>You pay</span>
        <div className={styles.inputContainer}>
          <NumberCommaInput
            value={currency}
            min={0}
            max={2000}
            onChange={setCurrency}
            // onBlur={onChangeAmount}
            onClick={selectContent}
          />
          <div className={styles.inputRightContainer}>
            <div className={styles.innerContainer}>
              <Dropdown
                style={styles.dropdown}
                value={selectedCurrency.label}
                placeholder="Select currency..."
                setValue={onCurrencyChange}
                options={CURRENCY_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>

      {/* WFAIR TOKEN */}
      <div className={styles.formGroupContainer}>
        <span>Estimate</span>
        <div className={styles.inputContainer}>
          <input disabled readOnly value={WFAIRToken} />
          <div className={styles.inputRightContainer}>
            <div className={styles.coinWrapper}>
              <span>{TOKEN_NAME}</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className={styles.overview}>
        <p className={styles.title}>
          Deposit Overview
        </p>
        <div className={styles.overviewItem}>
          <span>Estimate</span><span>{numberWithCommas(WFAIRToken)} {TOKEN_NAME}</span>
        </div>
        <hr/>
        <div className={styles.overviewItem}>
          <span>Bonus</span><span className={styles.bonus}>{numberWithCommas(bonus)} {TOKEN_NAME}</span>
        </div>
        <hr/>
        <div className={styles.overviewItem}>
          <span className={styles.total}>Amount</span><span className={styles.total}>{numberWithCommas(parseFloat(WFAIRToken) + parseFloat(bonus))} {TOKEN_NAME}</span>
        </div>
        <hr/>
      </div>

      <div className={styles.summary}>
        <span>Add to Alpacasino Account in WFAIR</span>
        <p className={styles.summaryTotal}>{numberWithCommas(parseFloat(WFAIRToken) + parseFloat(bonus))} {TOKEN_NAME}</p>
      </div>

      <Button>Deposit {currency > 0 && `${numberWithCommas(currency)} ${selectedCurrency.label}`}</Button>
    </div>
  );
};

const mapStateToProps = state => {
  const user = state.authentication;

  return {
    user,
  };
};


const mapDispatchToProps = dispatch => {
  return { 
    showWalletDepositPopup: () => { 
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositFiat);

