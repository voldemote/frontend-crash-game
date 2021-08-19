import styles from './styles.module.scss';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';

const LiveEvents = () => {
    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <EventsContent eventType="streamed" />
        </BaseContainerWithNavbar>
    );
};

export default LiveEvents;
