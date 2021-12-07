import { connect } from 'react-redux';
import styles from './styles.module.scss';
import * as ApiUrls from 'constants/Api';
import IconType from 'components/Icon/IconType';
import Icon from 'components/Icon';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const KycStatus = ({
  user = {},
  className,
}) => {

  const [userId, setUserId] = useState({...user?.userId});
  const [userKyc, setUserKyc] = useState({...user?.kyc});
  useEffect(() => {
    setUserKyc(user?.kyc);
    setUserId(user?.userId);
  }, [user]);

  const openFractal = () => {
    const kycUrl = ApiUrls.BACKEND_URL + ApiUrls.KYC_START_FOR_USER.replace(':userId', userId);
    !isKycApproved() && window.open(kycUrl, "fractal", "width=480,height=700,top=150,left=150");
  }

  const getLabelText = () => {
    switch(userKyc?.status){
      case 'pending': return "KYC Verification in progress...";
      case 'approved': return "KYC Verified";
      case 'rejected': return "KYC Verification failed";
      case 'error': return "KYC Verification failed";
      default: return "Get KYC Verified";
    }
  };

  const isKycApproved = () => userKyc?.status === 'approved';

  return user && (
    <div
      className={classNames(className, isKycApproved() ? styles.disabled : null)}
      onClick={() => openFractal()}
      >
      <Icon
        className={styles.referralIcon}
        iconType={isKycApproved() ? IconType.success : IconType.question}
        iconTheme={`primary`}/>
      <p className={styles.settingTitle}>{getLabelText()}</p>
      {!isKycApproved() &&
        <Icon
          width={15}
          iconType={IconType.arrowSmallRight}
          className={styles.goIntoSettingIcon}
        />}

    </div>
  );
};


const mapStateToProps = state => {
  return {
    user: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(KycStatus);

