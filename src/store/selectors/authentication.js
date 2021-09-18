import { TOKEN_NAME } from 'constants/Token';
import { convert } from '../../helper/Currency';

export const selectCurrency = ({ authentication }) => {
  const currency = authentication.preferences?.currency;
  return currency || TOKEN_NAME;
};

export const selectUserId = state => state.authentication.userId;

export const selectUser = state => {
  const user = state.authentication;
  const currency = selectCurrency(state);

  return {
    ...user,
    balance: convert(state.authentication.balance, currency),
    amountWon: convert(state.authentication.amountWon, currency),
    toNextRank: convert(state.authentication.toNextRank, currency),
    totalInvestmentAmount: convert(
      state.authentication.totalInvestmentAmount,
      currency
    ),
    totalOpenTradesAmount: convert(
      state.authentication.totalOpenTradesAmount,
      currency
    ),
    currency,
  };
};
