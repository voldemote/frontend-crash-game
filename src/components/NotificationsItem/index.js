import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./styles.module.scss";

const NotificationsItem = ({
    notification,
    setUnread,
    events,
}) => {
    const markNotificationRead = () => {
        setUnread(notification)
    };
    
    const renderMessage = () => {
        let content = null;
        let eventName = '';

        if(!!notification.betQuestion && notification.message.includes(notification.betQuestion)) {
            const { betId, message, betQuestion } = notification;

            const event = events.find(({bets}) => bets.some(({_id}) => _id === betId)); // find event by betId
            eventName = event.name;
            const [beforeLink, afterLink] = message.split(betQuestion);
            
            content = (
                <>
                    {beforeLink}
                    <Link
                        to={`/trade/${event._id}/${betId}`}
                        onClick={markNotificationRead}
                    >
                        {betQuestion}
                    </Link>
                    {afterLink}
                </>
            );
        } else {
            content = notification.message;
        }
        const { eventPhotoUrl } = notification;
        return (
            <>
                {eventPhotoUrl ? <img className={style.notificationCardThumbnail} alt={`${eventName} event thumbnail`} src={eventPhotoUrl}/> : null}
                <p>
                    {content}
                </p>
            </>
        )
    }

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
                        {renderMessage()}
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

const mapStateToProps = (state) => {
    return {
        events: state.event.events,
    };
};

export default connect(
    mapStateToProps,
    null
)(NotificationsItem);
