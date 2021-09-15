import _ from 'lodash';
import { convert } from '../../helper/Currency';
import { selectCurrency } from './authentication';

export const selectTransactions = state => {
  const currency = selectCurrency(state);

  return _.map(state.transaction.transactions, transaction => {
    return {
      ...transaction,
      feeAmount: convert(transaction.feeAmount, currency),
      investmentAmount: convert(transaction.investmentAmount, currency),
      outcomeTokensBought: convert(transaction.outcomeTokensBought, currency),
    };
  });
};
