import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { gnosisSafe, injected } from "../config/connectors";
import { IS_IN_IFRAME } from "../utils/constants";
import { resetState } from "../state/wallfair/slice";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  // gnosisSafe.isSafeApp() races a timeout against postMessage, so it delays pageload if we are not in a safe app;
  // if we are not embedded in an iframe, it is not worth checking
  const [triedSafe, setTriedSafe] = useState(!IS_IN_IFRAME);

  // first, try connecting to a gnosis safe
  useEffect(() => {
    if (!triedSafe) {
      gnosisSafe.isSafeApp().then((loadedInSafe) => {
        if (loadedInSafe) {
          activate(gnosisSafe, undefined, true).catch(() => {
            setTriedSafe(true);
          });
        } else {
          setTriedSafe(true);
        }
      });
    }
  }, [activate, setTriedSafe, triedSafe]);

  // then, if that fails, try connecting to an injected connector
  useEffect(() => {
    if (!active && triedSafe && !tried) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          if (isMobile && window.ethereum) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        }
      });
    }
  }, [tried, active, triedSafe, activate]);

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };

      const handleChainChanged = (chainId) => {
        console.log("handleChainChanged", chainId);
        // eat errors
        activate(injected, undefined, true).catch((error) => {
          dispatch(resetState());
          console.error("Failed to activate after chain changed", error);
        });
      };

      const handleAccountsChanged = (accounts = []) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((error) => {
            dispatch(resetState());
            console.error("Failed to activate after accounts changed", error);
          });
        }
      };

      const handleNetworkChanged = (networkId) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);
      ethereum.removeListener("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate, dispatch]);
}
