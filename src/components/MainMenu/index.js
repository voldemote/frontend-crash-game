import { useRef, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import HomeSettings from '../HomeSettings';
import MyTrades from '../MyTrades';
import { AuthenticationActions } from 'store/actions/authentication';
import { GeneralActions } from 'store/actions/general';
import EmailNotifications from 'components/EmailNotifications';
import { BetActions } from 'store/actions/bet';
import { TransactionActions } from 'store/actions/transaction';
import Preferences from 'components/Preferences';

const MainMenu = ({
  opened,
  user,
  updateUser,
  setEditVisible,
  handleMyTradesVisible,
  handleEmailNotificationsVisible,
  handlePreferencesVisible,
  editVisible,
  myTradesVisible,
  emailNotificationsVisible,
  preferencesVisible,
  close,
  fetchOpenBets,
  fetchTransactions,
}) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePicture);

  const profilePictureRefName = useRef(null);

  const clickUploadProfilePicture = () => {
    profilePictureRefName.current?.click();
  };

  const history = useHistory();

  const onClickGoToRoute = destinationRoute => {
    return () => {
      history.push(destinationRoute);
    };
  };

  const onClickShowEditProfile = () => {
    setEditVisible(!editVisible);
  };

  const onMyTradesClick = () => {
    fetchOpenBets();
    fetchTransactions();
    handleMyTradesVisible(!myTradesVisible);
  };

  const onEmailNotificationClick = () => {
    handleEmailNotificationsVisible(!emailNotificationsVisible);
  };

  const onPreferencesClick = () => {
    handlePreferencesVisible(!preferencesVisible);
  };

  const handleName = e => {
    setName(e.target.value);
  };

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateUser(name, username, email, profilePic);
    setEditVisible(false);
  };

  const handleProfilePictureUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setProfilePic(base64);
  };

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

  const renderMyTradesDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !myTradesVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handleMyTradesVisible(!myTradesVisible)}
          />
          My Trades
        </h2>

        <MyTrades close={close} fetchBets={myTradesVisible} />
      </div>
    );
  };

  const renderEmailNotificationDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !emailNotificationsVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() =>
              handleEmailNotificationsVisible(!emailNotificationsVisible)
            }
          />
          Email Notification
        </h2>

        <EmailNotifications close={close} />
      </div>
    );
  };

  const renderPreferencesDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !preferencesVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handlePreferencesVisible(!preferencesVisible)}
          />
          Preferences
        </h2>

        <Preferences close={close} />
      </div>
    );
  };

  const editProfileWrapper = () => {
    return (
      <div
        className={classNames(styles.panel, !editVisible && styles.panelHidden)}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => setEditVisible(!editVisible)}
          />
          Edit My Profile
        </h2>
        <div className={styles.editProfileContent}>
          <div className={styles.profilePictureWrapper}>
            <div className={styles.profilePicture}>
              <div
                className={styles.profilePictureUpload}
                onClick={clickUploadProfilePicture}
              >
                {!profilePic ? (
                  <div className={styles.iconContainer}>
                    <Icon
                      className={styles.uploadIcon}
                      iconTheme={IconTheme.white}
                      iconType={IconType.avatarUpload}
                    />
                  </div>
                ) : (
                  <img
                    src={profilePic}
                    className={styles.profileImage}
                    alt="profile pic"
                  />
                )}
                <input
                  ref={profilePictureRefName}
                  type={'file'}
                  accept={'image/*'}
                  style={{ display: 'none' }}
                  onChange={handleProfilePictureUpload}
                />
              </div>
              <p className={styles.profilePictureUploadLabel}>Your avatar</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.profileContent}>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>
                  My Name is...
                </label>
                <input
                  className={styles.profileInput}
                  value={name}
                  onChange={handleName}
                />
              </div>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>
                  But you can call me...
                </label>
                <input
                  className={styles.profileInput}
                  value={username}
                  onChange={handleUsername}
                />
              </div>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>E-Mail</label>
                <input
                  className={styles.profileInput}
                  disabled
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <input
                className={styles.profileSubmit}
                type={'submit'}
                value={'Save changes'}
              />
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={classNames(styles.menu, opened ? styles.menuOpened : null)}>
      <div
        className={classNames(
          styles.panel,
          styles.firstPanel,
          (myTradesVisible ||
            editVisible ||
            emailNotificationsVisible ||
            preferencesVisible) &&
            styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>My Profile</h2>
        <div className={styles.mainContent}>
          <HomeSettings
            onEditClick={() => onClickShowEditProfile()}
            onMyTradesClick={() => onMyTradesClick()}
            onEmailNotificationClick={() => onEmailNotificationClick()}
            onPreferencesClick={() => onPreferencesClick()}
          />

          <div className={styles.buttonContainer}>
            <div
              className={styles.logoutButton}
              onClick={onClickGoToRoute(Routes.logout)}
            >
              <Icon iconTheme={IconTheme.black} iconType={IconType.logout} />
            </div>
          </div>
        </div>
      </div>
      {editProfileWrapper()}
      {renderMyTradesDrawer()}
      {renderEmailNotificationDrawer()}
      {renderPreferencesDrawer()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    editVisible: state.general.editProfileVisible,
    myTradesVisible: state.general.myTradesVisible,
    emailNotificationsVisible: state.general.emailNotificationsVisible,
    preferencesVisible: state.general.preferencesVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (name, username, email, profilePicture) => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData({
          user: { name, username, email, profilePicture },
        })
      );
    },
    setEditVisible: bool => {
      dispatch(GeneralActions.setEditProfileVisible(bool));
    },
    handleMyTradesVisible: bool => {
      dispatch(GeneralActions.setMyTradesVisible(bool));
    },
    handleEmailNotificationsVisible: bool => {
      dispatch(GeneralActions.setEmailNotificationsVisible(bool));
    },
    handlePreferencesVisible: bool => {
      dispatch(GeneralActions.setPreferencesVisible(bool));
    },
    fetchOpenBets: () => {
      dispatch(BetActions.fetchOpenBets());
    },
    fetchTransactions: () => {
      dispatch(TransactionActions.fetchAll());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
