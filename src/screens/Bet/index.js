import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
import FixedIconButton from '../../components/FixedIconButton';
import IconType from '../../components/Icon/IconType';
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
import { useParams, useLocation, Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import React from 'react';
import { LOGGED_IN } from 'constants/AuthState';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PopupTheme from '../../components/Popup/PopupTheme';
import { BetActions } from 'store/actions/bet';
import NavbarFooter from '../../components/NavbarFooter';
import NavbarFooterAction from '../../components/NavbarFooterAction';
import { useBetPreviousLocation } from './hooks/useBetPreviousLocation';
import { useIsMount } from 'components/hoc/useIsMount';
import Chart from '../../components/Chart';

const Bet = ({
  showPopup,
  rawOutcomes,
  transactions,
  openBets,
  authState,
  setSelectedBet,
  events,
}) => {
  const { eventId, betId } = useParams();
  const history = useHistory();

  const [swiper, setSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [betAction, setBetAction] = useState(0);
  const [activeBetId, setActiveBetId] = useState(betId || null);
  const [betViewIsOpen, setBetViewIsOpen] = useState(false);
  const [mobileCommentIsOpen, setMobileCommentIsOpen] = useState(false);
  const [singleBet, setSingleBet] = useState(false);
  const [event, setEvent] = useState(null);
  const [relatedBets, setRelatedBets] = useState([]);

  const bottomScroll = useRef(null);

  const currentFromLocation = useBetPreviousLocation();
  const isMount = useIsMount();

  const status = {
    active: 1,
    resolved: 2,
    closed: 3,
  };

  useEffect(() => {
    const currentEvent = _.find(events, {
      _id: eventId,
    });
    const eventBets = [..._.get(currentEvent, 'bets', [])].sort(
      (a, b) => status[a.status] - status[b.status]
    );

    setEvent(currentEvent);
    setRelatedBets(eventBets);

    if (eventBets.length === 1 && !singleBet) {
      const betId = _.get(_.get(eventBets, '[0]'), '_id');
      selectBet(betId);
      setSingleBet(true);
    }
  }, []);

  const moveToSlide = index => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const onChatButtonClick = () => {
    setMobileCommentIsOpen(!mobileCommentIsOpen);
    moveToSlide(0);
    if (!mobileCommentIsOpen) {
      bottomScroll.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderChatButton = () => {
    if (currentSlide != 0) return null;
    return (
      <FixedIconButton
        className={styles.fixedChatButton}
        onClick={() => onChatButtonClick()}
        iconType={mobileCommentIsOpen ? IconType.cross : IconType.chat}
        showHighlight={!mobileCommentIsOpen}
      />
    );
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

  const getRelatedBetSliderPages = (bets, size) => {
    return _.ceil(_.size(bets) / size);
  };

  const renderRelatedBetList = (popup = false) => {
    return _.map(relatedBets, (bet, index) => {
      return renderRelatedBetCard(bet, index, popup);
    });
  };

  const renderMyTradesList = (popup = false) => {
    return _.map(getMyEventTrades(), (transaction, index) => {
      return renderMyBetCard(transaction, index, popup);
    });
  };

  const selectBet = betId => {
    // const eventId = _.get(event, '_id', null);

    history.push(
      Routes.getRouteWithParameters(Routes.bet, {
        eventId,
        betId,
      })
    );

    setActiveBetId(betId);
    setBetViewIsOpen(true);
    setSelectedBet(null, betId);
  };

  const onBetClick = (betId, popup) => {
    return () => {
      selectBet(betId);
      if (popup) {
        showPopup(PopupTheme.tradeView, {});
      }
    };
  };

  const renderRelatedBetCard = (bet, index, popup) => {
    if (bet) {
      const betId = _.get(bet, '_id');

      return (
        <RelatedBetCard
          key={index}
          bet={bet}
          onClick={onBetClick(betId, popup)}
        />
      );
    }

    return <div />;
  };

  const renderMyBetCard = (transaction, index, popup) => {
    if (transaction) {
      const betId = _.get(transaction.bet, '_id');

      return (
        <MyBetCard
          key={index}
          transaction={transaction}
          onClick={onBetClick(betId, popup)}
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

  const renderBetSidebarContent = () => {
    if (betViewIsOpen) {
      return (
        <div>
          <div className={styles.betViewClose} onClick={onBetClose()}>
            <Icon
              iconType={'arrowLeft'}
              iconTheme={'white'}
              className={styles.arrowBack}
            />
            <span>Go back to all tracks</span>
          </div>
          <div className={styles.betViewContent}>
            <BetView closed={false} showEventEnd={true} />
          </div>
        </div>
      );
    }

    return (
      <div>
        {renderSwitchableView()}
        <div className={styles.contentContainer}>{renderContent()}</div>
      </div>
    );
  };

  const onBetActionSwitch = newIndex => {
    setBetAction(newIndex);
  };

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const renderSwitchableView = () => {
    const eventViews = [
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
      return <div className={styles.relatedBetsNone}>No trades placed.</div>;
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

  const onBetClose = () => {
    return () => {
      const eventId = _.get(event, '_id', null);

      history.push(
        Routes.getRouteWithParameters(Routes.bet, {
          eventId,
          betId: '',
        })
      );

      setActiveBetId(null);
      setBetViewIsOpen(false);
    };
  };

  const renderMobileMenuIndicator = index => {
    return (
      <span
        className={currentSlide === index ? styles.active : ''}
        onClick={() => {
          setCurrentSlide(index);
        }}
      ></span>
    );
  };

  const setSlide = index => {
    if (index !== 0 && mobileCommentIsOpen) {
      setMobileCommentIsOpen(false);
    }

    setCurrentSlide(index);
  };

  const getActiveNavbarClass = index => {
    return currentSlide === index ? styles.navbarItemActive : null;
  };

  const renderNavbar = () => {
    return (
      <NavbarFooter
        className={classNames(
          styles.betNavbar,
          mobileCommentIsOpen ? styles.betNavbarHidden : null
        )}
      >
        <NavbarFooterAction
          iconType={IconType.chat2}
          text="Chat"
          className={classNames(styles.navbarItem, getActiveNavbarClass(0))}
          onClick={() => moveToSlide(0)}
        />
        <NavbarFooterAction
          iconType={IconType.bet2}
          text="Event Trades"
          className={classNames(
            styles.navbarItem,
            styles.navbarItemWithBorder,
            getActiveNavbarClass(1)
          )}
          onClick={() => moveToSlide(1)}
        />
        <NavbarFooterAction
          iconType={IconType.bet2}
          text="My Trades"
          className={(styles.navbarItem, getActiveNavbarClass(2))}
          onClick={() => moveToSlide(2)}
        />
      </NavbarFooter>
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
              className={styles.arrowBack}
            ></Link>
            <div className={styles.headline}>
              <h2>{_.get(event, 'name')}</h2>
              <div>
                <LiveBadge />
                <ViewerBadge viewers={1123} />
              </div>
            </div>
          </div>
        </div>
        <Chart />
        <div className={styles.row}>
          <div className={styles.columnLeft}>
            <div className={styles.streamContainer}>
              <TwitchEmbedVideo video={event.streamUrl} />
              <div className={styles.timeLeft}>
                <span>Estimated end:</span>
                <TimeLeftCounter endDate={new Date(_.get(event, 'endDate'))} />
              </div>
            </div>
            <Chat className={styles.desktopChat} event={event} />
          </div>
          <div className={styles.columnRight}>{renderBetSidebarContent()}</div>
        </div>
        <div className={styles.mobileCarousel}>
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: false,
            }}
            autoHeight={true}
            onSlideChange={swiper => setSlide(swiper.activeIndex)}
            onSwiper={setSwiper}
          >
            <SwiperSlide className={styles.carouselSlide}>
              <Chat
                event={event}
                className={styles.mobileChat}
                hideInput={!mobileCommentIsOpen}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.carouselSlide}>
              <div>{renderRelatedBetList(true)}</div>
            </SwiperSlide>
            <SwiperSlide className={styles.carouselSlide}>
              <div>{renderMyTradesList(true)}</div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={styles.mobileMenu}>
          <div className={styles.indicators}>
            {renderMobileMenuIndicator(0)}
            {renderMobileMenuIndicator(1)}
            {renderMobileMenuIndicator(2)}
          </div>
        </div>
        {renderChatButton()}
        {renderNavbar()}
      </div>
      <div ref={bottomScroll} />
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
