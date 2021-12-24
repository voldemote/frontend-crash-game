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
      // const result = await getUserCount();
      // const totalUsers = result?.response?.data?.total;
      const totalUsers = result?.response?.data?.totalUsers;
      const calculatedUsers = parseInt(totalUsers) % 1000;

      if (utils.isNumber(calculatedUsers)) {
        setCount(1000 - calculatedUsers);
      }
    }

    getCurrentUserCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return count != null ? Math.max(count,0) : count;
};

export default useBonusCounter;
