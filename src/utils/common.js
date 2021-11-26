import { isMobile } from "react-device-detect";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const calculateTimeLeft = (date) => {
  if (!date) {
    return null;
  }

  const difference = date - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export const shortenAddress = (account) => {
  if (isMobile)
    return account?.substr(0, 4) + "..." + account?.substr(account?.length - 2);
  return account?.substr(0, 6) + "..." + account?.substr(account?.length - 4);
};

export const openExternalLink = (link, target = "_blank") => {
  window.open(link, target).focus();
};
