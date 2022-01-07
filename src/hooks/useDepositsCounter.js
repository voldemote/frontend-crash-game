import { useSelector } from 'react-redux';
import { selectDeposits } from 'store/selectors/deposits';

const useDepositsCounter = () => {
  const deposits = useSelector(selectDeposits);
  const count = [...deposits.deposit, ...deposits.crypto, ...deposits.onramp].length;

  return count != null ? Math.max(count,0) : count;
};

export default useDepositsCounter;
