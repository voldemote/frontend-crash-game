import React from "react";
import style from "./styles.module.scss";
import Icon from "../Icon";
import IconType from "../Icon/IconType";
import NotificationsItem from "../NotificationsItem";

const Notifications = ({
    notifications,
    setUnread,
    closeNotifications,
}) => {
    const markAllRead = () => {
        for (const notification of notifications) {
            setUnread(notification);
        }
    };

    const unreadNotificationsCount = notifications
        .filter(({read}) => !read)
        .length;

    return (
        <div className={style.notifications}>
            <div className={style.notificationsHeader}>
                <Icon
                    className={style.closeNotifications}
                    iconType={IconType.cross}
                    onClick={closeNotifications}
                />
                <p className={style.notificationHeadline}>
                    Notifications &nbsp;
                    {unreadNotificationsCount > 0 &&
                        <span className={style.notificationUnreadBadge}>
                            {unreadNotificationsCount}
                        </span>
                    }
                </p>
                {unreadNotificationsCount > 0 &&
                    <p className={style.markRead} onClick={markAllRead}>
                        Mark all as read 
                    </p>
                }
            </div>
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
