import React, { useState, useEffect } from "react";
import Routes from "../../constants/Routes";
import styles from "./styles.module.scss";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Search from "../Search";
import EventCard from "../EventCard";
import { EventActions } from "../../store/actions/event";

function LiveEvents({ fetchLiveEvents }) {
    const [searchInput, setSearchInput] = useState("");

    const handleSearchSubmit = (val) => {
        console.log("confirm search", val);
        fetchLiveEvents({
            type: "all",
            category: "all",
            count: "30",
            page: "1",
            sortBy: "name",
            searchQuery: searchInput,
        });
    };

    useEffect(() => {
        fetchLiveEvents({
            type: "all",
            category: "all",
            count: "30",
            page: "1",
            sortBy: "name",
            searchQuery: "",
        });
    }, [fetchLiveEvents]);

    const events = useSelector((state) => state.event.filteredEvents);

    const history = useHistory();

    const onEventClick = (eventId, streamUrl) => {
        console.log("event clicked", eventId, streamUrl);
        return () => {
            // history.push(
            //     Routes.getRouteWithParameters(Routes.bet, {
            //         eventId,
            //         betId,
            //     })
            // );
        };
    };
    return (
        <>
            <section className={styles.section}>
                <div className={styles.mpes}>event shortcuts</div>
                <div className={styles.search}>
                    <Search
                        value={searchInput}
                        handleChange={(value) => setSearchInput(value)}
                        handleConfirm={handleSearchSubmit}
                    />
                </div>
                <div className={styles.sort}>sort</div>
            </section>
            <section className={styles.main}>
                {events.map((item) => (
                    <EventCard
                        key={item._id}
                        title={item.name}
                        organizer={""}
                        // viewers={12345}
                        live={item.isLive}
                        // tags={mappedTags}
                        image={item.previewImageUrl}
                        onClick={() => onEventClick(item._id, item.streamUrl)}
                    />
                ))}
            </section>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        testProp: "sdsd",
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchLiveEvents: (params) =>
            dispatch(EventActions.initiateFetchFilteredEvents(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveEvents);
