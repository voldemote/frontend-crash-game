import actions from "../../config/actions.json";
import axios from "axios";
import { networkInfo } from "../../config/config";

const apiEndpointUrls = networkInfo;

const getEndpoint = (type) =>
  type
    ? apiEndpointUrls[type].apiExplorer
    : apiEndpointUrls[actions.network.name].apiExplorer;

const getApiToken = () => process.env.REACT_APP_ETHERSCAN_API_KEY;

export const getPredictedGasPrice = async (type = "mainnet") => {
  const endpoint = getEndpoint(type);
  const apiKey = getApiToken();

  return await axios.get(endpoint, {
    params: {
      module: `gastracker`,
      action: `gasoracle`,
      apikey: apiKey,
    },
  });
};
