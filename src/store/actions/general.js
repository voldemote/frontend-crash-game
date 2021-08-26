export const GeneralTypes = {
  SET_GLOBAL_DRAWER: 'General/SET_GLOBAL_DRAWER',
  SET_EDIT_PROFILE_VISIBLE: 'General/SET_EDIT_PROFILE_VISIBLE',
};

const setDrawer = payload => ({
  type: GeneralTypes.SET_GLOBAL_DRAWER,
  payload,
});
const setEditProfileVisible = payload => ({
  type: GeneralTypes.SET_EDIT_PROFILE_VISIBLE,
  payload,
});

export const GeneralActions = {
  setDrawer,
  setEditProfileVisible,
};
