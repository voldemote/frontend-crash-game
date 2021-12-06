import { useEffect, useState } from 'react';

import { currentNetwork } from '../../../config/config';
import Loader from '../../Loader/Loader';
import styles from './styles.module.scss';

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
      <span className={styles.prizeAmount}>{`Waiting for confirmation`}</span>
      <p>{action}</p>
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
