import { makeActionCreator } from '../../helper/Store';

export const TransactionTypes = {
  FETCH_ALL: 'Transaction/FETCH_ALL',
  FETCH_ALL_FAILED: 'Transaction/FETCH_ALL_FAILED',
  FETCH_ALL_SUCCEEDED: 'Transaction/FETCH_ALL_SUCCEEDED',
};

const fetchAll = makeActionCreator(TransactionTypes.FETCH_ALL);

const fetchAllSucceeded = makeActionCreator(
  TransactionTypes.FETCH_ALL_SUCCEEDED,
  {
    transactions: null,
  }
);

const fetchAllFailed = makeActionCreator(TransactionTypes.FETCH_ALL_FAILED);

export const TransactionActions = {
  fetchAll,
  fetchAllSucceeded,
  fetchAllFailed,
};
