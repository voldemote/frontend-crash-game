import { useEffect, useState } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';
import { trackPageView } from 'config/gtm';

const Events = () => {
  const [categories, setCategories] = useState(EVENT_CATEGORIES);

  useEffect(() => {
    trackPageView({
      pageTitle: 'Events',
    });
  }, []);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <EventsContent
        eventType="non-streamed"
        categories={categories}
        setCategories={setCategories}
      />
    </BaseContainerWithNavbar>
  );
};

export default Events;
