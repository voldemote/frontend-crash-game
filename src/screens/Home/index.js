import 'react-multi-carousel/lib/styles.css';
import Carousel              from 'react-multi-carousel';
import EventBetPill          from '../../components/EventBetPill/index';
import EventCard             from '../../components/EventCard/index';
import Header                from '../../components/Header/index';
import Navbar                from '../../components/Navbar/index';
import styles                from './styles.module.scss';
import ExampleProfilePicture from '../../data/images/doge.jpg';
import { useHistory }        from 'react-router-dom';
import CarouselContainer     from '../../components/CarouselContainer';

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

    const currentDate       = new Date();
    const user              = {
        name:           'John Doe',
        profilePicture: ExampleProfilePicture,
    };
    const exampleEventImage = 'https://media-cdn.tripadvisor.com/media/photo-s/0e/85/8d/53/red-bull-flugtag-event.jpg';

    return (
        <div style={{ backgroundColor: '#120e27', paddingBottom: '8rem' }}>
            <Navbar />
            <Header />
            <div style={{ padding: '0 3rem' }}>
                <EventBetPill
                    user={user}
                    marketQuestion={'Who will win Red Bull Rampage?'}
                    hotBet={true}
                    eventEnd={new Date(currentDate.getTime() + 70 * 60000)}
                />
                <EventBetPill
                    user={user}
                    marketQuestion={'Will Elon Musk tweet about EVNT token by next week?'}
                    hotBet={true}
                    eventEnd={new Date(currentDate.getTime() + 120 * 60000)}
                />
            </div>
            <CarouselContainer title={'🚀 Most popular Bets'}>
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
            </CarouselContainer>
            <CarouselContainer title={'🔥 Most popular Live Events'}>
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
                <EventCard
                    title={'eSports Alliance'}
                    organizer={'JIB PUBG'}
                    viewers={12345}
                    live={true}
                    tags={['esports', 'shooter']}
                    image={exampleEventImage}
                />
            </CarouselContainer>
        </div>
    );
};

export default Home;