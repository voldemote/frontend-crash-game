import { useEffect } from 'react';
import { trackPageView } from 'config/gtm';
import { useLocation } from 'react-router';

export const useTracking = value => {
  const location = useLocation();

  useEffect(() => {
    console.log('test location change');

    trackPageView({
      // pageTitle: location.pathname,
    });
  }, [location]);

  return null;
};
