import React from "react";
import style from "./styles.module.scss";

const NotificationsItem = ({
    notification,
    setUnread,
}) => {
    const markNotificationRead = () => {
        setUnread(notification)
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
                    <div className={style.notificationMessage}>
                        <div
                            className={
                                notification.read === true
                                    ? style.notificationDotRead
                                    : style.notificationDotUnread
                            }
                        />
                        {notification.message}
                    </div>
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
