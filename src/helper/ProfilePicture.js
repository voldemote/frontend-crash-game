import _                     from 'lodash';
import DefaultProfilePicture from '../data/images/logo.png';

export const getProfilePictureUrl = (profilePicture) => {
    if (!_.isEmpty(profilePicture)) {
        return profilePicture;
    }

    return DefaultProfilePicture;
};
