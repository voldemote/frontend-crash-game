import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventActions } from '../../../store/actions/event';

export function useNewsFeed(event) {
  const dispatch = useDispatch();

  const tags = event?.tags.map(tag => tag.name) || [];
  const uniqueKeywords = Array.from(new Set([event?.category, ...tags]));
  const queries = uniqueKeywords.join('+');

  // api docs: https://newsapi.org/docs/endpoints/everything
  const params = {
    keywords: queries,
    limit: 8,
    sort: 'popularity',
    languages: 'en',
  };

  useEffect(() => {
    if (event?.type === 'non-streamed')
      dispatch(EventActions.initiateFetchNewsData(params));
  }, [event]);

  return {};
}
