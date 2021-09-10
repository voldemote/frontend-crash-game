import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import DefaultProfilePicture from '../../data/images/logo.png';
import SettingBet from '../../data/images/setting-bet.png';
import SettingWallet from '../../data/images/setting-wallet.png';
import SettingPhone from '../../data/images/setting-phone.png';
import SettingNotification from '../../data/images/setting-notifications.png';
import SettingSupport from '../../data/images/setting-support.png';
import { GeneralActions } from '../../store/actions/general';

const HomeSettings = ({
  onEditClick,
  onMyTradesClick,
  onEmailNotificationClick,
}) => {
  const dispatch = useDispatch();

  const setOpenDrawer = drawerName =>
    dispatch(GeneralActions.setDrawer(drawerName));

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
          onClick={onMyTradesClick}
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
        >
          <img
            src={SettingBet}
            alt="bets"
            className={styles.settingIcon}
            style={{ width: '30px' }}
          />
          <p className={styles.settingTitle}>My Trades And History</p>
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
          onClick={() => setOpenDrawer('wallet')}
        >
          <img
            src={SettingWallet}
            alt="wallet"
            className={styles.settingIcon}
            style={{ width: '20px', marginLeft: '5px' }}
          />
          <p className={styles.settingTitle}>My Wallet</p>
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
            src={SettingPhone}
            alt="phone"
            className={styles.settingIcon}
            style={{ width: '16px', marginLeft: '7px' }}
          />
          <p className={styles.settingTitle}>Change Phone Number</p>
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
      </div>
    </div>
  );
};

export default HomeSettings;
