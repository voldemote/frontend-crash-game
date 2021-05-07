import { all }        from 'redux-saga/effects';
import { put }        from 'redux-saga/effects';
import { REHYDRATE }  from 'redux-persist';
import { takeLatest } from 'redux-saga/effects';

// Types

// Actions

// Sagas

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest([REHYDRATE], rehydrationDone),
        // @formatter:on
    ]);
};

const rehydrationDone = function* () {
    yield preLoading();
};

const preLoading = function* () {
};

export default {
    root,
};
