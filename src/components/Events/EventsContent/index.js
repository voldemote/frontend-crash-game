import React, { useState, useEffect, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Link, useLocation } from 'react-router-dom';
import Routes from '../../../constants/Routes';
import styles from './styles.module.scss';
import Search from '../../Search';
import EventCard from '../../EventCard';
import CategoryList from '../../CategoryList';
import { useMappedActions } from './hooks/useMappedActions';

function EventsContent({ eventType, categories, setCategories }) {
    const [searchInput, setSearchInput] = useState('');

    const location = useLocation();
    const { category } = useParams();

    const { fetchFilteredEvents, resetDefaultParamsValues } =
        useMappedActions(eventType);

    const handleSearchSubmit = val => {
        fetchFilteredEvents({
            searchQuery: searchInput,
        });
    };

    const handleSelectCategory = useCallback(
        value => {
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
        },
        [fetchFilteredEvents, setCategories]
    );

    const events = useSelector(state => state.event.filteredEvents);

    const mappedTags = id =>
        events.find(event => event._id === id)?.tags.map(tag => tag.name) || [];

    useEffect(() => {
        handleSelectCategory(category);
    }, [category, handleSelectCategory]);

    useEffect(() => {
        return () => {
            resetDefaultParamsValues();
        };
    }, []);

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

export default EventsContent;
