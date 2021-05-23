import _                        from 'lodash';
import DefaultProfilePicture    from '../data/images/logo.png';
import { getProfilePictureUrl } from './ProfilePicture';

export const getDefaultUser = () => {
    return {
        name:           'Unknown',
        profilePicture: getProfilePictureUrl(),
    };
};
