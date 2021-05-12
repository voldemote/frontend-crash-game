// Imports from React-Router-Dom
import { useHistory } from 'react-router-dom';

// Imports for components
import Navbar         from '../components/Navbar/index';
import Header         from '../components/Header/index';
import EventBetPill   from '../components/EventBetPill/index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import EventCard      from '../components/EventCard/index';

// Imports for styling
import styled         from 'styled-components';
import { NextBtn }    from '../themes/CommonStyle';

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
                <Headline>🔥 Most popular Live Events</Headline>
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
                <Headline>🔥 Most popular Bets</Headline>
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

// Styled components
const Headline = styled.h1`
  color: #ffffff;
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 24px;
  margin: 8rem 0 1rem 0;
`;

export default Home;