import styles from "./styles.module.scss";
import MetaMaskIcon from "../../data/icons/wallet/metamask.svg";
import PlusIcon from "../../data/icons/plus.svg";
import classNames from "classnames";
import { addMetaMaskEthereum } from "../../utils/helpers/ethereum";

const AddTokens = ({ onFurtherClick, className }) => {
  return (
    <div className={classNames(styles.buttonWrapper, className)}>
      <button
        className={styles.addToken}
        onClick={async () => {
          if (onFurtherClick && typeof onFurtherClick === "function") {
            onFurtherClick();
          }
          await addMetaMaskEthereum();
        }}
      >
        <img src={MetaMaskIcon} alt={`MetaMask`} />
        <img src={PlusIcon} alt={`Plus`} />
        <img src="https://main.wallfair.io/logo192.png" alt={`WallFair.`} />
        <strong>&nbsp;&nbsp;&nbsp;Add WFAIR to Metamask</strong>
      </button>
    </div>
  );
};
export default AddTokens;
