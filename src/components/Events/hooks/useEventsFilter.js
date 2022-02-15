import { getMarketEvents } from 'api';
import BetState from 'constants/BetState';
import { useEffect, useState } from 'react';

export function useEventsFilter(
  statuses,
  category = 'all',
) {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    getMarketEvents(
      category,
      !statuses ? [BetState.active] : statuses,
    ).then(res => {
      setEvents(res);
    });
  }, []);

  return { events };
}
