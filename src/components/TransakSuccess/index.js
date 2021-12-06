import _ from 'lodash';
import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import classNames from 'classnames';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';

const TransakSuccess = ({ visible, hidePopup, options }) => {
  
  return (
    <div className={styles.successTransakContainer}>
      <span className={styles.successTransakHeadline}>
        <img src={LogoSplash} className={styles.logo} alt="logo" />
        Transaction Complete!
      </span>
      <span className={styles.successText}>
        In a few seconds, you will receive an email from Transak to track your order.
        Once the order has been succesfully processed, your funds will be credited in your balance.
      </span>

      <div className={styles.betButtonContainer}>
        <Button
          className={classNames(styles.betButton)}
          highlightType={HighlightType.highlightHomeCtaBet}
          disabledWithOverlay={false}
          onClick={hidePopup}
        >
          <span className={'buttonText'}>Keep Going</span>
        </Button>
      </div>

    </div>
  );
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
      state.popup.popupType === PopupTheme.transakSuccess && state.popup.visible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransakSuccess);
