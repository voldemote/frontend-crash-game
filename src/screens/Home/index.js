import 'react-multi-carousel/lib/styles.css';
import Carousel              from 'react-multi-carousel';
import EventBetPill          from '../../components/EventBetPill/index';
import EventCard             from '../../components/EventCard/index';
import Header                from '../../components/Header/index';
import Navbar                from '../../components/Navbar/index';
import styles                from './styles.module.scss';
import ExampleProfilePicture from '../../data/images/doge.jpg';
import { useHistory }        from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items:      5,
        },
        desktop:           {
            breakpoint: { max: 3000, min: 1024 },
            items:      3,
        },
        tablet:            {
            breakpoint: { max: 1024, min: 464 },
            items:      2,
        },
        mobile:            {
            breakpoint: { max: 464, min: 0 },
            items:      1,
        },
    };

    const currentDate = new Date();
    const eventEnd    = new Date(currentDate.getTime() + 70 * 60000);

    return (
        <div style={{ backgroundColor: '#120e27', paddingBottom: '8rem' }}>
            <Navbar />
            <Header />
            <div style={{ padding: '0 3rem' }}>
                <EventBetPill
                    userProfilePicture={ExampleProfilePicture}
                    userName={'John Doe'}
                    marketQuestion={'Who will win Red Bull Rampage?'}
                    hotBet={true}
                    eventEnd={eventEnd}
                />
                <EventBetPill />
                <h1 className={styles.headline}>
                    🔥 Most popular Live Events
                </h1>
            </div>
            <div style={{ paddingLeft: '3rem' }}>
                <Carousel responsive={responsive}>
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </Carousel>
            </div>
            <div style={{ padding: '0 3rem' }}>
                <h1 className={styles.headline}>
                    🔥 Most popular Bets
                </h1>
            </div>
            <div style={{ paddingLeft: '3rem' }}>
                <Carousel responsive={responsive}>
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </Carousel>
            </div>
        </div>
    );
};

export default Home;