import _ from 'lodash';

export const formatToFixed = (amount, minimumFractionDigits = 2, maximumFractionDigits = 2) => {
     return _.toNumber(amount).toLocaleString(undefined, {minimumFractionDigits, maximumFractionDigits})
}
