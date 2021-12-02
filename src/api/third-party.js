import * as ApiUrls from '../constants/Api';
import axios from 'axios';

export const getNews = params =>
  axios.get(`${ApiUrls.NEWS_API_URL}`, {
    params: {
      token: ApiUrls.NEWS_API_KEY,
      ...params,
    },
  });

export const accountMapping = (body, token) => {
  const payload = {
    userId: body.userId,
    account: body.account,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  axios.post(ApiUrls.ACCOUNT_MAPPING, payload, config).then(response => {
    console.log('------> Response----', response);
  });
};

export const convertCurrency = async body => {
  const params = Object.keys(body)
    .map(key => body[key] && `${key}=${body[key]}`)
    .join('&');
  const config = {
    headers: {
      'X-CMC_PRO_API_KEY': '738616cf-f902-4b79-8056-a556178ec202',
    },
  };

  axios.get('/get/quote/conversion').then(response => {
    const { WFAIR } = response.data.data;
    console.log('-------------->>>>>>>WFAIR', WFAIR);
    return response;
  });
};
