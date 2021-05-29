import _                        from 'lodash';
import styles                   from './styles.module.scss';
import { connect }              from 'react-redux';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import { useEffect }            from 'react';
import { useState }             from 'react';

const ChatMessage = ({ user, message, date }) => {
    const profilePicture              = getProfilePictureUrl(_.get(user, 'profilePicture'));
    const userName                    = _.get(user, 'name', 'Unknown');
    const [dateString, setDateString] = useState(null);

    useEffect(
        () => {
            updateDateText();

            const timerId = setTimeout(
                updateDateText,
                5 * 1000,
            );

            return () => clearTimeout(timerId);
        },
    );

    const updateDateText = () => {
        setDateString(getDateText());
    };

    const getDateText = () => {
        const sentDate            = new Date(date);
        const currentDate         = new Date();
        const difference          = currentDate.getTime() - sentDate.getTime();
        const differenceInSeconds = _.round(difference / 1000, 0);

        if (differenceInSeconds <= 5) {
            return 'just now';
        } else if (differenceInSeconds < 60) {
            return differenceInSeconds + 's';
        }

        const minutes     = _.floor(differenceInSeconds / 60, 0);
        const secondsRest = (
            differenceInSeconds -
            (
                minutes * 60
            )
        ).toString().padStart(2, '0');

        return minutes + ':' + secondsRest;
    };

    if (!user) {
        return null;
    }

    return (
        <div className={styles.chatMessage}>
            <img
                src={profilePicture}
                alt={userName}
            />
            <div>
                <span>
                    <small>
                        {userName}
                    </small>
                    <small>
                        {dateString}
                    </small>
                </span>
                <p>
                    {message}
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps;
    const user       = _.find(
        state.user.users,
        {
            userId: userId,
        },
    );

    return {
        user: user,
    };
};

export default connect(
    mapStateToProps,
    null,
)(ChatMessage);
