import * as ApiUrls from '../constants/Api';
import axios from 'axios';

const isSsl = ApiUrls.NEWS_API_SSL_MODE;

const newsUrl = () =>
  !isSsl
    ? ApiUrls.NEWS_API_URL.replace('https://', 'http://')
    : ApiUrls.NEWS_API_URL.replace('http://', 'https://');

export const getNews = params =>
  axios.get(`${newsUrl()}`, {
    params: {
      access_key: ApiUrls.NEWS_API_KEY,
      ...params,
    },
  });
