import { formatToFixed } from 'helper/FormatNumbers';
import _ from 'lodash';
import { convert } from '../../helper/Currency';
import { selectCurrency } from './authentication';

const mapOutcomes = (outcomes, state) => {
  return {
    ...outcomes,
    outcomes: _.map(outcomes.outcomes, o => {
      return {
        ...o,
        outcome: convert(o.outcome, selectCurrency(state)),
      };
    }),
  };
};

export const selectOpenBets = state => {
  return _.map(state.bet.openBets, bet => {
    return {
      ...bet,
      investmentAmount: convert(bet.investmentAmount, selectCurrency(state)),
      outcomeAmount: convert(bet.outcomeAmount, selectCurrency(state)),
    };
  });
};

export const selectOutcomes = state => {
  return mapOutcomes(state.bet.outcomes, state);
};

export const selectSellOutcomes = state => {
  return mapOutcomes(state.bet.sellOutcomes, state);
};
