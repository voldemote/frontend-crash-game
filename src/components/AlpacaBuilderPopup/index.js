import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { PopupActions } from '../../store/actions/popup';
import { AuthenticationActions } from '../../store/actions/authentication';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';
import authState from 'constants/AuthState';
import _ from 'lodash';
import AlpacaBuilder from 'components/AlpacaBuilder';

const AlpacaBuilderPopup = ({
  hidePopup,
  showWelcome,
  updateUser,
  user,
  initialReward,
}) => {

  const isAuthenticated = () => user.authState === authState.LOGGED_IN;

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
    if (!isAuthenticated()) return;
    if (!blob) return;
    const base64 = await convertToBase64(blob);
    updateUser(blob.name, base64, props);
    closePopup();
  };

  const closePopup = () => {
    hidePopup();
    //showWelcome(initialReward);
  };

  return (
    <div className={styles.alpacaPopup}>
      <h2 className={styles.title}>Create your Alpaca</h2>
      <AlpacaBuilder
        cancelLabel="Skip"
        layout="wide"
        onExport={(data) => handleAlpacaBuilderExport(data)}
        onCancel={() => closePopup()}/>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authentication.loading,
    user: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showWelcome: initialReward => {
      dispatch(
        PopupActions.show({
          popupType: PopupTheme.welcome,
          options: {
            initialReward: initialReward,
          },
        })
      );
    },
    updateUser: (imageName, profilePic, alpacaBuilderProps) => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData({
          user: { imageName, profilePic, alpacaBuilderProps }
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlpacaBuilderPopup);
