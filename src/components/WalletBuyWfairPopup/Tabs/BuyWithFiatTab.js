import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import WallfairInput from '../../../data/images/wallfair-input.png';
import { ReactComponent as ArrowUp } from '../../../data/icons/arrow_up_icon.svg';
import { ReactComponent as ArrowDown } from '../../../data/icons/arrow_down_icon.svg';
import { convertCurrency } from '../../../api/third-party';
import transakSDK from '@transak/transak-sdk';

const BuyWithFiatTab = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('eur');
  const [currency, setCurrency] = useState(0);
  const [WFAIRToken, setWFAIRToken] = useState(0);

  const { email } = useSelector(state => state.authentication);
  let transak = {
    apiKey: '82fbd931-e077-46d2-87aa-272b72d4962c', // Your API Key
    environment: 'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'MATIC',
    cryptoCurrencyCode: 'MATIC',
    walletAddress: '0xB56AE8254dF096173A27700bf1F1EC2b659F3eC8', // Our backend wallet (should not be changeable)
    disableWalletAddressForm: true,
    networks: 'ethereum,mainnet,polygon,kovan',
    themeColor: '7879f1', // App theme color
    countryCode: 'DE', // INR/GBP
    email, // Your customer's email address
    hideMenu: true,
    // redirectURL: window.location.origin,
    // hostURL: window.location.origin,
    partnerCustomerId: '615bf607f04fbb15aa5dd367', // Internal user id (mongo db)
  };

  const transakQueryParams = Object.keys(transak)
    .map(key => transak[key] && `${key}=${transak[key]}`)
    .join('&');

  const transakRedner = () => (
    <iframe
      title="Transak On/Off Ramp Widget (Website)"
      src={`https://staging-global.transak.com?${transakQueryParams}`}
      frameBorder="no"
      allowtransparency="true"
      allowFullScreen=""
      className={styles.buyWithFiatTabIframe}
    ></iframe>
  );

  const transakPopUp = (config) => {
    let transak = new transakSDK(config);

    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, data => {
      console.log(data);
    });

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, orderData => {
      transak.close();
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, orderData => {
      console.log(orderData);
      transak.close();
    });
  };

  const currencyChange = event => {
    console.log('--->>>Cal', event.target.value);
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
    // console.log('---->>> OnlickOnClickTransakContinue');
    // const transak = {}
    // transakPopUp(transak);
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

export default BuyWithFiatTab;
