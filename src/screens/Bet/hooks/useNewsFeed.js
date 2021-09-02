import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventActions } from '../../../store/actions/event';

export function useNewsFeed(event) {
  const dispatch = useDispatch();

  const tags = event?.tags.map(tag => tag.name) || [];
  const uniqueKeywords = Array.from(new Set([event?.category, ...tags]));
  const queries = uniqueKeywords.join(' OR ');

  // api docs: https://newsapi.org/docs/endpoints/everything
  const params = {
    qInTitle: queries,
    pageSize: 10,
    sortBy: 'relevancy',
  };

  useEffect(() => {
    if (event?.type === 'non-streamed')
      dispatch(EventActions.initiateFetchNewsData('everything', params));
  }, [event]);

  return {};
}
