import React, { useCallback, useEffect, useState } from 'react';
import styles from '../withdraw.module.scss';
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
  const [address, setAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState(0);
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

  const addressChange = useCallback(event => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);
  }, []);

  const tokenAmountChange = useCallback(event => {
    const inputAmount = event.target.value;
    setTokenAmount(inputAmount);
  }, []);

  const addressLostFocus = useCallback(event => {
    const inputAddress = event.target.value;
    const regex = /^0x[a-fA-F0-9]{40}$/g;
    const valid = inputAddress.match(regex);

    if (!valid) {
      console.error('wrong 0x address format');
      return;
    }

    setAddress(inputAddress);
  }, []);

  // const tokenAmountLostFocus = async event => {
  //   if (tokenAmount > 0) {
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
              onBlur={addressLostFocus}
              onClick={selectContent}
              placeholder="Add your wallet address starting with 0x"
            />
          </div>
          {/* WFAIR TOKEN */}
          <div className={styles.cryptoInputContainer}>
            <div className={styles.labelContainer}>
              <span>Amount</span>
            </div>
            <input 
              min={1000} 
              max={10000} 
              value={tokenAmount} 
              onChange={tokenAmountChange}
              // onBlur={tokenAmountLostFocus}
            />
            <div className={styles.inputRightContainer}>
              <WfairIcon className={styles.wfairLogo} onClick={handleWFAIRClick} />
              <span>WFAIR</span>
            </div>
          </div>
          <div className={styles.InputLineSeparator}>
            <img src={InputLineSeparator} alt="input_line_separator" />
          </div>
          {/* WFAIR TOKEN */}
          <div className={styles.cryptoInputContainer}>
            <div className={styles.labelContainer}>
              <span>You receive (estimate - fees)</span>
            </div>
            <input
              disabled
              readOnly
              value={tokenAmount}
            />
            <div className={styles.inputRightContainer}>
              <WfairIcon className={styles.wfairLogo} onClick={handleWFAIRClick} />
              <span>WFAIR</span>
            </div>
          </div>

          {/* <div className={styles.calculation}>
            <p>Estimated Transaction Fee: 123 WFAIR </p>
            
            <p><b>You receive (estimate): 111 WFAIR </b></p>
          </div> */}

          {/* Content */}
          <div className={styles.cryptoContent}>
            <p>Before proceeding, please double check that the wallet address is correct. Transactions are irreversible, and if you put the wrong address, your funds will be lost.</p>
          </div>

          <button
            className={classNames(styles.confirmButton, tokenAmount === 0 && address != null ? styles.disabled : null)}
            // onClick={OnClickConfirmAmount}
            disabled={tokenAmount === 0 && address != null}
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
