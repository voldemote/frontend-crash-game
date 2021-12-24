import { useEffect, useState } from 'react';
import { getBonusCount } from '../api';
import { CURRENT_BONUS_ID } from '../constants/Bonus';

const useBonusCounter = () => {
  const utils = {
    isNumber: val => !isNaN(+val) && val !== null && val !== '',
  };
  const [count, setCount] = useState(null);

  useEffect(() => {
    const getCurrentUserCount = async () => {
      const result = await getBonusCount(CURRENT_BONUS_ID);
      const totalUsers = result?.response?.data?.totalUsers;
      
      if (utils.isNumber(totalUsers)) {
        setCount(1000 - totalUsers);
      }
    }

    getCurrentUserCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return count != null ? Math.max(count,0) : count;
};

export default useBonusCounter;
