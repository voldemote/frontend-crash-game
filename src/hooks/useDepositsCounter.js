import { useSelector } from 'react-redux';
import { selectDeposits } from 'store/selectors/deposits';

const useDepositsCounter = () => {
  const deposits = useSelector(selectDeposits);

  if (deposits) {
    const totalDeposits = deposits?.deposit?.length || 0;
    const totalCryptoDeposits = deposits?.crypto?.length || 0;
    const totalOnRampDeposits = deposits?.onramp?.length || 0;
    
    const count = totalDeposits + totalCryptoDeposits + totalOnRampDeposits;

    return count != null ? Math.max(count, 0) : count;
  }

  return null;
};

export default useDepositsCounter;
