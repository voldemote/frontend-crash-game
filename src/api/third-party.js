import * as ApiUrls from '../constants/Api';
import axios from 'axios';

export const getNews = (newsType, params) =>
  axios.get(`https://newsapi.org/v2/${newsType}`, {
    params,
    headers: {
      Authorization: `Bearer ${ApiUrls.NEWS_API_KEY}`,
    },
  });
