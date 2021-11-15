import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { AuthenticationActions } from "store/actions/authentication";

const providerActionMap = {
  google: ({ code }) => AuthenticationActions.loginWithGoogle({ code }),
};

const useOAuthCallback = () => {
  const dispatch = useDispatch();
  const { provider } = useParams();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location]);

  
  useEffect(() => {
    const code = params.get('code');
    if(provider && code) {
      const payload = { code };
      dispatch(
        providerActionMap[provider](payload)
      );
    }
  }, [provider, params])
}

export default useOAuthCallback;