import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventActions } from '../../../store/actions/event';

export function useChartData(betId) {
  const dispatch = useDispatch();
  const [filterActive, setFilterActive] = useState('24H');

  const defaultParams = {
    rangeType: 'hour',
    rangeValue: '24',
    direction: 'BUY',
  };

  const chartData = useSelector(state => state.event.chartData);

  const filterMap = {
    '24H': {
      rangeType: 'hour',
      rangeValue: '24',
    },
    '7D': {
      rangeType: 'day',
      rangeValue: '7',
    },
    '30D': {
      rangeType: 'day',
      rangeValue: '30',
    },
  };

  const handleChartPeriodFilter = filterName => {
    setFilterActive(filterName);
    dispatch(
      EventActions.initiateFetchChartData(betId, {
        direction: 'BUY',
        rangeType: filterMap[filterName].rangeType,
        rangeValue: filterMap[filterName].rangeValue,
      })
    );
  };

  useEffect(() => {
    if (betId) {
      dispatch(EventActions.initiateFetchChartData(betId, defaultParams));
    }
  }, [betId]);

  return {
    chartData,
    filterActive,
    handleChartPeriodFilter,
  };
}
