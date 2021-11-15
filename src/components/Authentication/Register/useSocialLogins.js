export const useSocialLogins = () => {
  return {
    initGoogleLogin: () => {
      const clientId = encodeURIComponent(process.env.REACT_APP_GOOGLE_CLIENT_ID);
      const redirectUri =
        encodeURIComponent(process.env.REACT_APP_APP_URL + '/oauth/google');
      const scope =
        encodeURIComponent('https://www.googleapis.com/auth/user.birthday.read email profile');

      document.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    },
    initFacebookLogin: () => {

      const clientId = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
      const redirectUri = encodeURIComponent(process.env.REACT_APP_APP_URL + '/oauth/facebook');
      const scope = encodeURIComponent('user_birthday,email');
      
      document.location.href = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    }
  };
};
