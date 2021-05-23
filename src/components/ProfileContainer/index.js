import React                    from 'react';
import styles                   from './styles.module.scss';
import classNames               from 'classnames';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';

const ProfileContainer = ({ className, user }) => {
    const getProfileStyle = () => {
        const profilePicture = getProfilePictureUrl(user.profilePicture);

        return {
            backgroundImage: 'url("' + profilePicture + '")',
        };
    };

    return (
        <div
            className={classNames(
                styles.profileContainer,
                className,
            )}
        >
            <div
                className={styles.profilePicture}
                style={getProfileStyle()}
            >
            </div>
            <span className={styles.profileName}>
                {user.name}
            </span>
        </div>
    );
};

export default ProfileContainer;