import { useState } from 'react';
import { Link } from 'react-router-dom';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import AdminOnly from 'components/AdminOnly';
import Routes from 'constants/Routes';

const LiveEvents = ({ history }) => {
  const [categories, setCategories] = useState(LIVE_EVENTS_CATEGORIES);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <AdminOnly>
        <Link
          to={Routes.newLiveEvent}
          style={{ color: '#ffffff', marginLeft: '146px' }}
        >
          New Event
        </Link>
      </AdminOnly>
      <EventsContent
        eventType="streamed"
        categories={categories}
        setCategories={setCategories}
      />
    </BaseContainerWithNavbar>
  );
};

export default LiveEvents;
