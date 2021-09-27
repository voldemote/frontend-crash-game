import * as ApiUrls from '../constants/Api';
import axios from 'axios';

const newsUrl = () => ApiUrls.NEWS_API_URL;

export const getNews = params =>
  axios.get(`${newsUrl()}`, {
    params: {
      token: ApiUrls.NEWS_API_KEY,
      ...params,
    },
  });
