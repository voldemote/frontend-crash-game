import { useCallback, useRef, useState } from 'react';

const useHideMobileScrollingMenu = () => {
  const lastScrollTop = useRef(0);
  const [hideNavbar, setHideNavbar] = useState(true);
  const timerRef = useRef();

  const onScroll = useCallback(
    event => {
      const { scrollTop } = event.target;

      // when user scrolls down
      if (lastScrollTop.current < scrollTop) {
        if (hideNavbar) setHideNavbar(false);

        clearTimeout(timerRef.current);
        // hide the navbar when the user stops scrolling (effect after 3 seconds)
        timerRef.current = setTimeout(() => {
          if (!hideNavbar) {
            setHideNavbar(true);
          }
        }, 3000);
      }

      lastScrollTop.current = scrollTop;
    },
    [hideNavbar]
  );

  return { onScroll, hideNavbar };
};

export default useHideMobileScrollingMenu;
