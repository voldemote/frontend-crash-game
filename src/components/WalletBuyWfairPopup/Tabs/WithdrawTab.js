import React, { useCallback, useEffect, useState } from 'react';
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
import { addMetaMaskEthereum } from 'utils/helpers/ethereum';

const networkName = {
  polygon: 'POLYGON',
  ethereum: 'ETHEREUM',
};

const WithdrawTab = () => {
  const [currency, setCurrency] = useState(0);
  const [address, setAddress] = useState('');
  const [tokenValue, setTokenValue] = useState(0);
  const [activeTab, setActiveTab] = useState(networkName.polygon);
  const [transaction, setTransaction] = useState(false);

  // useEffect(() => {
  //   currencyLostFocus();
  // }, [activeTab]);

  const handleWFAIRClick = useCallback(async () => {
    await addMetaMaskEthereum();
  }, []);

  const selectContent = event => {
    event.target.select();
  };

  const currencyChange = event => {
    const inputCurrency = event.target.value > 2000 ? 2000 : event.target.value;
    setCurrency(inputCurrency);
  };

  const addressChange = useCallback(event => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);
  });

  // const currencyLostFocus = async event => {
  //   if (currency > 0) {
  //     const convertCurrencyPayload = {
  //       convertFrom: cryptoShortName[activeTab],
  //       convertTo: 'WFAIR',
  //       amount: currency,
  //     };

  //     const { response } = await convertCurrency(convertCurrencyPayload);
  //     const { convertedAmount } = response?.data;
  //     const convertedTokenValue = !convertedAmount
  //       ? 0
  //       : convertedAmount.toFixed(4);

  //     const roundedAmount = Math.floor(Number(convertedTokenValue) * 100) / 100;
  //     let WfairTokenValue = !roundedAmount
  //       ? 0
  //       : numberWithCommas(roundedAmount);

  //     setTokenValue(WfairTokenValue);
  //   }
  // };

  // const OnClickConfirmAmount = () => {
  //   setAddress(
  //     'e94fc3db563b9e595f76bf7c3a90105a54ea4eaaf1ddb6b9950c31dc626d5d58'
  //   );
  //   setTransaction(!transaction);
  // };

  return (
    <div className={styles.withdrawContainer}>

      {!transaction && ( <>
        {/* Crypto Tabs */}
        <div className={styles.cryptoTabsContainer}>
          <div
            className={classNames(
              styles.cryptoTab,
              activeTab === networkName.polygon && styles.cryptoTabActive
            )}
            onClick={() => setActiveTab(networkName.polygon)}
          >
            {/* <BitcoinIcon /> */}
            <p className={styles.fullName}>Polygon</p>
            <p className={styles.shortName}>Polygon</p>
          </div>
          <div
            className={classNames(
              styles.cryptoTab,
              activeTab === networkName.ethereum && styles.cryptoTabActive
            )}
            onClick={() => setActiveTab(networkName.ethereum)}
          >
            {/* <EthereumIcon /> */}
            <p className={styles.fullName}>Ethereum</p>
            <p className={styles.shortName}>Ethereum</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className={styles.inputFieldsContainer}>
          {/* Currency */}
          <div className={styles.addressInputContainer}>
            <div className={styles.labelContainer}>
              <span>
                {activeTab === networkName.polygon && (
                  'Polygon Wallet Address'
                )}
                {activeTab === networkName.ethereum && (
                  'Ethereum Wallet Address'
                )}
              </span>
            </div>
            <input
              type="text"
              value={address}
              onChange={addressChange}
              // onBlur={currencyLostFocus}
              onClick={selectContent}
            />
          </div>
          {/* WFAIR TOKEN */}
          <div className={styles.cryptoInputContainer}>
            <div className={styles.labelContainer}>
              <span>Amount</span>
            </div>
            <input min={1000} max={10000} value={tokenValue} />
            <div className={styles.inputRightContainer}>
              <WfairIcon className={styles.wfairLogo} onClick={handleWFAIRClick} />
              <span>WFAIR</span>
            </div>
          </div>

          {/* Content */}
          <div className={styles.cryptoContent}>
            <p>Transactions with BTC, ETH and LTC are being manually processed for the time being, and can take a few hours. We intend to automate this in the next weeks.</p>
            <p>Please follow the instructions provided in the next step in order to use this method of deposit.</p>
          </div>

          <button
            className={classNames(styles.transankContineButton, currency === 0 ? styles.disabled : null)}
            // onClick={OnClickConfirmAmount}
            disabled={currency === 0}
          >
            Confirm Amount
          </button>
        </div>
      </>)}


      {/* transaction Section
      {transaction && (
        <div className={styles.transactionContainer}>
          
          <div className={styles.transferSection}>
            <span className={styles.backBtn} onClick={() => setTransaction(false)}>Back</span>
            <p>
              Please transfer {' '}
              <span>
                {currency} {cryptoShortName[activeTab]}
              </span>{' '}
              to the following {cryptoShortName[activeTab]} Address
            </p>
            <ReferralLinkCopyInputBox
              className={styles.referralLink}
              inputTheme={InputBoxTheme.copyToClipboardInputWhite}
              forDeposit={address}
            />
            <p>Once transaction is completed, please send proof of transaction via email to <a href="mailto:deposits@alpacasino.io?subject=Deposit">deposits@alpacasino.io</a></p>
          
            { <div className={styles.transferSectionCopy}>
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
            <button className={styles.sendUrlBtn}> Send</button> }
          </div>
        </div>
      )} */}
    </div>
  );
};

export default WithdrawTab;
