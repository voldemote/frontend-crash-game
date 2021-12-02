import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import WallfairInput from '../../../data/images/wallfair-input.png';
import Dropdown from '../../Dropdown';
import { convertCurrency } from '../../../api/index';
import transakSDK from '@transak/transak-sdk';
import transakConfig from 'constants/transakConfig';
import { numberWithCommas } from '../../../utils/common';

const BuyWithFiatTab = ({ hidePopup , user }) => {
  const CURRENCY_OPTIONS = [
    {
      label: 'USD',
      value: 0,
    },
    {
      label: 'EUR',
      value: 1,
    },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [currency, setCurrency] = useState(0);
  const [WFAIRToken, setWFAIRToken] = useState(0);

  const transakPopUp = () => {
    transakConfig.partnerCustomerId = user.userId
    transakConfig.fiatAmount = currency;
    transakConfig.fiatCurrency = selectedCurrency.label;
    transakConfig.apiKey = 11111;

    console.log(currency);
    let transak = new transakSDK(transakConfig);
    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, data => {
      // console.log(data);
    });

    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, data => {
      // in case required to trigger a function on close
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, orderData => {
      // console.log(orderData);
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
      const { WFAIR, convertedAmount } = response?.data;
      const roundedAmount = Math.floor(Number(convertedAmount) * 100) / 100;
      console.log(roundedAmount);
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
      <div className={styles.textContainer}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor tellus, pellentesque volutpat augue eu, gravida volutpat ipsum.</p>
        <p>Sed venenatis accumsan tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
      <div className={styles.wfairCalculatorContainer}>
        {/* Currency */}
        <div className={styles.inputContiner}>
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
          <input disabled readonly value={WFAIRToken} />
          <div className={styles.inputRightContainer}>
            <img src={WallfairInput} alt="wallfair-input" />
          </div>
        </div>
        <button
          className={styles.transankContineButton}
          onClick={OnClickTransakContinue}
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


export default connect(mapStateToProps, null)(BuyWithFiatTab);
