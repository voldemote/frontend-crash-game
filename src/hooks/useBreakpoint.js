import {useState, useEffect} from 'react';
import throttle from 'lodash/throttle';

const getDeviceConfig = (width) => {
  if (width < 480) {
    return 'xs';
  } else if (width >= 480 && width < 768) {
    return 'sm'
  }

//   else if (width >= 480 && width < 768) {
//     return 'sm';
//   } else if (width >= 768 && width < 992) {
//     return 'md';
//   } else if (width >= 1200) {
//     return 'lg';
//   } else if (width >= 1500) {
//       return 'xl'
//   }
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() => getDeviceConfig(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = throttle(function() {
      setBreakpoint(getDeviceConfig(window.innerWidth))
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return breakpoint;
}
export default useBreakpoint;
