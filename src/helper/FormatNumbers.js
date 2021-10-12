import _ from 'lodash';

export const formatToFixed = (amount, minimumFractionDigits = 2) => {
  const newAmount = amount;
  return _.toNumber(newAmount)
    .toFixed(minimumFractionDigits)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
