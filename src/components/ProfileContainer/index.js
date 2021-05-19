import React      from 'react';
import styles     from './styles.module.scss';
import classNames from 'classnames';

const ProfileContainer = ({ className, user }) => {
    const getProfileStyle = () => {
        return {
            backgroundImage: 'url("' + user.profilePicture + '")',
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