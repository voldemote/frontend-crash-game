import React, { useState, useEffect } from "react";
import Routes from "../../constants/Routes";
import styles from "./styles.module.scss";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Search from "../Search";
import EventCard from "../EventCard";
import { EventActions } from "../../store/actions/event";
import CategoryList from "../CategoryList";
import CoDImage from "../../data/images/Call of Duty_ Warzone-144x192.jpeg";
import FifaImage from "../../data/images/FIFA 21-144x192.jpeg";
import LoLImage from "../../data/images/League of Legends-144x192.jpeg";
import MinecraftImage from "../../data/images/Minecraft-144x192.jpeg";

function LiveEvents({ fetchLiveEvents }) {
    const [searchInput, setSearchInput] = useState("");
    const [categories, setCategories] = useState([
        {
            value: "all",
            image: "placeholder",
            isActive: true,
        },
        {
            value: "streamed-esports",
            image: FifaImage,
            isActive: false,
        },
        {
            value: "streamed-shooter",
            image: CoDImage,
            isActive: false,
        },
        {
            value: "streamed-mmorpg",
            image: LoLImage,
            isActive: false,
        },
        {
            value: "streamed-other",
            image: MinecraftImage,
            isActive: false,
        },
    ]);

    const handleSearchSubmit = (val) => {
        fetchLiveEvents({
            searchQuery: searchInput,
        });
    };

    const handleSelectCategory = (value) => {
        fetchLiveEvents({
            category: value,
        });
        const updatedCats = categories.map((cat) => {
            if (value !== cat.value)
                return {
                    ...cat,
                    isActive: false,
                };
            return {
                ...cat,
                isActive: true,
            };
        });
        setCategories(updatedCats);
    };

    const events = useSelector((state) => state.event.filteredEvents);

    const onEventClick = (eventId, streamUrl) => {
        console.log("event clicked", eventId, streamUrl);
    };

    const mappedTags = (id) =>
        events.find((event) => event._id === id)?.tags.map((tag) => tag.name) ||
        [];

    useEffect(() => {
        fetchLiveEvents();
    }, [fetchLiveEvents]);

    return (
        <>
            <section className={styles.title}>Live streams</section>
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
                        eventEnd={item.date}
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
