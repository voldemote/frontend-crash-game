import _ from 'lodash';

export const formatToFixed = (
  amount,
  minimumFractionDigits = 2,
  isAmount = true
) => {
  const newAmount = _.toNumber(amount).toFixed(minimumFractionDigits);

  if (isAmount) {
    return newAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return newAmount;
};
