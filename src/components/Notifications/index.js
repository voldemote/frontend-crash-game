import React from "react";
import style from "./styles.module.scss";
import Icon from "../Icon";
import IconType from "../Icon/IconType";
import NotificationsItem from "../NotificationsItem";

const Notifications = ({
    notifications,
    unreadNotifications,
    setUnreadNotifications,
    closeNotifications,
}) => {
    const markAllRead = () => {
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].read === false) {
                notifications[i].read = true;
            }
        }
        setUnreadNotifications(
            notifications.filter(
                (notificationOne) => notificationOne.read === false
            ).length
        );
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
                Mark all as unread
            </p>
            <div className={style.notificationsHolder}>
                {notifications.map((notification) => {
                    return (
                        <NotificationsItem
                            key={notification.id}
                            notification={notification}
                            notifications={notifications}
                            unreadNotifications={unreadNotifications}
                            setUnreadNotifications={setUnreadNotifications}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Notifications;
