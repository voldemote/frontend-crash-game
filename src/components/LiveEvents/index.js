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
    };

    useEffect(() => {
        console.log("searchInput :>> ", searchInput);
    }, [searchInput]);

    useEffect(() => {
        fetchLiveEvents({
            type: "all",
            category: "all",
            count: "30",
            page: "1",
            sortBy: "name:asc",
            searchQuery: "",
        });
    }, []);

    const events = useSelector((state) => state.events);

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
                {events}
                {/* <EventCard
                    title={event.name}
                    organizer={""}
                    viewers={12345}
                    live={isLive}
                    tags={mappedTags}
                    image={event.previewImageUrl}
                    onClick={onEventClick(eventId, currentTradeId)}
                /> */}
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
