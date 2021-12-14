import { useMemo } from "react";
import { useLocation } from "react-router";

const initOAuthFlow = ({baseUrl, clientId, redirectUri, scope, state}) => {
  document.location.href = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
};
const enc = encodeURIComponent;
const redirectFactory = (provider) => enc(`${process.env.REACT_APP_URL}/oauth/${provider}`);

export const useSocialLogins = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const ref = params.get('ref');
  const state = enc(
    JSON.stringify({ ref: ref || 'null' })
  );
  const init = (provider, payload) => initOAuthFlow({...payload, redirectUri: redirectFactory(provider), state});
  return {
    isVisible: {
      google: !!process.env.REACT_APP_GOOGLE_CLIENT_ID,
      facebook: !!process.env.REACT_APP_FACEBOOK_CLIENT_ID,
      twitch: !!process.env.REACT_APP_TWITCH_CLIENT_ID,
      discord: !!process.env.REACT_APP_DISCORD_CLIENT_ID,
    },
    initGoogleLogin: () =>
      init('google', {
        baseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        clientId: enc(process.env.REACT_APP_GOOGLE_CLIENT_ID),
        scope: enc(
          'https://www.googleapis.com/auth/user.birthday.read email profile'
        ),
      }),
    initFacebookLogin: () =>
      init('facebook', {
        baseUrl: 'https://www.facebook.com/v12.0/dialog/oauth',
        clientId: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
        scope: enc('user_birthday,email'),
      }),
    initTwitchLogin: () =>
      init('twitch', {
        baseUrl: 'https://id.twitch.tv/oauth2/authorize',
        clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
        scope: enc('user:read:email'),
      }),
    initDiscordLogin: () =>
      init('discord', {
        baseUrl: 'https://discord.com/api/oauth2/authorize',
        clientId: process.env.REACT_APP_DISCORD_CLIENT_ID,
        scope: enc('identify email'),
      }),
  };
};
