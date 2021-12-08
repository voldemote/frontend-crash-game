import { useEffect, useState } from 'react';

import { currentNetwork } from '../../../config/config';
import Loader from '../../Loader/Loader';
import styles from './styles.module.scss';
import WfairLogo from '../../../data/images/wfair-logo-splash.png';

const Waiting = ({ setModalOpen, hash, action }) => {
  const [mainUrl, setMainUrl] = useState();
  const [mainLabel, setMainLabel] = useState();

  useEffect(() => {
    const updatedNetwork = async () => {
      const networkSelected = await currentNetwork();
      setMainUrl(networkSelected.explorer);
      setMainLabel(networkSelected.label);
    };
    updatedNetwork();
  }, []);

  return (
    <div className={styles.promoMessage}>
      <span>
        <img src={WfairLogo} className={styles.logo} alt="Wallfair logo" />
      </span>
      <div className={styles.title}>Waiting for confirmation</div>
      <div className={styles.content}>
        {/* <div className={styles.message}>
          You will receive {Number(calculatedAmount).toFixed(2)} {currency} on your Wallet
        </div> */}
        <div className={styles.info}>
          Please check and confirm the transaction on your wallet (i.e.
          Metamask) to continue with the process. As soon as the transaction
          proceeds, the transaction hash will be shown.
        </div>
      </div>
      {/* <p>{action}</p> */}
      {hash && (
        <>
          <p>
            <strong
              onClick={() => {
                window.open(`${mainUrl}tx/${hash}`, '_blank');
              }}
            >
              {hash}
            </strong>
          </p>
          <button
            className={styles.keepGoing}
            onClick={() => {
              window.open(`${mainUrl}tx/${hash}`, '_blank');
            }}
          >
            Look up on {mainLabel}
          </button>
        </>
      )}
      <Loader />
    </div>
  );
};

export default Waiting;
