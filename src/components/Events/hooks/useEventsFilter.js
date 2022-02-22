import { getMarketEvents } from 'api';
import BetState from 'constants/BetState';
import { useEffect, useState } from 'react';

export function useEventsFilter(
  statuses,
  category = 'all',
  page,
  random = false,
  limit = 12,
  name
) {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (getMarketEvents) {
      getMarketEvents(
        category,
        !statuses ? [BetState.active] : statuses,
        page,
        limit,
        name
      ).then(res => {
        console.log(res);
        if (random) {
          const randomIndex = Math.floor(Math.random() * res.length);
          const randomEvent = res[randomIndex];
          setEvents([randomEvent]);
          return;
        }

        setEvents(res);
      });
    }
  }, []);

  return { events };
}
