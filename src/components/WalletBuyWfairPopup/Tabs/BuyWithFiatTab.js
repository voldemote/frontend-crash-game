import React, { useCallback, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
import Dropdown from '../../Dropdown';
import { convertCurrency } from '../../../api/index';
import transakSDK from '@transak/transak-sdk';
import transakConfig from 'constants/transakConfig';
import { numberWithCommas } from '../../../utils/common';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import classNames from 'classnames';
import { addMetaMaskEthereum } from 'utils/helpers/ethereum';

const BuyWithFiatTab = ({ hidePopup , showWalletBuyWfairPopup, showTransakSuccessPopup, user }) => {
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
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [currency, setCurrency] = useState(0);
  const [WFAIRToken, setWFAIRToken] = useState(0);

  const handleWFAIRClick = useCallback(async () => {
    await addMetaMaskEthereum();
  }, []);

  const transakPopUp = () => {
    transakConfig.partnerCustomerId = user.userId
    transakConfig.fiatAmount = currency;
    transakConfig.fiatCurrency = selectedCurrency.label.toLocaleUpperCase();

    console.log(currency);
    let transak = new transakSDK(transakConfig);
    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, data => {
      // console.log(data);
    });

    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, data => {
      // in case required to trigger a function on close
      showWalletBuyWfairPopup()
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, orderData => {
      // console.log(orderData);
      showTransakSuccessPopup();
      transak.close();

    });
  };

  useEffect(() => {
    currencyLostFocus();
  }, [selectedCurrency]);

  const selectContent = event => {
    event.target.select();
  }

  const currencyChange = event => {
    const inputCurrency = event.target.value > 2000 ? 2000 : event.target.value;
    setCurrency(inputCurrency);
  }

  const currencyLostFocus = async (event) => {
    if (currency > 0) {

      const convertCurrencyPayload = {
        convertFrom: selectedCurrency.label.toLocaleUpperCase(),
        convertTo: 'WFAIR',
        amount: currency
      };
      
      const { response } = await convertCurrency(convertCurrencyPayload);
      const { convertedAmount } = response?.data;
      const roundedAmount = Math.floor(Number(convertedAmount) * 100) / 100;
      let WfairTokenValue = !roundedAmount ? 0 : numberWithCommas(roundedAmount);
    
      setWFAIRToken(WfairTokenValue);
    }
  }

  const OnClickTransakContinue = () => {
    hidePopup();
    transakPopUp();
  };

  const onCurrencyChange = val => {
    setSelectedCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  };

  return (
    <div className={styles.buyWithFiatTabContainer}>
      <div className={styles.wfairCalculatorContainer}>
        {/* Currency */}
        <div className={styles.inputContiner}>
          <div className={styles.labelContainer}>
            <span>You pay</span>
          </div>
          <input
            type="number"
            value={currency}
            min={1}
            max={2000}
            onChange={currencyChange}
            onBlur={currencyLostFocus}
            onClick={selectContent}
          />
          <div className={styles.inputRightContainer}>
            <div className={styles.innerContiner}>
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
        <div className={styles.InputLineSeparator}>
          <img src={InputLineSeparator} alt="input_line_separator" />
        </div>
        {/* WFAIR TOKEN */}
        <div className={styles.inputContiner}>
          <div className={styles.labelContainer}>
            <span>You receive (estimate)</span>
          </div>
          <input disabled readOnly value={WFAIRToken} />
          <div className={styles.inputRightContainer}>
            <div className={styles.coinWrapper}>
              <WfairIcon className={styles.wfairLogo} onClick={handleWFAIRClick} /><span>WFAIR</span>
            </div>
          </div>
        </div>
        <div className={styles.textContainer}>
          <p>The value shown in WFAIR is an estimate. Transactions are subject to price fluctuations.</p>
          <p>All transactions are processed via the external partner Transak.com. When you click the button below, you will be redirected to the partner page to complete the transaction.</p>
        </div>
        <button
          className={classNames(styles.transankContineButton, currency === 0 ? styles.disabled : null)}
          onClick={OnClickTransakContinue}
          disabled={currency === 0}
        >
          Continue with Transak
        </button>
      </div>
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
    showWalletBuyWfairPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletBuyWfair }));
    },
    showTransakSuccessPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.transakSuccess }));
    },
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(BuyWithFiatTab);
