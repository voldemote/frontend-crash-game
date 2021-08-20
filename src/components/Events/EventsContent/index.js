import React, { useState, useEffect, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory, useParams, Link, useLocation } from 'react-router-dom';
import Routes from '../../../constants/Routes';
import styles from './styles.module.scss';
import Search from '../../Search';
import EventCard from '../../EventCard';
import { EventActions } from '../../../store/actions/event';
import CategoryList from '../../CategoryList';

function EventsContent({
    fetchFilteredEvents,
    resetDefaultParamsValues,
    eventType,
    categories,
    setCategories,
}) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchSubmit = val => {
        fetchFilteredEvents({
            searchQuery: searchInput,
        });
    };

    const handleSelectCategory = value => {
        fetchFilteredEvents({
            category: value,
        });
        const updatedCats = categories.map(cat => {
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

    const events = useSelector(state => state.event.filteredEvents);

    const mappedTags = id =>
        events.find(event => event._id === id)?.tags.map(tag => tag.name) || [];

    useEffect(() => {
        fetchFilteredEvents();
    }, []);

    useEffect(() => {
        return () => {
            resetDefaultParamsValues();
        };
    }, []);

    const location = useLocation();

    return (
        <>
            <section className={styles.title}>
                {eventType === 'streamed' ? 'Live streams' : 'Events'}
            </section>
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
                        handleChange={value => setSearchInput(value)}
                        handleConfirm={handleSearchSubmit}
                    />
                </div>
                {/* <div className={styles.sort}>sort</div> */}
            </section>
            <section className={styles.main}>
                {events.map(item => (
                    <Link
                        to={{
                            pathname: `/trade/${item._id}`,
                            state: { fromLocation: location },
                        }}
                        key={item._id}
                    >
                        <EventCard
                            key={item._id}
                            title={item.name}
                            organizer={''}
                            viewers={12345}
                            live={eventType === 'streamed'}
                            tags={mappedTags(item._id)}
                            image={item.previewImageUrl}
                            eventEnd={item.date}
                        />
                    </Link>
                ))}
            </section>
        </>
    );
}

const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = (dispatch, { eventType }) => {
    return {
        fetchFilteredEvents: (params = {}) =>
            dispatch(
                EventActions.initiateFetchFilteredEvents({
                    ...params,
                    type: eventType,
                })
            ),
        resetDefaultParamsValues: () =>
            dispatch(EventActions.resetDefaultParamsValues()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsContent);
