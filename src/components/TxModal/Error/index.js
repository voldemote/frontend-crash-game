import { currentNetwork } from "../../../config/config";
import styles from "./styles.module.scss";

const Error = ({ setModalOpen, hash }) => {
  return (
    <div className={styles.promoMessage}>
      <span className={styles.prizeAmount}>{`Oopssssss`}</span>
      <p>{`Your transaction has failed.`}</p>
      {hash && (
        <>
          <p>
            Look up on Etherscan <br />
            <strong
              onClick={() => {
                window.open(`${currentNetwork.explorer}tx/${hash}`, "_blank");
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
