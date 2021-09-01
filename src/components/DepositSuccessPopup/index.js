import styles from './styles.module.scss';
import QRSample from '../../data/images/qr-sample.png'
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import _ from 'lodash';

const DepositSuccessPopup = ({ address }) => {
  return (
    <div className={styles.depositSuccess}>
        <div className={styles.title}>BTC Deposit Address</div>
        <img src={QRSample} className={styles.qrCode} />
        <div className={styles.inputContainer}>
          <InputBox
            type={'text'}
            value={address}
            setValue={_.noop}
            theme={InputBoxTheme.copyToClipboardInput}
          />
          {/* <Button
            className={styles.copyButton}
            onClick={handleSubmit}
            highlightType={HighlightType.highlightDeposit}
            disabled={false}
            disabledWithOverlay={false}
            withoutBackground={true}
          >
            Copy
          </Button> */}
        </div>
    </div>
  );
};

export default DepositSuccessPopup;