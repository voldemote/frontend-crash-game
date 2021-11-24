import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectBalances } from '../../state/wallfair/slice';
import { numberWithCommas } from '../../utils/common';
import TxModal from '../TxModal';
import WFAIRTransfer from '../WFAIRTransfer';
import styles from './styles.module.scss';
import Loader from 'components/Loader/Loader';

const TokenTransfer = ({
  provider,
  setter,
  hash,
  balance,
  showCancel = false,
  tranferAddress,
  account,
}) => {
  const [transferValue, setTransferValue] = useState('0');
  const [blocked, setBlocked] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  const [TXSuccess, setTXSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setformError] = useState('');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!modalOpen) {
      setBlocked(false);
      setTXSuccess(false);
    }
  }, [modalOpen]);
  console.log('balance', balance)
  if (balance < 1) {
    return isloading ? (
      <Loader />
    ) : (
      <div className={styles.transfer}>Insufficient Balance for a Transfer</div>
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
        />
      )}
      <div className={styles.transferWrapper}>
        <strong>{`You can maximally transfer ${numberWithCommas(
          balance > 2000 ? 2000 : balance
        )} WFAIR`}</strong>
        {formError && (
          <div className={styles.transferFormErrors}>
            <em>{formError}</em>
          </div>
        )}
        {/* <input
          key="transferAddress"
          placeholder="Recipient Address"
          value={transferAddress}
          onChange={(e) => setTransferAddress(e.target.value)}
        /> */}
        {balance > 1 ? (
          <>
            <input
              key="transferValue"
              placeholder="WFAIR Amount"
              value={transferValue}
              onChange={e => {
                if (e.target.value <= balance) {
                  setTransferValue(
                    e.target.value
                      .replace(/[^0-9.,]/g, '')
                      .replace(/(,)/g, '.')
                      .replace(/(\..*?)\..*/g, '$1')
                  );
                }
              }}
            />
            <div className={styles.buttonWrapper}>
              <button
                className={styles.transferButton}
                onClick={() => {
                  setBlocked(true);
                  setformError('');
                  WFAIRTransfer({
                    provider: provider,
                    setter: setter,
                    tokenAmount: transferValue,
                    to_address: tranferAddress,
                    setBlocked: setBlocked,
                    setModalOpen: setModalOpen,
                    setTXSuccess: setTXSuccess,
                    setformError: setformError,
                  });
                  setTransferValue('0');
                }}
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
