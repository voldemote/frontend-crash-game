import { useEffect, useState } from "react";
import { currentNetwork } from "../../../config/config";
import styles from "./styles.module.scss";

const Error = ({ setModalOpen, hash }) => {

  const [mainUrl, setMainUrl] = useState()
  const [mainLabel, setMainLabel] = useState();


  useEffect(() => {
    const updatedNetwork = async () => {
      const networkSelected = await currentNetwork()
      setMainUrl(networkSelected.explorer)
      setMainLabel(networkSelected.label);
    }
    updatedNetwork()
  }, [])

  return (
    <div className={styles.promoMessage}>
      <span className={styles.prizeAmount}>{`Oopssssss`}</span>
      <p>{`Your transaction has failed.`}</p>
      {hash && (
        <>
          <p>
            Look up on {mainLabel} <br />
            <strong
              onClick={() => {
                window.open(`${mainUrl}tx/${hash}`, "_blank");
              }}
            >
              {hash}
            </strong>
          </p>
          <br />
        </>
      )}
      <button
        className={styles.keepGoing}
        onClick={() => {
          setModalOpen(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Error;
