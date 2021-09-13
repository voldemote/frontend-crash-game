import _ from 'lodash';
import { formatToFixed } from '../helper/FormatNumbers';

export const calculateGain = (investmentAmount, outcomeAmount) => {
  const investment = _.toNumber(investmentAmount);
  const outcome = _.toNumber(outcomeAmount);
  const gain = formatToFixed(((outcome - investment) / investment) * 100);

  const negative = gain < 0;
  const value = isNaN(gain) ? '-' : negative ? `${gain}%` : `+${gain}%`;

  return {
    value,
    negative,
  };
};
