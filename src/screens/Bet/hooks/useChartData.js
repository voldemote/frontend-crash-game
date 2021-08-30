import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EventActions } from '../../../store/actions/event';

export function useChartData(betId) {
  const [chartData, setChartData] = useState([]);
  const [filterActive, setFilterActive] = useState('');
  const handleChartPeriodFilter = event => {
    console.log('event :>> ', event);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EventActions.initiateFetchChartData(betId));
  }, []);

  return {
    chartData,
    filterActive,
    handleChartPeriodFilter,
  };
}
