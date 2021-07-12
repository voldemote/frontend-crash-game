import { NotificationTypes } from "../actions/notification";
import _ from "lodash";
const initialState = {
    notificationsByEvent: {},
};
const sortNotifications = (notifications) =>
    notifications.sort((a = {}, b = {}) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate < bDate ? -1 : aDate === bDate ? 0 : 1;
    });

const addNotifications = (allNotifications, eventId, notifications) => {
    notifications = _.uniqWith(
        (allNotifications[eventId] || [])
            .concat(notifications)
            .map((m) => _.omit(m, ["_id", "__v"]))
            .map((m) => {
                m.date = new Date(m.date);
                m.date.setMilliseconds(0);
                return m;
            }),
        _.isEqual
    );

    return {
        ...allNotifications,
        [eventId]: sortNotifications(notifications),
    };
};

const addNotification = (action, state) => {
    const { notification, eventId } = action;
    return {
        ...state,
        notificationsByEvent: addNotifications(
            state.notificationsByEvent,
            eventId,
            [notification]
        ),
    };
};

const setUnread = (action, state) => {
    const { notification } = action;
    console.log(notification, action);
    return {
        ...state,
        notificationsByEvent: _.mapValues(
            state.notificationsByEvent,
            (notifications, eventId) => {
                return notifications.map((n) => {
                    return _.isEqual(notification, n)
                        ? { ...n, read: true }
                        : n;
                });
            }
        ),
    };
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case NotificationTypes.ADD_NOTIFICATION:
            return addNotification(action, state);
        case NotificationTypes.SET_UNREAD:
            return setUnread(action, state);
        default:
            return state;
        // @formatter:on
    }
}
