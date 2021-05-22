import darkModeLogo        from '../../data/images/logo-darkmode.svg';
import Link                from '../../components/Link';
import Routes              from '../../constants/Routes';
import styles              from './styles.module.scss';
import ExampleProfilePicture from '../../data/images/doge.jpg';
import LiveBadge from 'components/LiveBadge';
import HotBetBadge from 'components/HotBetBadge';
import ViewerBadge from 'components/ViewerBadge';
import ChatBubble from 'components/chatBubble';
import RelatedEventCard from 'components/RelatedEventCard';
import TimeLeftCounter  from 'components/TimeLeftCounter';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Bet = ({ bet }) => {

    const exampleEventImage = 'https://media-cdn.tripadvisor.com/media/photo-s/0e/85/8d/53/red-bull-flugtag-event.jpg';

    return (
        <div className={styles.bet}>
            <div className={styles.header}>
                <div className={styles.headlineContainer}>
                    <Link to={Routes.home} className={styles.arrowBack}></Link>
                    <div className={styles.headline}>
                        <h1>RedBull Rampage 2021</h1>
                        <LiveBadge />
                        <ViewerBadge viewers={1123} />
                    </div>
                </div>
                <img src={darkModeLogo} alt="Wallfair" />
            </div>
            <div className={styles.row}>
                <div className={styles.columnLeft}>
                    <div>
                        <iframe src="https://player.twitch.tv/?channel=pietsmiet&parent=www.example.com" 
                        style={{ borderRadius: "10px", maxHeight: "450px" }} frameborder="0" allowfullscreen="true" scrolling="no" height="450" width="100%"></iframe>
                    </div>
                    <div className={styles.timeLeft}>
                        <span>Event ends in:</span>
                        <TimeLeftCounter endDate={new Date(new Date().getTime() + 12 * 60000)} />
                    </div>
                    <div className={styles.chat}>
                        <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum "} date={"just now"} />
                        <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem"} date={"just now"} />
                        <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "} date={"just now"} />
                        <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "} date={"just now"} />
                        <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                        <div className={styles.overlay}></div>
                    </div>
                    <form className={styles.messageInput}>
                        <input id="message" type="text" name="message" placeholder="Comment..." />
                        <button type="submit" onClick={() => console.log("sent")}>Send</button>
                    </form>
                </div>
                <div className={styles.columnRight}>
                    <div className={styles.placeBet}>
                        <div className={styles.title}>Who will win Red Bull Rampage?</div>
                        <small>by Anna Smith | Category: Sports</small>
                        <HotBetBadge className={styles.badge} />
                        <div className={styles.wrapper}>
                            <label className={styles.label}>Your bet:</label>
                            <div className={styles.input}>
                                <input id="amount" type="number" name="amount" />
                                <span>EVNT</span>
                            </div>

                            <div className={styles.buttonContainer}>
                                <label htmlFor={'choice'} className={styles.label}>Your choice &amp; possible bet:</label>
                                <div className={styles.quoteButtons}>
                                    <div>
                                        <input type="radio" value="quote1" name="bet" id="bet1" required />
                                        <label htmlFor="bet1">Paul <span>6.000 EVNT</span></label>
                                    </div>
                                    <div>
                                        <input type="radio" value="quote2" name="bet" id="bet2" required />
                                        <label htmlFor="bet2">John <span>8.000 EVNT</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button  className={styles.betButton} type="submit">Bet!</button>
                    </div>
                    <div className={styles.relatedEvents}>
                        <div className={styles.headline}>
                            <h2>🚀 Related Events</h2>
                            <LiveBadge />
                        </div>
                        <Carousel emulateTouch={true} infiniteLoop={true} showArrows={false} showStatus={false}>
                            <div>
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                            </div>
                            <div>
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                            </div>
                            <div>
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bet;
