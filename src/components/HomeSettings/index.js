import classNames from 'classnames';
import styles from './styles.module.scss';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import DefaultProfilePicture from '../../data/images/logo.png';
import SettingNotification from '../../data/images/setting-notifications.png';
import SettingSupport from '../../data/images/setting-support.png';
import React from 'react';
import style from '../Navbar/styles.module.scss';

const HomeSettings = ({
  onEditClick,
  onReferralsClick,
  onEmailNotificationClick,
  onPreferencesClick,
  onLogoutClick,
  onCloseProfile,
}) => {
  return (
    <div className={styles.settings}>
      <div className={styles.settingContainer}>
        <div
          onClick={onEditClick}
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
        >
          <img
            src={DefaultProfilePicture}
            alt="profile_picture"
            className={styles.profilePicture}
          />
          <p className={styles.settingTitle}>Edit my Profile</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
          onClick={() => onReferralsClick()}
        >
          <Icon className={styles.referralIcon} iconType={'chat'} />
          <p className={styles.settingTitle}>Referrals</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
          onClick={onEmailNotificationClick}
        >
          <img
            src={SettingNotification}
            alt="notifications"
            className={styles.settingIcon}
            style={{ width: '22px', marginLeft: '4px' }}
          />
          <p className={styles.settingTitle}>Email Notifications</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
          onClick={onPreferencesClick}
        >
          <Icon
            width={15}
            iconType={IconType.settings}
            className={styles.leftIcon}
          />
          <p className={styles.settingTitle}>Preferences</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder,
            styles.settingDeactive
          )}
        >
          <img
            src={SettingSupport}
            alt="support"
            className={styles.settingIcon}
            style={{ width: '22px', marginLeft: '4px' }}
          />
          <p className={styles.settingTitle}>Support</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
          onClick={onLogoutClick}
        >
          <Icon
            width={15}
            iconType={IconType.logout}
            className={classNames(styles.settingIcon)}
            style={{ width: '22px', marginLeft: '4px' }}
          />
          <p className={styles.settingTitle}>Logout</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(styles.closeProfileContainer)}
          onClick={onCloseProfile}
        >
          <Icon
            iconType={IconType.cross}
            // onClick={}
            className={classNames(styles.closeProfile)}
            style={{ width: '30px', color: 'white' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSettings;
