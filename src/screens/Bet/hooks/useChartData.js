import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventActions } from '../../../store/actions/event';

export function useChartData(betId) {
  const dispatch = useDispatch();
  const [filterActive, setFilterActive] = useState('24H');

  const currentParams = {
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

    currentParams.rangeType = filterMap[filterName].rangeType;
    currentParams.rangeValue = filterMap[filterName].rangeValue;
    dispatch(
      EventActions.initiateFetchChartData(betId, {
        ...currentParams,
      })
    );
  };

  const handleChartDirectionFilter = directionIndex => {
    setFilterActive('24H');

    currentParams.direction = directionIndex === 0 ? 'BUY' : 'SELL';

    dispatch(
      EventActions.initiateFetchChartData(betId, {
        ...currentParams,
      })
    );
  };

  useEffect(() => {
    if (betId) {
      dispatch(EventActions.initiateFetchChartData(betId, currentParams));
    }
  }, [betId]);

  return {
    chartData,
    filterActive,
    handleChartPeriodFilter,
    handleChartDirectionFilter,
  };
}
