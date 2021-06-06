import _                        from 'lodash';
import classNames               from 'classnames';
import React                    from 'react';
import styles                   from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';

const ProfilePicture = ({ className, user, width, height }) => {
    const getProfileStyle = () => {
        const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));

        return {
            backgroundImage: 'url("' + profilePicture + '")',
            width,
            height,
        };
    };

    return (
        <div
            className={classNames(
                styles.profilePicture,
                className,
            )}
            style={getProfileStyle()}
        >
        </div>
    );
};

export default ProfilePicture;