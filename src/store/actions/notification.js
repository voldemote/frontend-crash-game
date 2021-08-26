import { makeActionCreator } from '../../helper/Store';

export const NotificationTypes = {
  ADD_NOTIFICATION: 'Notification/ADD_NOTIFICATION',
  SET_UNREAD: 'Notification/SET_UNREAD',
};

const addNotification = makeActionCreator(NotificationTypes.ADD_NOTIFICATION, {
  eventId: null,
  notification: null,
});

const setUnread = makeActionCreator(NotificationTypes.SET_UNREAD, {
  notification: null,
});

export const NotificationActions = {
  addNotification,
  setUnread,
};
