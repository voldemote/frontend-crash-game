import styles from "./styles.module.scss";
import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import EventsContent from "components/Events/EventsContent";

const Events = () => {
    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <EventsContent eventType="non-streamed" />
        </BaseContainerWithNavbar>
    );
};

export default Events;
