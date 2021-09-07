import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
import Icon from '../../components/Icon';
import Link from '../../components/Link';
import LiveBadge from 'components/LiveBadge';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import TimeLeftCounter from 'components/TimeLeftCounter';
import ViewerBadge from 'components/ViewerBadge';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import TwitchEmbedVideo from '../../components/TwitchEmbedVideo';
import BetView from '../../components/BetView';
import RelatedBetCard from '../../components/RelatedBetCard';
import MyBetCard from '../../components/MyBetCard';
import { useHistory } from 'react-router-dom';
import Chat from '../../components/Chat';
import classNames from 'classnames';
import { SwiperSlide, Swiper } from 'swiper/react';
import EventTradesContainer from '../../components/EventTradesContainer';
import EventTradeViewsHelper from '../../helper/EventTradeViewsHelper';
import State from '../../helper/State';
import { LOGGED_IN } from 'constants/AuthState';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PopupTheme from '../../components/Popup/PopupTheme';
import { BetActions } from 'store/actions/bet';
import { useBetPreviousLocation } from './hooks/useBetPreviousLocation';
import Chart from '../../components/Chart';
import { useChartData } from './hooks/useChartData';
import Placeholder from '../../components/Placeholder';

const Bet = ({
  showPopup,
  rawOutcomes,
  transactions,
  openBets,
  authState,
  setSelectedBet,
  events,
}) => {
  const { eventSlug, betSlug } = useParams();

  const [betId, setBetId] = useState(null);
  const history = useHistory();

  const [swiper, setSwiper] = useState(null);
  const [betAction, setBetAction] = useState(1);
  const [betViewIsOpen, setBetViewIsOpen] = useState(false);
  const [singleBet, setSingleBet] = useState(false);
  const [event, setEvent] = useState(null);
  const [relatedBets, setRelatedBets] = useState([]);

  const mobileChatRef = useRef(null);

  const currentFromLocation = useBetPreviousLocation();
  const {
    chartData,
    filterActive,
    handleChartPeriodFilter,
    handleChartDirectionFilter,
  } = useChartData(betId);

  const status = {
    active: 1,
    resolved: 2,
    closed: 3,
  };

  useEffect(() => {
    if (window.innerWidth < 992) {
      setBetAction(0);
    }

    setSingleBet(false);
    setBetViewIsOpen(false);

    const currentEvent = _.find(events, {
      slug: eventSlug,
    });

    const eventBets = [..._.get(currentEvent, 'bets', [])].sort(
      (a, b) => status[a.status] - status[b.status]
    );

    setEvent(currentEvent);
    setRelatedBets(eventBets);

    const currentBet = _.find(eventBets, {
      slug: betSlug,
    });
    const currentBetId = _.get(currentBet, '_id');
    setBetId(currentBetId);

    if (betSlug) {
      selectBet(currentBetId, betSlug);
    }

    if (eventBets.length === 1 && !singleBet) {
      const singleBet = _.get(eventBets, '[0]');
      const betId = _.get(singleBet, '_id');
      const betSlug = _.get(singleBet, 'slug');
      selectBet(betId, betSlug);
      setSingleBet(true);
    }
  }, [eventSlug]);

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slideTo(betAction);
    }
  }, [betAction]);

  const onBetClose = () => {
    return () => {
      const eventSlug = _.get(event, 'slug', null);

      history.push(
        Routes.getRouteWithParameters(Routes.bet, {
          eventSlug,
          betSlug: '',
        })
      );

      setBetViewIsOpen(false);
      onBetActionSwitch(1);
    };
  };

  const onSwiper = swiper => {
    setSwiper(swiper);
    swiper.slideTo(betAction);
  };

  const onBetActionSwitch = newIndex => {
    setBetAction(newIndex);
    if (newIndex === 0) {
      mobileChatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const selectBet = (betId, betSlug) => {
    history.push(
      Routes.getRouteWithParameters(Routes.bet, {
        eventSlug,
        betSlug,
      })
    );
    setBetId(betId);
    setBetViewIsOpen(true);
    setSelectedBet(null, betId);
  };

  const onBetClick = (bet, popup) => {
    return () => {
      const betId = _.get(bet, '_id');
      const betSlug = _.get(bet, 'slug');

      selectBet(betId, betSlug);
      setBetId(betId);

      if (popup) {
        setBetViewIsOpen(false);
        showPopup(PopupTheme.tradeView, { betId, eventId, openBets });
      }
    };
  };

  const getMyEventTrades = () => {
    const currentBets = _.map(openBets, openBet => {
      const betId = openBet.betId;
      const bet = State.getTradeByEvent(_.get(openBet, 'betId'), event);
      let outcomes = _.get(rawOutcomes, betId, {});

      if (outcomes) {
        const outcomeValues = _.get(outcomes, 'values', {});
        const amount = _.get(openBet, 'investmentAmount');
        outcomes = _.get(outcomeValues, amount, {});
      }

      return {
        ...openBet,
        outcomes,
        bet,
        event,
      };
    });

    return _.map([...transactions], transaction => {
      const betId = _.get(transaction, 'bet');
      const bet = State.getTradeByEvent(betId, event);
      const openBet = _.find(currentBets, {
        betId: betId,
      });

      if (bet) {
        return {
          ...transaction,
          event,
          bet,
          openBet,
        };
      }
    })
      .filter(Boolean)
      .sort((a, b) => status[a.bet.status] - status[b.bet.status]);
  };

  const renderNoTrades = () => {
    return <div className={styles.relatedBetsNone}>No trades placed.</div>;
  };

  const getRelatedBetSliderPages = (bets, size) => {
    return _.ceil(_.size(bets) / size);
  };

  const renderRelatedBetList = (popup = false) => {
    return _.map(relatedBets, (bet, index) => {
      return renderRelatedBetCard(bet, index, popup);
    });
  };

  const renderMyTradesList = (popup = false) => {
    const myEventTrades = getMyEventTrades();
    if (!isLoggedIn() || myEventTrades.length < 1) {
      return renderNoTrades();
    }
    return _.map(myEventTrades, (transaction, index) => {
      return renderMyBetCard(transaction, index, popup);
    });
  };

  const renderRelatedBetCard = (bet, index, popup) => {
    if (bet) {
      return (
        <RelatedBetCard
          key={index}
          bet={bet}
          onClick={onBetClick(bet, popup)}
        />
      );
    }

    return <div />;
  };

  const renderMyBetCard = (transaction, index, popup) => {
    if (transaction) {
      return (
        <MyBetCard
          key={index}
          transaction={transaction}
          onClick={onBetClick(transaction.bet, popup)}
        />
      );
    }

    return <div />;
  };

  const renderMyBetSliders = myEventTrades => {
    const size = getRelatedBetSliderPages(myEventTrades, 2);

    return _.map(_.range(0, size), (sliderPage, index) =>
      renderMyBetSlider(sliderPage, index, myEventTrades)
    );
  };

  const renderMyBetSlider = (pageIndex, index, myEventTrades) => {
    const indexes = [];
    const listLength = myEventTrades.length > 2 ? 2 : myEventTrades.length;

    for (let i = 0; i < listLength; i++) {
      indexes.push(pageIndex * 2 + i);
    }

    return (
      <div
        key={index}
        className={classNames(styles.carouselSlide, styles.relatedBetSlide)}
      >
        {renderMyBetCard(_.get(myEventTrades, '[' + indexes[0] + ']'))}
        {renderMyBetCard(_.get(myEventTrades, '[' + indexes[1] + ']'))}
      </div>
    );
  };

  const renderRelatedBetSliders = () => {
    const size = getRelatedBetSliderPages(relatedBets, 3);

    return _.map(_.range(0, size), (sliderPage, index) =>
      renderRelatedBetSlider(sliderPage, index)
    );
  };

  const renderRelatedBetSlider = (pageIndex, index) => {
    const indexes = [];
    const listLength = relatedBets.length > 3 ? 3 : relatedBets.length;

    for (let i = 0; i < listLength; i++) {
      indexes.push(pageIndex * 3 + i);
    }

    return (
      <div
        key={index}
        className={classNames(styles.carouselSlide, styles.relatedBetSlide)}
      >
        {renderRelatedBetCard(_.get(relatedBets, '[' + indexes[0] + ']'))}
        {renderRelatedBetCard(_.get(relatedBets, '[' + indexes[1] + ']'))}
        {renderRelatedBetCard(_.get(relatedBets, '[' + indexes[2] + ']'))}
      </div>
    );
  };

  const renderSwitchableView = () => {
    const eventViews = [
      EventTradeViewsHelper.getView('Chat', undefined, false, styles.chatTab),
      EventTradeViewsHelper.getView('Event Trades'),
      EventTradeViewsHelper.getView(
        'My Trades',
        isLoggedIn() ? getMyEventTrades().length : 0,
        true
      ),
    ];

    return (
      <EventTradesContainer
        className={styles.eventTradesContainer}
        fullWidth={false}
        eventViews={eventViews}
        currentIndex={betAction}
        setCurrentIndex={onBetActionSwitch}
      />
    );
  };

  const renderContent = () => {
    if (betAction === 0) {
      return <Chat className={styles.mobileChat} event={event} />;
    } else if (betAction === 1) {
      return (
        <div className={styles.relatedBets}>
          <Carousel
            className={classNames(
              styles.relatedBetsCarousel,
              relatedBets.length > 3 ? '' : styles.oneCarouselPage
            )}
            dynamicHeight={false}
            emulateTouch={true}
            infiniteLoop={true}
            autoPlay={false}
            showArrows={false}
            showStatus={false}
            interval={1e11}
          >
            {renderRelatedBetSliders()}
          </Carousel>
        </div>
      );
    }

    const myEventTrades = getMyEventTrades();

    if (!isLoggedIn() || myEventTrades.length < 1) {
      return renderNoTrades();
    }

    return (
      <div className={styles.relatedBets}>
        <Carousel
          className={classNames(
            styles.relatedBetsCarousel,
            myEventTrades.length > 2 ? '' : styles.oneCarouselPage
          )}
          dynamicHeight={false}
          emulateTouch={true}
          infiniteLoop={true}
          autoPlay={false}
          showArrows={false}
          showStatus={false}
          interval={1e11}
        >
          {renderMyBetSliders(myEventTrades)}
        </Carousel>
      </div>
    );
  };

  const renderMobileContent = () => {
    return (
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: false,
        }}
        autoHeight={true}
        onSlideChange={swiper => onBetActionSwitch(swiper.activeIndex)}
        onSwiper={onSwiper}
      >
        <SwiperSlide className={styles.carouselSlide}>
          <div ref={mobileChatRef}>
            <Chat event={event} className={styles.mobileChat} />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.carouselSlide}>
          <div>{renderRelatedBetList(true)}</div>
        </SwiperSlide>
        <SwiperSlide className={styles.carouselSlide}>
          <div>{renderMyTradesList(true)}</div>
        </SwiperSlide>
      </Swiper>
    );
  };

  const renderBetSidebarContent = () => {
    if (betViewIsOpen) {
      return (
        <div>
          {!singleBet && openBets.length > 0 && (
            <div className={styles.betViewClose} onClick={onBetClose()}>
              <Icon
                iconType={'arrowLeft'}
                iconTheme={'white'}
                className={styles.arrowBack}
              />
              <span>Go back to all tracks</span>
            </div>
          )}
          <div className={classNames({ [styles.betViewContent]: !singleBet })}>
            <BetView
              betId={betId}
              eventId={eventId}
              openBets={_.filter(openBets, { betId })}
              closed={false}
              showEventEnd={true}
              handleChartDirectionFilter={handleChartDirectionFilter}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        {renderSwitchableView()}
        <div className={styles.desktopCarousel}>{renderContent()}</div>
        <div className={styles.mobileCarousel}>{renderMobileContent()}</div>
      </div>
    );
  };

  if (!event) {
    return null;
  }

  return (
    <BaseContainerWithNavbar withPaddingTop={true} withoutPaddingBottom={true}>
      <div className={styles.bet}>
        <div className={styles.upperLeftOval}></div>
        <div className={styles.centeredBottomOval}></div>
        <div className={styles.headlineContainer}>
          <div>
            <Link
              to={currentFromLocation?.pathname}
              className={styles.linkBack}
            >
              <div className={styles.arrowBack}></div>
              <div className={styles.headline}>
                <h2>{_.get(event, 'name')}</h2>
                <div>
                  {event?.type === 'streamed' && <LiveBadge />}
                  <ViewerBadge viewers={1123} />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.columnLeft}>
            <div className={styles.streamContainer}>
              {event.type === 'non-streamed' ? (
                <div className={styles.chart}>
                  {betViewIsOpen ? (
                    <Chart
                      height={400}
                      data={chartData}
                      filterActive={filterActive}
                      handleChartPeriodFilter={handleChartPeriodFilter}
                    />
                  ) : (
                    <Placeholder style={{ height: '400px' }}>
                      <img src={event.previewImageUrl} alt="pic" />
                    </Placeholder>
                  )}
                </div>
              ) : (
                <TwitchEmbedVideo video={event.streamUrl} />
              )}
              {event.type === 'streamed' && (
                <div className={styles.timeLeft}>
                  <span>Estimated end:</span>
                  <TimeLeftCounter
                    endDate={new Date(_.get(event, 'endDate'))}
                  />
                </div>
              )}
            </div>
            <Chat className={styles.desktopChat} event={event} />
          </div>
          <div className={styles.columnRight}>{renderBetSidebarContent()}</div>
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};
const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    rawOutcomes: state.bet.outcomes,
    transactions: state.transaction.transactions,
    openBets: state.bet.openBets,
    events: state.event.events,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedBet: (eventId, betId) => {
      dispatch(BetActions.selectBet({ eventId, betId }));
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bet);
