import { AuthenticationTypes } from '../actions/authentication';
import { put }                 from 'redux-saga/effects';
import { AlertActions }        from '../actions/alert';
import { EventTypes }          from '../actions/event';
import { BetTypes }            from '../actions/bet';

const getFailMessage = (action) => {
    switch (action.type) {
        case AuthenticationTypes.REQUEST_SMS_FAILED:
            return 'An error occurred requesting sms. Please try again!';

        case AuthenticationTypes.VERIFY_SMS_FAILED:
            return 'An error occurred verifying sms. Please try again!';

        case AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED:
            return 'An error occurred saving details. Please try again!';

        case AuthenticationTypes.FETCH_REFERRALS_FAILED:
            return 'An error occurred fetching referral list. Please try again!';

        case EventTypes.FETCH_ALL_FAILED:
            return 'An error occurred fetching all events.';

        case BetTypes.CREATE_FAILED:
            return 'An error occurred creating the bet. Please try again!';

        case BetTypes.PLACE_FAILED:
            return 'An error occurred placing on the bet. Please try again!';
    }

    return null;
};

const getSuccessMessage = (action) => {
    switch (action.type) {
        case BetTypes.CREATE_SUCCEEDED:
            return 'The bet was successfully created!';

        case BetTypes.PLACE_SUCCEEDED:
            return 'The bet was placed successfully!';
    }

    return null;
};

const handleFail = function* (action) {
    const message = getFailMessage(action);

    yield put(AlertActions.showError({
        message,
    }));
};

const handleSuccess = function* (action) {
    const message = getSuccessMessage(action);

    yield put(AlertActions.showSuccess({
        message,
    }));
};

export default {
    handleFail,
    handleSuccess,
};