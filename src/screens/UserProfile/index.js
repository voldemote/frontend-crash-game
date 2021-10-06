import styles from './styles.module.scss';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import Leaderboard from '../../components/Leaderboard';
import { getUser } from '../../api';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';

import ProfileActivityTemplate1 from '../../data/backgrounds/profile/userprofile_activity1.png';
import ProfileActivityTemplate2 from '../../data/backgrounds/profile/userprofile_activity2.png';
import ProfileActivityTemplate3 from '../../data/backgrounds/profile/userprofile_activity3.png';

import ProfileActivityMobileTemplate1 from '../../data/backgrounds/profile/userprofile_mobile_activity1.png';
import ProfileActivityMobileTemplate2 from '../../data/backgrounds/profile/userprofile_mobile_activity2.png';
import ProfileActivityMobileTemplate3 from '../../data/backgrounds/profile/userprofile_mobile_activity3.png';

const UserProfile = () => {
  const { userId } = useParams();
  const [profilePic, setProfilePic] = useState('');
  const [userName, setUserName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async userId => {
    const userResponse = await getUser(userId).catch(err => {
      console.error("Can't get user by id:", err);
    });
    const user = _.get(userResponse, 'data', null);
    setProfilePic(user?.profilePicture);
    setUserName(user?.username);
    if (user?.aboutMe == undefined)
      setAboutMe('This user has not provided an about info yet. How boring!');
    else setAboutMe(user?.aboutMe);
    console.log('userInfo: ', user);
  };

  const renderCategoriesAndLeaderboard = () => {
    return (
      <div className={styles.bottomWrapper}>
        <div className={styles.leaderboard}>
          <Leaderboard fetch={true} small={true} />
        </div>
      </div>
    );
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.containerWrapper}>
        <div className={styles.webWrapper}>
          <div className={styles.containerHeader}>
            <div className={styles.avatarBox}>
              <img
                class={styles.profileImage}
                src={getProfilePictureUrl(profilePic)}
              />
            </div>
            <div className={styles.profileTitle}>
              <h2>{userName}</h2>
            </div>
          </div>
          <div className={styles.headerContent}>
            <div className={styles.aboutSection}>
              <h3>About</h3>
              <h5> {aboutMe} </h5>
            </div>
            <div className={styles.tabLayout}>
              <div
                onClick={() => setTabIndex(0)}
                className={
                  tabIndex == 0 ? styles.tabItemSelected : styles.tabItem
                }
              >
                TRANSACTION HISTORY
              </div>
              <div
                onClick={() => setTabIndex(1)}
                className={
                  tabIndex == 1 ? styles.tabItemSelected : styles.tabItem
                }
              >
                ACTIVITIES
              </div>
              <div
                onClick={() => setTabIndex(2)}
                className={
                  tabIndex == 2 ? styles.tabItemSelected : styles.tabItem
                }
              >
                LEADERBOARD
              </div>
            </div>
          </div>
          <div className={styles.userActivities}>
            <img
              src={
                tabIndex == 0
                  ? ProfileActivityTemplate1
                  : tabIndex == 1
                  ? ProfileActivityTemplate2
                  : ProfileActivityTemplate3
              }
              className={styles.templateImage}
            />
            <div className={styles.inactivePlaceholder}>Coming soon</div>
          </div>
        </div>
        <div className={styles.mobileWrapper}>
          <div className={styles.containerHeader}>
            <div className={styles.avatarBox}>
              <img
                class={styles.profileImage}
                src={getProfilePictureUrl(profilePic)}
              />
            </div>
          </div>
          <div className={styles.headerContent}>
            <div className={styles.profileName}>
              <h2>{userName}</h2>
            </div>
            <div className={styles.aboutSection}>
              <h3>About</h3>
              <h5>{aboutMe}</h5>
            </div>
            <div className={styles.tabLayout}>
              <div
                onClick={() => setTabIndex(0)}
                className={
                  tabIndex == 0 ? styles.tabItemSelected : styles.tabItem
                }
              >
                TRANSACTION HISTORY
              </div>
              <div
                onClick={() => setTabIndex(1)}
                className={
                  tabIndex == 1 ? styles.tabItemSelected : styles.tabItem
                }
              >
                ACTIVITIES
              </div>
              <div
                onClick={() => setTabIndex(2)}
                className={
                  tabIndex == 2 ? styles.tabItemSelected : styles.tabItem
                }
              >
                LEADERBOARD
              </div>
            </div>
          </div>
          <div className={styles.userActivities}>
            <img
              src={
                tabIndex == 0
                  ? ProfileActivityMobileTemplate1
                  : tabIndex == 1
                  ? ProfileActivityMobileTemplate2
                  : ProfileActivityMobileTemplate3
              }
              className={styles.templateImage}
            />
            <div className={styles.inactivePlaceholder}>Coming soon</div>
          </div>
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

export default UserProfile;
