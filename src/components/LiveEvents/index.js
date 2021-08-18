import React, { useState, useEffect } from "react";
import Routes from "../../constants/Routes";
import styles from "./styles.module.scss";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Search from "../Search";
import EventCard from "../EventCard";
import { EventActions } from "../../store/actions/event";
import CategoryList from "../CategoryList";

function LiveEvents({ fetchLiveEvents }) {
    const [searchInput, setSearchInput] = useState("");

    const handleSearchSubmit = (val) => {
        fetchLiveEvents({
            searchQuery: searchInput,
        });
    };

    const handleSelectCategory = (value) => {
        fetchLiveEvents({
            category: value,
        });
    };

    useEffect(() => {
        fetchLiveEvents();
    }, [fetchLiveEvents]);

    const events = useSelector((state) => state.event.filteredEvents);

    const onEventClick = (eventId, streamUrl) => {
        console.log("event clicked", eventId, streamUrl);
    };

    const mappedTags = (id) =>
        events.find((event) => event._id === id)?.tags.map((tag) => tag.name) ||
        [];

    const categories = [
        {
            image: "placeholder",
            value: "all",
        },
        {
            image: "placeholder",
            value: "streamed-esports",
        },
        {
            image: "placeholder",
            value: "streamed-shooter",
        },
        {
            image: "placeholder",
            value: "streamed-mmorpg",
        },
        {
            image: "placeholder",
            value: "streamed-other",
        },
    ];

    return (
        <>
            <section className={styles.header}>
                <div className={styles.categories}>
                    <CategoryList
                        categories={categories}
                        handleSelect={handleSelectCategory}
                    />
                </div>
                <div className={styles.search}>
                    <Search
                        value={searchInput}
                        handleChange={(value) => setSearchInput(value)}
                        handleConfirm={handleSearchSubmit}
                    />
                </div>
                {/* <div className={styles.sort}>sort</div> */}
            </section>
            <section className={styles.main}>
                {events.map((item) => (
                    <EventCard
                        key={item._id}
                        title={item.name}
                        organizer={""}
                        viewers={12345}
                        live={true}
                        tags={mappedTags(item._id)}
                        image={item.previewImageUrl}
                        onClick={() => onEventClick(item._id, item.streamUrl)}
                    />
                ))}
            </section>
        </>
    );
}

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchLiveEvents: (params) =>
            dispatch(EventActions.initiateFetchFilteredEvents(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveEvents);
