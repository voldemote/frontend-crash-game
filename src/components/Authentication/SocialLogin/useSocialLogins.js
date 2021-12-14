import { useMemo } from "react";
import { useLocation } from "react-router";

export const useSocialLogins = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const ref = params.get('ref');
  const state = encodeURIComponent(
    JSON.stringify({ ref: ref || 'null' })
  );
  return {
    initGoogleLogin: () => {
      const clientId = encodeURIComponent(process.env.REACT_APP_GOOGLE_CLIENT_ID);
      const redirectUri =
        encodeURIComponent(process.env.REACT_APP_URL + '/oauth/google');
      const scope =
        encodeURIComponent('https://www.googleapis.com/auth/user.birthday.read email profile');

      document.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
    },
    initFacebookLogin: () => {

      const clientId = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
      const redirectUri = encodeURIComponent(process.env.REACT_APP_URL + '/oauth/facebook');
      const scope = encodeURIComponent('user_birthday,email');
      
      document.location.href = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
    },
    initTwitchLogin: () => {

      const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
      const redirectUri = encodeURIComponent(process.env.REACT_APP_URL + '/oauth/twitch');
      const scope = encodeURIComponent('user:read:email');
      
      document.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
    }
  };
};
