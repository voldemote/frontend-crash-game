
import { getProfilePictureUrl } from './ProfilePicture';

export const getDefaultUser = () => {
    return {
        name:           'Unknown',
        profilePicture: getProfilePictureUrl(),
    };
};
