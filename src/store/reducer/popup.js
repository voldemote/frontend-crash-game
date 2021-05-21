import update              from 'immutability-helper';
import { LOCATION_CHANGE } from 'connected-react-router';
import { PopupTypes }      from '../actions/popup';

const initialState = {
    visible:   false,
    popupType: null,
};

const hide = (action, state) => {
    return update(state, {
        visible: {
            $set: false,
        },
    });
};

const show = (action, state) => {
    const type = action.popupType;

    return update(state, {
        visible:   {
            $set: true,
        },
        popupType: {
            $set: type,
        },
    });
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case LOCATION_CHANGE:
        case PopupTypes.HIDE: return hide(action, state);
        case PopupTypes.SHOW: return show(action, state);
        default:              return state;
        // @formatter:on
    }
}