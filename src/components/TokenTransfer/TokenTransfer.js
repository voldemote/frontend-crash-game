import React, { useState, useEffect, useCallback } from 'react';
import { numberWithCommas } from '../../utils/common';
import TxModal from '../TxModal';
import WFAIRTransfer from '../WFAIRTransfer';
import styles from './styles.module.scss';
import Loader from 'components/Loader/Loader';
import TokenNumberInput from 'components/TokenNumberInput';
import { formatToFixed } from 'helper/FormatNumbers';
import classNames from 'classnames';

const TokenTransfer = ({
  provider,
  setter,
  hash,
  balance,
  showCancel = false,
  tranferAddress,
  contractAddress,
}) => {
  const [transferValue, setTransferValue] = useState('0');
  const [blocked, setBlocked] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  const [TXSuccess, setTXSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setformError] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!modalOpen) {
      setBlocked(false);
      setTXSuccess(false);
    }
  }, [modalOpen]);

  const getLookupLabel = () => {
    return Object.keys()
  };

  const handleTransaction = useCallback(() => {
    console.log('provider', provider);
    console.log('tranferAddress', tranferAddress);
    console.log('transferValue', transferValue);
    console.log('WFAIRAddress', contractAddress);

    setBlocked(true);
    setformError('');
    WFAIRTransfer({
      provider,
      setter,
      contractAddress,
      tokenAmount: transferValue,
      to_address: tranferAddress,
      setBlocked: setBlocked,
      setModalOpen: setModalOpen,
      setTXSuccess: setTXSuccess,
      setformError: setformError,
    });
    setTransferValue('0');
  }, [provider, setter, tranferAddress, transferValue]);
  
  if (balance < 1) {
    return isloading ? (
      <Loader />
    ) : (
      <div className={styles.transfer}>Insufficient balance for a deposit</div>
    );
  }

  const renderBody = () => (
    <>
      {modalOpen && (
        <TxModal
          hash={hash}
          blocked={blocked}
          success={TXSuccess}
          setModalOpen={setModalOpen}
          action={'Token Transfer'}
          lookupLabel={getLookupLabel}
        />
      )}
      <div className={styles.transferWrapper}>
        <strong>{`You can transfer up to ${numberWithCommas(
          balance > 2000 ? 2000 : Number(balance).toFixed(2)
        )} WFAIR`}</strong>
        {formError && (
          <div className={styles.transferFormErrors}>
            <em>{formError}</em>
          </div>
        )}

        {balance > 0 ? (
          <>
            <TokenNumberInput
              className={styles.tokenNumberInput}
              key="transferValue"
              value={transferValue}
              currency={'WFAIR'}
              setValue={setTransferValue}
              minValue={0}
              decimalPlaces={0}
              maxValue={formatToFixed(
                balance < 2000 ? balance : 2000
              )}
              halfIcon={false}
              doubleIcon={false}               
            />
            <div className={styles.buttonWrapper}>
              <button
                className={classNames(styles.transferButton, Number(transferValue) === 0? styles.disabled : null)}
                onClick={handleTransaction}
                disabled={Number(transferValue) === 0}
              >
                Send Transaction
              </button>

              {showCancel && (
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setformError('');
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </>
        ) : (
          <div className={styles.transfer}>
            Insufficient Balance for a Transfer
          </div>
        )}
      </div>
    </>
  );

  return isloading ? <Loader /> : renderBody();
};

export default React.memo(TokenTransfer);
