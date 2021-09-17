import { useSelector } from 'react-redux';
import {
  selectLastCrashes,
  selectInGameBets,
  selectCashedOut,
} from 'store/selectors/rosi-game';

const useRosiData = () => {
  const lastCrashes = useSelector(selectLastCrashes);
  const inGameBets = useSelector(selectInGameBets);
  const cashedOut = useSelector(selectCashedOut);

  return {
    lastCrashes,
    inGameBets,
    cashedOut,
  };
};

export default useRosiData;
