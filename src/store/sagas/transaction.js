import * as Api from '../../api';
import _ from 'lodash';
import AuthState from '../../constants/AuthState';
import { call, put, select } from 'redux-saga/effects';
import { TransactionActions } from '../actions/transaction';

const fetchTransactions = function* () {
  const authState = yield select(state => state.authentication.authState);

  if (authState === AuthState.LOGGED_IN) {
    const response = yield call(Api.getTransactions);

    if (response) {
      const transactions = _.get(response, 'data', []);

      yield put(
        TransactionActions.fetchAllSucceeded({
          transactions,
        })
      );
    } else {
      yield put(TransactionActions.fetchAllFailed());
    }
  }
};

const fetchWalletTransactions = function* () {
  const authState = yield select(state => state.authentication.authState);
  try {
    if (authState !== AuthState.LOGGED_IN) {
      throw new Error('Not logged in.');
    }

    yield put(TransactionActions.fetchWalletTransactionsLoading());

    const { data } = yield call(Api.getWalletTransactions);

    yield put(
      TransactionActions.fetchWalletTransactionsSuceeded({
        transactions: data,
      })
    );

  } catch (err) {
    yield put(TransactionActions.fetchWalletTransactionsFailed());
  }
}

export default {
  fetchTransactions,
  fetchWalletTransactions,
};
