import Waiting from "./Waiting";
import Success from "./Success";
import Error from "./Error";
import { connect } from "react-redux";
import PopupTheme from "components/Popup/PopupTheme";
import { PopupActions } from "store/actions/popup";

const TxModal = ({
  hash,
  action,
  blocked,
  success,
  hidePopup,
  canAddToken = false,
}) => {
  const getModalContent = () => {
    if (blocked) return <Waiting hash={hash} action={action} />;
    if (!blocked) {
      if (success) {
        return (
          <Success
            setModalOpen={hidePopup}
            canAddToken={canAddToken}
          />
        );
      } else {
        return <Error setModalOpen={hidePopup} hash={hash} />;
      }
    }
  };
  return getModalContent();
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.txModal &&
      state.popup.visible,
    hash: state.txProps.hash,
    action: state.txProps.action,
    success: state.txProps.TXSuccess,
    blocked: state.txProps.blocked
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TxModal);
