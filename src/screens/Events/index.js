import styles from "./styles.module.scss";
import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import NonLiveEventsContent from "../../components/Events/NonLiveEvents";

const Events = () => {
    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <NonLiveEventsContent />
        </BaseContainerWithNavbar>
    );
};

export default Events;
