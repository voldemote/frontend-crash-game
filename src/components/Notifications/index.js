import React from "react";
import style from "./styles.module.scss";
import Icon from "../Icon";
import IconType from "../Icon/IconType";
import NotificationsItem from "../NotificationsItem";

const Notifications = ({
    notifications,
    unreadNotifications,
    setUnread,
    closeNotifications,
}) => {
    const markAllRead = () => {
        for (const notification of notifications) {
            setUnread(notification);
        }
    };

    return (
        <div className={style.notifications}>
            <div className={style.notificationsHeader}>
                <Icon
                    className={style.closeNotifications}
                    iconType={IconType.cross}
                    onClick={closeNotifications}
                />
                <p className={style.notificationHeadline}>Notifications</p>
            </div>
            <p className={style.markRead} onClick={markAllRead}>
                Mark all as read
            </p>
            <div className={style.notificationsHolder}>
                {notifications.map((notification) => {
                    return (
                        <NotificationsItem
                            key={notification.date}
                            notification={notification}
                            notifications={notifications}
                            setUnread={setUnread}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Notifications;
