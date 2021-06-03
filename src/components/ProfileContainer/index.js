import React                    from 'react';
import styles                   from './styles.module.scss';
import classNames               from 'classnames';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import _                        from 'lodash';
import ProfilePicture           from '../ProfilePicture';

const ProfileContainer = ({ className, user }) => {
    return (
        <div
            className={classNames(
                styles.profileContainer,
                className,
            )}
        >
            <ProfilePicture user={user} />
            <span className={styles.profileName}>
                {_.get(user, 'name')}
            </span>
        </div>
    );
};

export default ProfileContainer;