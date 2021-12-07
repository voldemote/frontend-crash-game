import PopupTheme from "components/Popup/PopupTheme";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PopupActions } from "store/actions/popup";
import { currentNetwork } from "../../../config/config";
import styles from "./styles.module.scss";

const Error = ({ setModalOpen, hash, showWalletBuyWfairPopup }) => {

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
          showWalletBuyWfairPopup();
        }}
      >
        Close
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showWalletBuyWfairPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletBuyWfair }));
    },
  };
};


export default connect(null, mapDispatchToProps)(Error);
