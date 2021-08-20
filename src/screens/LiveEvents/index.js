import { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import CoDImage from '../../data/images/Call of Duty_ Warzone-144x192.jpeg';
import FifaImage from '../../data/images/FIFA 21-144x192.jpeg';
import LoLImage from '../../data/images/League of Legends-144x192.jpeg';
import MinecraftImage from '../../data/images/Minecraft-144x192.jpeg';
import AllImage from '../../data/images/wallfair-all-category.png';

const LiveEvents = () => {
    const [categories, setCategories] = useState([
        {
            value: 'all',
            image: AllImage,
            isActive: true,
        },
        {
            value: 'streamed-esports',
            image: FifaImage,
            isActive: false,
        },
        {
            value: 'streamed-shooter',
            image: CoDImage,
            isActive: false,
        },
        {
            value: 'streamed-mmorpg',
            image: LoLImage,
            isActive: false,
        },
        {
            value: 'streamed-other',
            image: MinecraftImage,
            isActive: false,
        },
    ]);

    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <EventsContent
                eventType="streamed"
                categories={categories}
                setCategories={setCategories}
            />
        </BaseContainerWithNavbar>
    );
};

export default LiveEvents;
