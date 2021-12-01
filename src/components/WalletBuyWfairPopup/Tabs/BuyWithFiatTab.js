import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import WallfairInput from '../../../data/images/wallfair-input.png';
import { ReactComponent as ArrowUp } from '../../../data/icons/arrow_up_icon.svg';
import { ReactComponent as ArrowDown } from '../../../data/icons/arrow_down_icon.svg';
import { convertCurrency } from '../../../api/third-party';
import transakSDK from '@transak/transak-sdk';
import transakConfig from 'constants/transakConfig';

const BuyWithFiatTab = ({ hidePopup , user }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('eur');
  const [currency, setCurrency] = useState(0);
  const [WFAIRToken, setWFAIRToken] = useState(0);

  const transakPopUp = () => {
    transakConfig.partnerCustomerId = user.userId
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

  const currencyChange = event => {
    const inputCurrency = event.target.value > 2000 ? 2000 : event.target.value;
    setCurrency(inputCurrency);

    const convertCurrencyPayload = {
      convert: selectedCurrency.toLocaleUpperCase(),
      symbol: 'WFAIR',
    };
    convertCurrency(convertCurrencyPayload);
    let WfairTokenValue = !event.target.value ? 0 : event.target.value;

    setWFAIRToken(WfairTokenValue);
  };

  const OnClickTransakContinue = () => {
    hidePopup();
    transakPopUp();
  };

  return (
    <div className={styles.buyWithFiatTabContainer}>
      <div className={styles.textContainer}>
        <p>Intro text -</p>
        <p>lorum....</p>
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
          />
          <div className={styles.inputRightContainer}>
            <div className={styles.innerContiner}>
              <div className={styles.innerContent}>
                <p>{selectedCurrency === 'eur' ? 'EUR' : 'USD'}</p>
              </div>
              <div
                className={styles.innerIcon}
                onClick={() =>
                  setSelectedCurrency(
                    selectedCurrency === 'eur' ? 'usd' : 'eur'
                  )
                }
              >
                {selectedCurrency === 'eur' ? <ArrowDown /> : <ArrowUp />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.InputLineSeparator}>
          <img src={InputLineSeparator} alt="input_line_separator" />
        </div>
        {/* WFAIR TOKEN */}
        <div className={styles.inputContiner}>
          <input type="number" value={WFAIRToken} />
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
