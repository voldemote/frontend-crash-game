export const InfoChannelTypes = {
  RESET_STATE: 'InfoChannel/RESET_STATE',
  SET_PRICES: 'InfoChannel/SET_PRICES'
};

const Actions = {
  resetState: payload => ({
    type: InfoChannelTypes.RESET_STATE,
    payload
  }),
  setPrices: payload => ({
      type: InfoChannelTypes.SET_PRICES,
      payload
  })
};

export const InfoChannelActions = Actions;

