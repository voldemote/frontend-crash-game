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
