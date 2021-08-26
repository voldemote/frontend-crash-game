import { makeActionCreator } from '../../helper/Store';

export const UserTypes = {
  FETCH: 'User/FETCH',
  FETCH_SUCCEEDED: 'User/FETCH_SUCCEEDED',
  FETCH_FAILED: 'User/FETCH_FAILED',
};

const fetch = makeActionCreator(UserTypes.FETCH, {
  userId: null,
  forceFetch: false,
});

const fetchFailed = makeActionCreator(UserTypes.FETCH_FAILED, {
  userId: null,
});

const fetchSucceeded = makeActionCreator(UserTypes.FETCH_SUCCEEDED, {
  user: null,
});

export const UserActions = {
  fetch,
  fetchFailed,
  fetchSucceeded,
};
