import darkModeLogo      from '../../data/images/logo-darkmode.svg';
import { useState }      from 'react';
import Link              from '../../components/Link';
import Routes            from '../../constants/Routes';
import { Carousel }      from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles            from './styles.module.scss';
import LiveBadge         from 'components/LiveBadge';
import ViewerBadge       from 'components/ViewerBadge';
import Chat              from 'components/Chat';
import RelatedEventCard  from 'components/RelatedEventCard';
import TimeLeftCounter   from 'components/TimeLeftCounter';
import FixedIconButton   from '../../components/FixedIconButton';
import IconType          from '../../components/Icon/IconType';
import { connect }       from 'react-redux';
import { PopupActions }  from '../../store/actions/popup';
import PopupTheme        from '../../components/Popup/PopupTheme';
import BetPlaceContainer from 'components/BetPlaceContainer';
import Icon              from '../../components/Icon';
import IconTheme         from '../../components/Icon/IconTheme';

const Bet = ({ bet, showPopup }) => {

    const exampleEventImage = 'https://media-cdn.tripadvisor.com/media/photo-s/0e/85/8d/53/red-bull-flugtag-event.jpg';
    const [currentSlide, setCurrentSlide] = useState(0);

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index)
        }
    };

    const eventCreationButtonClicked = () => {
        showPopup({ popupType: PopupTheme.betCreation });
    };

    const renderEventCreationButton = () => {
        return (
            <FixedIconButton
                onClick={eventCreationButtonClicked}
                iconType={IconType.bet}
            />
        );
    };

    return (
        <div className={styles.bet}>
            <div className={styles.row}>
                <div className={styles.columnLeft}>
                    <div className={styles.headlineContainer}>
                        <Link to={Routes.home} className={styles.arrowBack}></Link>
                        <div className={styles.headline}>
                            <h1>RedBull Rampage 2021</h1>
                            <div>
                                <LiveBadge />
                                <ViewerBadge viewers={1123} />
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "100%", flex: "initial" }}>
                        <iframe src="https://player.twitch.tv/?channel=pietsmiet&parent=www.example.com" className={styles.twitchStream} frameborder="0" allowfullscreen="true" scrolling="no" width="100%"></iframe>
                        <div className={styles.timeLeft}>
                            <span>Event ends in:</span>
                            <TimeLeftCounter endDate={new Date(new Date().getTime() + 12 * 60000)} />
                        </div>
                    </div>
                    <div className={styles.desktopChat}>
                        <Chat />
                    </div>

                    <div className={styles.mobileCarousel}>
                        <Carousel 
                            emulateTouch={true} 
                            infiniteLoop={false} 
                            showArrows={false} 
                            autoPlay={false} 
                            showStatus={false} 
                            showIndicators={false} 
                            showThumbs={false} 
                            dynamicHeight={false}
                            selectedItem={currentSlide}
                            onChange={(index) => { updateCurrentSlide(index) }}
                        >
                            <div className={styles.carouselSlide}>
                                <Chat />
                            </div>
                            <div className={styles.carouselSlide}>
                                <BetPlaceContainer />
                            </div>
                            <div className={styles.carouselSlide}>
                                <div className={styles.headline} style={{ flexDirection: "row", display: "flex", marginBottom: "1rem", alignItems: "center" }}>
                                    <h2 style={{ fontSize: "16px", marginRight: "0.5rem" }}>🚀 Related Events</h2>
                                    <LiveBadge />
                                </div>
                                <div>
                                    <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                                    <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className={styles.columnRight}>
                    <div style={{ width: "100%", display: "flex", alignItems: "flex-end", flexDirection: "column", height: "100%" }}>
                        <div className={styles.logo}>
                            <img src={darkModeLogo} alt="Wallfair" />
                        </div>
                        <BetPlaceContainer />
                    </div>
                    <div className={styles.relatedEvents}>
                        <div className={styles.headline}>
                            <h2>🚀 Related Events</h2>
                            <LiveBadge />
                        </div>
                        <Carousel emulateTouch={true} infiniteLoop={true} showArrows={false} showStatus={false}>
                            <div className={styles.carouselSlide}>
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                            </div>
                            <div className={styles.carouselSlide}>
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                            </div>
                            <div className={styles.carouselSlide}>
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                                <RelatedEventCard title={'Who will win first round?'} organizer={'eSports Alliance JIB PUBG'} image={exampleEventImage} />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className={styles.mobileMenu}>
                <div className={styles.indicators}>
                    <span className={ currentSlide === 0 ? styles.active : '' } onClick={() => { setCurrentSlide(0) }}></span>
                    <span className={ currentSlide === 1 ? styles.active : '' } onClick={() => { setCurrentSlide(1) }}></span>
                    <span className={ currentSlide === 2 ? styles.active : '' } onClick={() => { setCurrentSlide(2) }}></span>
                </div>
            </div>
            {renderEventCreationButton()}
            <button className={styles.fixedChatButton} onClick={true}>
                <Icon iconType={IconType.chat} iconTheme={IconTheme.primary} />
            </button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        showPopup: (popupType) => {
            dispatch(PopupActions.show(popupType));
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(Bet);
