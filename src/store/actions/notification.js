import { makeActionCreator } from '../../helper/Store';

export const NotificationTypes = {
    ADD_NOTIFICATION: 'Notification/ADD_NOTIFICATION',
};

const addNotification = makeActionCreator(
    NotificationTypes.ADD_NOTIFICATION,
    {
        eventId: null,
        notification: null,
    },
);
export const NotificationActions = {
    addNotification,
};
