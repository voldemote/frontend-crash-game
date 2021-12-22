import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import {getUserCount} from '../../api';

const LimitedOfferBanner = ({className}) => {

  const utils = {
    isNumber: val => !isNaN(+val) && val !== null && val !== '',
  };
  const [count, setCount] = useState(null);

  useEffect(() => {
    const getCurrentUserCount = async () => {
      const result = await getUserCount();
      const totalUsers = result?.response?.data?.total;
      
      if (utils.isNumber(totalUsers)) {
        setCount(1000 - totalUsers);
      }
    }

    getCurrentUserCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  return (
    <div className={classNames(styles.bannerWrapper, className)}>
      <p>Limited offer!</p>
      {count && <span>{Math.max(count,0)} of 1000 Available</span>}
    </div>
  );
};

export default LimitedOfferBanner;
