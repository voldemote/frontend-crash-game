import classNames from 'classnames';
import styles from './styles.module.scss';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import DefaultProfilePicture from 'data/images/alpaca-logo-mini.svg';
import EditProfilePicture from 'data/images/profile.svg';
import SettingNotification from 'data/images/setting-notifications.png';
import IconTheme from '../Icon/IconTheme';

const HomeSettings = ({
  profilePic,
  onAlpacaBuilderClick,
  onEditClick,
  onReferralsClick,
  onEmailNotificationClick,
  onLogoutClick,
  onCloseProfile,
}) => {
  return (
    <div className={styles.settings}>
      <div className={styles.settingContainer}>
        <div
          onClick={onAlpacaBuilderClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'wallet'} />
          <p className={styles.settingTitle}>Wallet</p>
        </div>
        <div
          onClick={onAlpacaBuilderClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'game'} />
          <p className={styles.settingTitle}>Games</p>
        </div>
        <div
          onClick={onAlpacaBuilderClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'activities'} />
          <p className={styles.settingTitle}>Activities</p>
        </div>
        <div
          onClick={onAlpacaBuilderClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'leaderboard'} />
          <p className={styles.settingTitle}>Leaderboard</p>
        </div>
        <div
          onClick={onAlpacaBuilderClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'alpaca'} />
          <p className={styles.settingTitle}>Customize your Alpaca</p>
        </div>
        <div
          onClick={onEditClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'profile'} />
          <p className={styles.settingTitle}>Edit my Profile</p>
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder
          )}
          onClick={() => onReferralsClick()}
        >
          <Icon className={styles.referralIcon} iconType={'referral'} />
          <p className={styles.settingTitle}>Referrals</p>
        </div>
      
        <div
          className={classNames(
            styles.singleSettingHolder
          )}
          onClick={onLogoutClick}
        >
          <Icon className={styles.referralIcon} iconType={'logout'} />
          <p className={styles.settingTitle}>Logout</p>
        </div>
        <div className={styles.closeProfileContainer} onClick={onCloseProfile}>
          <Icon
            iconTheme={IconTheme.white}
            iconType={IconType.cross}
            className={styles.closeProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSettings;
