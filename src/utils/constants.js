import { ethers } from "ethers";

export const toBN = ethers.BigNumber.from;
export const ZERO = toBN("0");
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const IS_IN_IFRAME = window.parent !== window;
export const SWITCH_NETWORKS = {
  "0x89": "Polygon",
  "0x1": "Ethereum",
};
