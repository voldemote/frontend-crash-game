import styles from "./styles.module.scss";
import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import HeaderWithHeadline from "components/HeaderWithHeadline";
import LiveEventsComponent from "components/LiveEvents";

const LiveEvents = () => {
    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <LiveEventsComponent />
        </BaseContainerWithNavbar>
    );
};

export default LiveEvents;
