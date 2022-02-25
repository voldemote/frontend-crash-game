import { getMarketEvents } from 'api';
import BetState from 'constants/BetState';
import { useEffect, useState } from 'react';

export function useEventsFilter(
  statuses,
  category = 'all',
  page,
  random = false,
  limit = 12,
  name,
  orderBy,
  order
) {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (getMarketEvents) {
      getMarketEvents(
        category,
        !statuses ? [BetState.active] : statuses,
        page,
        limit,
        name,
        orderBy,
        order
      ).then(res => {
        if (random) {
          const randomIndex = Math.floor(Math.random() * res.events.length);
          const randomEvent = res.events[randomIndex];
          setEvents([randomEvent]);
          return;
        }

        setEvents(res.events);
      });
    }
  }, []);

  return { events };
}
