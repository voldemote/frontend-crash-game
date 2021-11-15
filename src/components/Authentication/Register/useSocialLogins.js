export const useSocialLogins = () => {
  return {
    initGoogleLogin: () => {
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      const redirectUri = process.env.REACT_APP_APP_URL + '/oauth/google';
      const scope =
        'https://www.googleapis.com/auth/user.birthday.read email profile';

      document.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    },
  }
};
