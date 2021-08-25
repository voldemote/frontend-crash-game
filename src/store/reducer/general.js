import { GeneralTypes } from '../actions/general';

const initialState = {
    openDrawer: '',
};

const setDrawer = (state, { payload }) => {
    return {
        ...state,
        openDrawer: payload,
    };
};

const reducers = {
    [GeneralTypes.SET_GLOBAL_DRAWER]: setDrawer,
};

export default function (state = initialState, action) {
    return reducers[action.type] ? reducers[action.type](state, action) : state;
}
