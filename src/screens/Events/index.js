import { useState } from 'react';
import styles from './styles.module.scss';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import SportsImage from '../../data/icons/events-sports-icon.svg';
import OtherImage from '../../data/icons/events-other-icon.svg';
import PoliticsImage from '../../data/icons/events-politics-icon.svg';
import CelebritiesImage from '../../data/icons/events-celebrities-icon.svg';
import AllImage from '../../data/icons/events-all-icon.svg';
import CryptoImage from '../../data/icons/events-crypto-icon.svg';

const Events = () => {
    const [categories, setCategories] = useState([
        {
            value: 'all',
            image: AllImage,
            isActive: true,
            type: 'icon',
        },
        {
            value: 'sports',
            image: SportsImage,
            isActive: false,
            type: 'icon',
        },
        {
            value: 'celebrities',
            image: CelebritiesImage,
            isActive: false,
            type: 'icon',
        },
        {
            value: 'politics',
            image: PoliticsImage,
            isActive: false,
            type: 'icon',
        },
        {
            value: 'crypto',
            image: CryptoImage,
            isActive: false,
            type: 'icon',
        },
        // {
        //     value: 'other',
        //     image: OtherImage,
        //     isActive: false,
        //     type: 'icon',
        // },
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
