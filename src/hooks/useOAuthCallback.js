import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { AuthenticationActions } from "store/actions/authentication";

const providerActionMap = {
  google: ({ code }) =>
    AuthenticationActions.loginExternal({ provider: 'google', code }),
  facebook: ({ code }) =>
    AuthenticationActions.loginExternal({ provider: 'facebook', code }),
};

const useOAuthCallback = () => {
  const dispatch = useDispatch();
  const { provider } = useParams();
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => new URLSearchParams(location.search), [location]);

  
  useEffect(() => {
    if(!provider) return;
    const code = params.get('code');
    const error = params.get('error');
    
    if(process.env.REACT_APP_SHOW_UPCOMING_FEATURES !== 'true') {
      return history.push('/');
    }

    if(error) {
      dispatch(AuthenticationActions.loginExternalFail({ message: 'Something went wrong.'}));
      history.push('/');
    } else if(code) {
      const refLocalStorage = localStorage.getItem('urlParam_ref');
      const payload = { code, ref:refLocalStorage };
      dispatch(
        providerActionMap[provider](payload)
      );
    } else {
      history.push('/');
    }
  }, [provider, params])
}

export default useOAuthCallback;