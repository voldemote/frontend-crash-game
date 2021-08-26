import update from 'immutability-helper';
import { TransactionTypes } from '../actions/transaction';

const initialState = {
  transactions: [],
};

const fetchAllSucceeded = (action, state) => {
  return update(state, {
    transactions: {
      $set: action.transactions,
    },
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case TransactionTypes.FETCH_ALL_SUCCEEDED:
      return fetchAllSucceeded(action, state);
    default:
      return state;
    // @formatter:on
  }
}
