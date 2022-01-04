import React, { useCallback, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
import Dropdown from '../../Dropdown';
import { convertCurrency, getUserKycData, sendBuyWithFiat } from '../../../api/index';
import transakSDK from '@transak/transak-sdk';
import transakConfig from 'constants/transakConfig';
import { numberWithCommas } from '../../../utils/common';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import classNames from 'classnames';
import { addMetaMaskEthereum } from 'utils/helpers/ethereum';
import * as _ from 'lodash';
import { TransactionActions } from 'store/actions/transaction';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';
import { TOKEN_NAME } from 'constants/Token';
import Button from 'components/Button';
import { trackWalletBuywithfiatRequest } from 'config/gtm';

const BuyWithFiatManualTab = ({ hidePopup , showWalletBuyWfairPopup, showTransakSuccessPopup, user, fetchWalletTransactions }) => {
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
  const [requestSent, setRequestSent] = useState(false);

  const handleWFAIRClick = useCallback(async () => {
    await addMetaMaskEthereum();
  }, []);

  useEffect(() => {
    currencyLostFocus();
  }, [selectedCurrency]);

  const selectContent = event => {
    event.target.select();
  }

  const currencyChange = value => {
    const inputCurrency = value > 2000 ? 2000 : value;
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
      const adjustedAmount = convertedAmount * 0.9; //90% of estimated amount to consider Transak fees
      const roundedAmount = Math.floor(Number(adjustedAmount) * 100) / 100;

      let WfairTokenValue = !roundedAmount ? 0 : numberWithCommas(roundedAmount);

      setWFAIRToken(WfairTokenValue);
    }
  }

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

  const onCurrencyChange = val => {
    setSelectedCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  };

  return (
    <div className={styles.buyWithFiatTabContainer}>
      {!requestSent &&
        <div className={styles.wfairCalculatorContainer}>
          <div className={styles.textContainer}>
            <p>
              Deposit EUR or USD to start playing in a few hours.
              Enter the amount of EUR or USD below and click continue to send us a request. 
            </p>
            <p>
              One of our Alpacas will contact you via email with instructions to complete the transaction.
            </p>
          </div>

          {/* Currency */}
          <div className={styles.inputContiner}>
            <div className={styles.labelContainer}>
              <span>You pay</span>
            </div>
            <NumberCommaInput
              value={currency}
              min={0}
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
              <span title="The value of WFAIR shown here is an estimate, as the transactions are 
              subject to price fluctuations.">You receive (estimate)</span>
            </div>
            <input disabled readOnly value={WFAIRToken} />
            <div className={styles.inputRightContainer}>
              <div className={styles.coinWrapper}>
                <WfairIcon
                  className={styles.wfairLogo}
                  onClick={handleWFAIRClick}
                />
                <span>{TOKEN_NAME}</span>
              </div>
            </div>
          </div>
          <Button
            className={classNames(
              styles.button,
              currency === 0 ? styles.disabled : null
            )}
            onClick={OnClickContinue}
            disabled={currency === 0}
          >
            Continue
          </Button>
          <div className={styles.textContainer}>
            <p>
              Transactions with EUR or USD are being manually processed
              for the time being. It means it may take up to a few hours for your
              funds to arrive into the Alpacasino wallet. We intend to automate this
              in the next weeks.
            </p>
            <p>
              In case of any questions, please get in touch with our <span onClick={() => {window.fcWidget.open()}}>Support</span>. 
            </p>
          </div>
        </div>
      }
      {requestSent &&
      <div className={styles.wfairCalculatorContainer}>
        <div className={styles.resultContainer}>
          <h2>Thank you!</h2>
          <p>Your request to deposit <b>{currency}&nbsp;{selectedCurrency.label.toLocaleUpperCase()}</b> was sent to our team.</p>
          <p>The calculated amount of <b>{WFAIRToken}&nbsp;{TOKEN_NAME}</b> is an estimate and is subject to price fluctuations.</p>
          <p>We'll contact you soon via e-mail to proceed with the transaction.<br />In case of any questions, please get in touch with our <span onClick={() => {window.fcWidget.open()}}>Support</span>.</p>
        </div>
      </div>  
      }
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
    showTransakSuccessPopup: (options) => {
      dispatch(PopupActions.show({ popupType: PopupTheme.transakSuccess, options}));
    },
    getUserInfoFromFractal: (options) => {
      dispatch(PopupActions.show({ popupType: PopupTheme.transakSuccess, options}));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(BuyWithFiatManualTab);
