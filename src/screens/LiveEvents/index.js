import styles from "./styles.module.scss";
import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import LiveEventsContent from "components/Events/LiveEvents";

const LiveEvents = () => {
    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <LiveEventsContent />
        </BaseContainerWithNavbar>
    );
};

export default LiveEvents;
