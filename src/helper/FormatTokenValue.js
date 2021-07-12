import _ from 'lodash';

export const formatTokenValue = (amount) => {
    return _.toNumber(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
     });;
}
