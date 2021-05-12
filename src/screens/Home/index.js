// Imports from React-Router-Dom
import { useHistory } from 'react-router-dom';

// Imports for components
import Navbar         from '../../components/Navbar/index';
import Header         from '../../components/Header/index';
import EventBetPill   from '../../components/EventBetPill/index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import EventCard      from '../../components/EventCard/index';
import styles         from './styles.module.scss';

const Home = () => {
    const history = useHistory();

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    return (
        <div style={{ backgroundColor: "#120e27", paddingBottom: "8rem" }}>
            <Navbar />
            <Header />
            <div style={{ padding: "0 3rem" }}>
                <EventBetPill />
                <EventBetPill />
                <h1 className={styles.headline}>
                    🔥 Most popular Live Events
                </h1>
            </div>
            <div style={{ paddingLeft: "3rem" }}>
                <Carousel responsive={responsive}>
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </Carousel>
            </div>
            <div style={{ padding: "0 3rem" }}>
                <h1 className={styles.headline}>
                    🔥 Most popular Bets
                </h1>
            </div>
            <div style={{ paddingLeft: "3rem" }}>
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