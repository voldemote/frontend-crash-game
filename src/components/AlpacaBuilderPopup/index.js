import styles from './styles.module.scss';
import { connect } from 'react-redux';
import AlpacaBuilder from 'components/AlpacaBuilder';
import { AuthenticationActions } from 'store/actions/authentication';
import { OnboardingActions } from 'store/actions/onboarding';
import { PopupActions } from 'store/actions/popup';

const AlpacaBuilderPopup = ({
  hidePopup,
  saveAlpacaBuilderData,
  showRegisterPopup
}) => {

  const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  const handleAlpacaBuilderExport = async ({blob, props}) => {
    let exportData = {
      alpacaBuilderProps: props
    };
    if (blob){
      exportData.base64 = await convertToBase64(blob);
      exportData.fileName = blob.name;
    }
    else{
      console.log('empty blob from alpaca builder')
    }
    closePopup(exportData);
  };

  const closePopup = (exportData = null) => {
    hidePopup();
    saveAlpacaBuilderData(exportData);
    showRegisterPopup();
  };

  return (
    <div className={styles.alpacaPopup}>
      <h2 className={styles.title}>Register your Alpaca</h2>
      <AlpacaBuilder
        cancelLabel="Skip"
        saveLabel="Next"
        layout="wide"
        onExport={(data) => handleAlpacaBuilderExport(data)}
        onCancel={() => closePopup()}/>
    </div>
  );
};

const mapStateToProps = () => {}

const mapDispatchToProps = dispatch => {
  return {

    saveAlpacaBuilderData: exportData => {
      dispatch(AuthenticationActions.setAlpacaBuilderData(exportData));
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showRegisterPopup: () => {
      dispatch(OnboardingActions.next());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlpacaBuilderPopup);
