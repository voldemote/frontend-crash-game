import { useState } from 'react';
import styles from './styles.module.scss';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import CoDImage from '../../data/images/Call of Duty_ Warzone-144x192.jpeg';
import FifaImage from '../../data/images/FIFA 21-144x192.jpeg';
import LoLImage from '../../data/images/League of Legends-144x192.jpeg';
import MinecraftImage from '../../data/images/Minecraft-144x192.jpeg';
import AllImage from '../../data/images/wallfair-all-category.png';

const Events = () => {
    const [categories, setCategories] = useState([
        {
            value: 'all',
            image: AllImage,
            isActive: true,
        },
        {
            value: 'sports',
            image: FifaImage,
            isActive: false,
        },
        {
            value: 'politics',
            image: CoDImage,
            isActive: false,
        },
        {
            value: 'crypto',
            image: LoLImage,
            isActive: false,
        },
        {
            value: 'celebrities',
            image: MinecraftImage,
            isActive: false,
        },
        {
            value: 'other',
            image: MinecraftImage,
            isActive: false,
        },
    ]);
    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <EventsContent
                eventType="non-streamed"
                categories={categories}
                setCategories={setCategories}
            />
        </BaseContainerWithNavbar>
    );
};

export default Events;
