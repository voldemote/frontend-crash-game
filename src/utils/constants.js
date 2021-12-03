import { ethers } from "ethers";

const environment = process.env.REACT_APP_ENVIRONMENT || 'staging';

export const toBN = ethers.BigNumber.from;
export const ZERO = toBN("0");
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const IS_IN_IFRAME = window.parent !== window;
export const SWITCH_NETWORKS = environment !== "staging" ? 
  {
    "0x89": "Polygon",
    "0x1": "Ethereum",
  } 
  :
  { 
    "0x13881": "Polygon", //Mumbai
    "0x2a": "Ethereum" //Kovan
  };
