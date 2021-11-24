import { currentNetwork } from "../../../config/config";
import Loader from "../../Loader/Loader";
import styles from "./styles.module.scss";

const Waiting = ({ setModalOpen, hash, action }) => {
  return (
    <div className={styles.promoMessage}>
      <span className={styles.prizeAmount}>{`Waiting for confirmation`}</span>
      <p>{action}</p>
      {hash && (
        <>
          <p>
            <strong
              onClick={() => {
                window.open(`${currentNetwork.explorer}tx/${hash}`, "_blank");
              }}
            >
              {hash}
            </strong>
          </p>
          <button
            className={styles.keepGoing}
            onClick={() => {
              window.open(`${currentNetwork.explorer}tx/${hash}`, "_blank");
            }}
          >
            Look up on Etherscan
          </button>
        </>
      )}
      <Loader />
    </div>
  );
};

export default Waiting;
