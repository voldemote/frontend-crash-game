import React from "react";
import style from "./styles.module.scss";

const NotificationsItem = ({
    notification,
    notifications,
    unreadNotifications,
    setUnreadNotifications,
}) => {
    const markNotificationRead = () => {
        notification.read = true;
        setUnreadNotifications(
            notifications.filter(
                (notificationOne) => notificationOne.read === false
            ).length
        );
    };

    return (
        <>
            <div
                key={notification.id}
                className={
                    notification.read === true
                        ? style.notificationCardRead
                        : style.notificationCardUnread
                }
            >
                <div className={style.notificationCardContent}>
                    <div
                        className={
                            notification.read === true
                                ? style.notificationDotRead
                                : style.notificationDotUnread
                        }
                    />
                    <p className={style.notificationMessage}>
                        {notification.message}
                    </p>
                </div>
                <p
                    className={style.markSingleRead}
                    onClick={markNotificationRead}
                >
                    Mark as read
                </p>
            </div>
            <div className={style.notificationSeperator} />
        </>
    );
};

export default NotificationsItem;
