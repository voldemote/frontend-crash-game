import _ from 'lodash';

export const formatToFixed = (amount, digits = 2) => {
     return _.toNumber(amount).toFixed(digits)
}
