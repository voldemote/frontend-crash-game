import { WFAIRAddress } from "../../config/config";

export const switchMetaMaskNetwork = async (switchTo) => {
  const { ethereum } = window;
  await ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: switchTo }], // chainId must be in hexadecimal numbers
  });
};
export const addMetaMaskEthereum = async () => {
  const { ethereum } = window;
  await ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: WFAIRAddress,
        symbol: "WFAIR",
        decimals: 18,
        image: "https://main.wallfair.io/logo192.png",
      },
    },
  });
};
