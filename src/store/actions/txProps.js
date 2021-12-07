export const TxDataTypes = {
  SET_HASH: 'TX_DATA/SET_HASH',
  SET_BLOCKED: 'TX_DATA/SET_BLOCKED',
  SET_TXSUCCESS: 'TX_DATA/SET_TXSUCCESS',
  SET_FORM_ERROR: 'TX_DATA/SET_FORM_ERROR',
};

const txActions = {
  setter: payload => ({
    type: TxDataTypes.SET_HASH,
    payload,
  }),
  setBlocked: payload => ({
    type: TxDataTypes.SET_BLOCKED,
    payload,
  }),

  setTXSuccess: payload => ({
    type: TxDataTypes.SET_TXSUCCESS,
    payload,
  }),
  setformError: payload => ({
    type: TxDataTypes.SET_FORM_ERROR,
    payload,
  }),
};

export const TxDataActions = txActions;
