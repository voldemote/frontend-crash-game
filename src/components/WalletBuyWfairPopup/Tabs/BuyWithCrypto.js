import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import WallfairInput from '../../../data/images/wallfair-input.png';
import { ReactComponent as ArrowUp } from '../../../data/icons/arrow_up_icon.svg';
import { ReactComponent as ArrowDown } from '../../../data/icons/arrow_down_icon.svg';
import { ReactComponent as CryptoTabIcon } from '../../../data/icons/crypto-tab-icon.svg';
import { ReactComponent as BitcoinIcon } from '../../../data/icons/bitcoin-symbol.svg';
import { ReactComponent as EthereumIcon } from '../../../data/icons/ethereum-symbol.svg';
import { ReactComponent as LitecoinIcon } from '../../../data/icons/litecoin-symbol.svg';
import { convertCurrency } from '../../../api/third-party';
import classNames from 'classnames';


const BuyWithCrypto = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('eur');
  const [currency, setCurrency] = useState(0);
  const [WFAIRToken, setWFAIRToken] = useState(0);
  const [activeTab, setActiveTab] = useState('bitcoin')

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

  const OnClickConfirmAmount = () => {
    // console.log('---->>> OnlickOnClickTransakContinue');
    // const transak = {}
    // transakPopUp(transak);
  };

  return (
    <div className={styles.buyWithCryptoContainer}>
        {/* Crypto Tabs */}
      <div className={styles.cryptoTabsContianer}>
          <div className={classNames(styles.cryptoTab, activeTab=== 'bitcoin' && styles.cryptoTabActive)} onClick={()=> setActiveTab('bitcoin')}>
               <CryptoTabIcon />
               <p>Bitcoin</p>
          </div>
          <div className={classNames(styles.cryptoTab, activeTab=== 'ethereum' && styles.cryptoTabActive)} onClick={()=> setActiveTab('ethereum')}>
               <CryptoTabIcon />
               <p>Ethereum</p>
          </div>
          <div className={classNames(styles.cryptoTab, activeTab=== 'litecoin' && styles.cryptoTabActive)} onClick={()=> setActiveTab('litecoin')}>
               <CryptoTabIcon />
               <p>Litecoin</p>
          </div>
      </div>

      {/* Crypto Calculator */}
      <div className={styles.cryptoCalculatorContainer}>
        {/* Currency */}
        <div className={styles.cryptoInputContiner}>
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
        <div className={styles.cryptoInputContiner}>
          <input type="number" value={WFAIRToken} />
          <div className={styles.inputRightContainer}>
              <BitcoinIcon />
            {/* <img src={WallfairInput} alt="wallfair-input" /> */}
          </div>
        </div>
        <button
          className={styles.transankContineButton}
          onClick={OnClickConfirmAmount}
        >
          Confirm Amount
        </button>
      </div>
    </div>
  );
};

export default BuyWithCrypto;
