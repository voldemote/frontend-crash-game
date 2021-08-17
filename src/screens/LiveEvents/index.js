import styles from "./styles.module.scss";
import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import HeaderWithHeadline from "components/HeaderWithHeadline";
import LiveEventsComponent from "components/LiveEventsComponent";

const LiveEvents = () => {
    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <HeaderWithHeadline headline="Live Events" />
            <LiveEventsComponent />
        </BaseContainerWithNavbar>
    );
};

export default LiveEvents;
