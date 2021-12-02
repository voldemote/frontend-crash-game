import React, { useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import Dropdown from '../../Dropdown';
import { ReactComponent as ArrowUp } from '../../../data/icons/arrow_up_icon.svg';
import { ReactComponent as ArrowDown } from '../../../data/icons/arrow_down_icon.svg';
import { ReactComponent as BitcoinIcon } from '../../../data/icons/bitcoin-symbol.svg';
import { ReactComponent as EthereumIcon } from '../../../data/icons/ethereum-symbol.svg';
import { ReactComponent as LitecoinIcon } from '../../../data/icons/litecoin-symbol.svg';
import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
import { convertCurrency } from '../../../api/index';
import classNames from 'classnames';
import { numberWithCommas } from '../../../utils/common';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';

const content = {
  bitcoin: `Send any amount of BTC to the following address. In the case of a non-instant deposit, 1 confirmation is required. We do not accept BEP20 from Binance.
Alpacasino does not accept bitcoin that originates from any mixing services; please refrain from depositing directly or indirectly from these services.`,
  ethereum: `Send any amount of ETH to the following address. In the case of a non-instant deposit, 1 confirmation is required. We do not accept BEP20 from Binance.
Alpacasino does not accept ethereum that originates from any mixing services; please refrain from depositing directly or indirectly from these services.`,
  litecoin: `Send any amount of LTC to the following address. In the case of a non-instant deposit, 1 confirmation is required. We do not accept BEP20 from Binance.
Alpacasino does not accept litecoin that originates from any mixing services; please refrain from depositing directly or indirectly from these services.`,
};
const cryptoShortName = {
  bitcoin: 'BTC',
  ethereum: `ETH`,
  litecoin: `LTC`,
};

const BuyWithCrypto = () => {
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
  const [tokenValue, setTokenValue] = useState(0);
  const [activeTab, setActiveTab] = useState('bitcoin');
  const [address, setAddress] = useState('');
  const [url, setUrl] = useState('');
  const [transaction, setTransaction] = useState(false);

  useEffect(() => {
    currencyLostFocus();
  }, [activeTab, selectedCurrency]);

  const selectContent = event => {
    event.target.select();
  };

  const currencyChange = event => {
    const inputCurrency = event.target.value > 2000 ? 2000 : event.target.value;
    setCurrency(inputCurrency);
  };

  const currencyLostFocus = async event => {
    if (currency > 0) {
      const convertCurrencyPayload = {
        convertFrom: cryptoShortName[activeTab],
        convertTo: 'WFAIR',
        amount: currency,
      };

      const { response } = await convertCurrency(convertCurrencyPayload);
      const { convertedAmount } = response?.data;
      const convertedTokenValue = !convertedAmount
        ? 0
        : convertedAmount.toFixed(4);

      const roundedAmount = Math.floor(Number(convertedTokenValue) * 100) / 100;
      let WfairTokenValue = !roundedAmount
        ? 0
        : numberWithCommas(roundedAmount);

      setTokenValue(WfairTokenValue);
    }
  };

  const OnClickConfirmAmount = () => {
    // const transak = {}
    // transakPopUp(transak);
    setAddress(
      'e94fc3db563b9e595f76bf7c3a90105a54ea4eaaf1ddb6b9950c31dc626d5d58'
    );
    setTransaction(!transaction);
  };

  const onCurrencyChange = val => {
    setSelectedCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  };
  return (
    <div className={styles.buyWithCryptoContainer}>
      {/* Crypto Tabs */}
      <div className={styles.cryptoTabsContianer}>
        <div
          className={classNames(
            styles.cryptoTab,
            activeTab === 'bitcoin' && styles.cryptoTabActive
          )}
          onClick={() => setActiveTab('bitcoin')}
        >
          <BitcoinIcon />
          <p className={styles.fullName}>Bitcoin</p>
          <p className={styles.shortName}>BTC</p>
        </div>
        <div
          className={classNames(
            styles.cryptoTab,
            activeTab === 'ethereum' && styles.cryptoTabActive
          )}
          onClick={() => setActiveTab('ethereum')}
        >
          <EthereumIcon />
          <p className={styles.fullName}>Ethereum</p>
          <p className={styles.shortName}>ETH</p>
        </div>
        <div
          className={classNames(
            styles.cryptoTab,
            activeTab === 'litecoin' && styles.cryptoTabActive
          )}
          onClick={() => setActiveTab('litecoin')}
        >
          <LitecoinIcon />
          <p className={styles.fullName}>Litecoin</p>
          <p className={styles.shortName}>LTC</p>
        </div>
      </div>

      {/* Crypto Calculator */}
      <div className={styles.cryptoCalculatorContainer}>
        {/* Currency */}
        <div className={styles.cryptoInputContiner}>
          <div className={styles.labelContainer}>
            <span>You pay</span>
          </div>
          <input
            value={currency}
            min={1}
            max={2000}
            onChange={currencyChange}
            onBlur={currencyLostFocus}
            onClick={selectContent}
          />
          <div className={styles.inputRightContainer}>
            {activeTab === 'bitcoin' && (
              <>
                <BitcoinIcon />
                BTC
              </>
            )}
            {activeTab === 'ethereum' && (
              <>
                <EthereumIcon />
                ETH
              </>
            )}
            {activeTab === 'litecoin' && (
              <>
                <LitecoinIcon />
                LTC
              </>
            )}
            {/* <img src={WallfairInput} alt="wallfair-input" /> */}
          </div>
        </div>
        <div className={styles.InputLineSeparator}>
          <img src={InputLineSeparator} alt="input_line_separator" />
        </div>
        {/* WFAIR TOKEN */}
        <div className={styles.cryptoInputContiner}>
          <div className={styles.labelContainer}>
            <span>You receive</span>
          </div>
          <input disabled readOnly value={tokenValue} />
          <div className={styles.inputRightContainer}>
            <WfairIcon />
            <span>WFAIR</span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.cryptoContent}>
          <p>{content[activeTab]}</p>
        </div>

        <button
          className={styles.transankContineButton}
          onClick={OnClickConfirmAmount}
        >
          Confirm Amount
        </button>
      </div>
      {/* transaction Section */}
      {transaction && (
        <div className={styles.transactionContainer}>
          <div className={styles.transferSection}>
            <p>
              Please transfer the{' '}
              <span>
                {tokenValue} {cryptoShortName[activeTab]}
              </span>{' '}
              to the following {cryptoShortName[activeTab]} Address
            </p>
            <ReferralLinkCopyInputBox
              className={styles.referralLink}
              inputTheme={InputBoxTheme.copyToClipboardInputWhite}
              forDeposit={address}
            />
          
            <div className={styles.transferSectionCopy}>
              <p>Send Transaction URL</p>
              <div className={styles.cryptoUrlContiner}>
                <input
                  type="text"
                  value={url}
                  placeholder="Paste URL here"
                  onChange={e => setUrl(e.target.value)}
                />
              </div>
            </div>
            <button className={styles.sendUrlBtn}> Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyWithCrypto;
