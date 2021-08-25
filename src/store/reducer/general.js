import { GeneralTypes } from '../actions/general';

const initialState = {
    openDrawer: '',
    editProfileVisible: false,
};

const setDrawer = (state, { payload }) => {
    return {
        ...state,
        openDrawer: payload,
    };
};

const setEditProfileVisible = (state, { payload }) => {
    return {
        ...state,
        editProfileVisible: payload,
    };
};

const reducers = {
    [GeneralTypes.SET_GLOBAL_DRAWER]: setDrawer,
    [GeneralTypes.SET_EDIT_PROFILE_VISIBLE]: setEditProfileVisible,
};

export default function (state = initialState, action) {
    return reducers[action.type] ? reducers[action.type](state, action) : state;
}
