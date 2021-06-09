import _                        from 'lodash';
import styles                   from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';

const ChatMessage = ({ user, message, dateString }) => {
    const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));
    const userName       = _.get(user, 'name', 'Unknown');

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

export default ChatMessage;
