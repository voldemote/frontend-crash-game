export const GeneralTypes = {
    SET_GLOBAL_DRAWER: 'General/SET_GLOBAL_DRAWER',
};

const setDrawer = payload => ({
    type: GeneralTypes.SET_GLOBAL_DRAWER,
    payload,
});

export const GeneralActions = {
    setDrawer,
};
