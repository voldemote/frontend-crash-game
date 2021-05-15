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
import BetCard               from '../../components/BetCard';

const Home = () => {
    const currentDate           = new Date();
    const user                  = {
        name:           'John Doe',
        profilePicture: ExampleProfilePicture,
    };
    const examplePreviewBgImage = 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/10/28/47151ddd-f5ad-48d9-a24a-6189a647cc1f/redbullrampage_2019_utah_landscape_hero';
    const exampleEventImage     = 'https://media-cdn.tripadvisor.com/media/photo-s/0e/85/8d/53/red-bull-flugtag-event.jpg';
    const exampleBetImage       = 'https://static.dw.com/image/57473723_303.jpg';

    return (
        <div className={styles.homeContainer}>
            <Navbar />
            <Header
                backgroundImage={examplePreviewBgImage}
                title={'RedBull Rampage 2021 LIVE'}
                tags={['sports', 'redbull']}
            />
            <div className={styles.betPillContainer}>
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
            </CarouselContainer>
            <CarouselContainer title={'🚀 Most popular Bets'}>
                <BetCard
                    image={exampleBetImage}
                    user={user}
                    marketQuestion={'Will Elon Musk tweet about EVNT token by next week?'}
                    hot={true}
                    eventEnd={new Date(currentDate.getTime() + 12 * 60000)}
                />
                <BetCard
                    image={exampleBetImage}
                    user={user}
                    marketQuestion={'Will Elon Musk tweet about EVNT token by next week?'}
                    hot={true}
                    eventEnd={new Date(currentDate.getTime() + 12 * 60000)}
                />
                <BetCard
                    image={exampleBetImage}
                    user={user}
                    marketQuestion={'Will Elon Musk tweet about EVNT token by next week?'}
                    hot={true}
                    eventEnd={new Date(currentDate.getTime() + 12 * 60000)}
                />
                <BetCard
                    image={exampleBetImage}
                    user={user}
                    marketQuestion={'Will Elon Musk tweet about EVNT token by next week?'}
                    hot={true}
                    eventEnd={new Date(currentDate.getTime() + 12 * 60000)}
                />
                <BetCard
                    image={exampleBetImage}
                    user={user}
                    marketQuestion={'Will Elon Musk tweet about EVNT token by next week?'}
                    hot={true}
                    eventEnd={new Date(currentDate.getTime() + 12 * 60000)}
                />
            </CarouselContainer>
        </div>
    );
};

export default Home;