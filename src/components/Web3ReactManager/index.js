import { useEffect, useState } from "react";
import { useEagerConnect, useInactiveListener } from "../../hooks/web3";
import Loader from "../Loader/Loader";

const Web3ReactManager = ({ children }) => {
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!triedEager) {
    return showLoader ? <Loader withHeader={true} /> : null;
  }

  return children;
};

export default Web3ReactManager;
