import { makeActionCreator } from '../../helper/Store';

export const PopupTypes = {
    SHOW: 'Popup/SHOW',
    HIDE: 'Popup/HIDE',
};

const show = makeActionCreator(
    PopupTypes.SHOW,
    {
        popupType: null,
    },
);

const hide = makeActionCreator(
    PopupTypes.HIDE,
);

export const PopupActions = {
    show,
    hide,
};
