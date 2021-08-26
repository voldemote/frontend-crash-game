import PopupTheme from '../../components/Popup/PopupTheme';
import update from 'immutability-helper';
import { LOCATION_CHANGE } from 'connected-react-router';
import { PopupTypes } from '../actions/popup';

const initialState = {
  visible: false,
  popupType: null,
  options: null,
};

const locationChangeHide = (action, state) => {
  if (state.popupType !== PopupTheme.welcome) {
    return update(state, {
      visible: {
        $set: false,
      },
    });
  }

  return state;
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
  const options = action.options;

  return update(state, {
    visible: {
      $set: true,
    },
    popupType: {
      $set: type,
    },
    options: {
      $set: options,
    },
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case LOCATION_CHANGE:
      return locationChangeHide(action, state);
    case PopupTypes.HIDE:
      return hide(action, state);
    case PopupTypes.SHOW:
      return show(action, state);
    default:
      return state;
    // @formatter:on
  }
}
