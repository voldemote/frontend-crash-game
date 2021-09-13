import { useState } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';

const LiveEvents = ({ history }) => {
  const [categories, setCategories] = useState(LIVE_EVENTS_CATEGORIES);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <EventsContent
        eventType="streamed"
        categories={categories}
        setCategories={setCategories}
      />
    </BaseContainerWithNavbar>
  );
};

export default LiveEvents;
