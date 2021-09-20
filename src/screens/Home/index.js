import styles from './styles.module.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import Header from '../../components/Header/index';
import EventsCarouselContainer from '../../components/EventsCarouselContainer';
import Leaderboard from '../../components/Leaderboard';
import CategoryList from '../../components/CategoryList';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';
import { Link, useParams } from 'react-router-dom';
import { LeaderboardActions } from '../../store/actions/leaderboard';
import { EventActions } from 'store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import { useEffect } from 'react';
import Routes from 'constants/Routes';
import ContentFooter from '../../components/ContentFooter';
import { PopupActions } from '../../store/actions/popup';
import State from '../../helper/State';
import { select } from 'redux-saga/effects';

const Home = ({ tags, openDrawer, fetchTags, showPopup, events, users }) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();

  const renderBetApprovePopup = () => {
    if (isMount) {
      if (eventId && betId && tradeId) {
        const event = State.getEventByTrade(betId, events);
        const bet = State.getTradeByEvent(betId, event);
        const trade = State.getTrade(tradeId, events);

        console.log('###bet', bet);
        console.log('###event', event);
        console.log('###trade', trade);
        //
        // const user = State.getUser(userId, users);

        const options = {
          eventId: eventId,
          betId: betId,
          tradeId: tradeId,
          data: {
            bet: {},
            trade: {},
          },
        };

        console.log('options', options);

        showPopup('betApprove', options);
      }
    }
  };

  useEffect(() => {
    if (isMount) {
      fetchTags();
      renderBetApprovePopup();
    }
  }, []);

  const renderHeadline = () => {
    return (
      <div className={styles.mainHeadline}>
        <h1>
          Decentralized Events
          <br />
          Anywhere, Anytime
        </h1>
        <div className={styles.slogan}>
          Be<span>.</span>The<span>.</span>House<span>.</span>
        </div>
      </div>
    );
  };

  const onSeeLeaderboard = () => {
    window.scrollTo(0, 0);
    openDrawer();
  };

  const renderTags = () => {
    return (
      <div className={styles.tags}>
        {tags &&
          tags.map((tag, index) => {
            return (
              <div key={index} className={styles.tag}>
                #{tag}
              </div>
            );
          })}
      </div>
    );
  };

  const renderRosiBanner = () => {
    return (
      <Link to={Routes.rosiGame}>
        <div className={styles.banner}>
          <div className={styles.title}>
            Play the
            <br />
            Rosi Game
          </div>
        </div>
      </Link>
    );
  };

  const renderCategoriesAndLeaderboard = () => {
    return (
      <div className={styles.bottomWrapper}>
        <div className={styles.categories}>
          <div className={styles.headline}>Discover Categories</div>
          <CategoryList categories={EVENT_CATEGORIES} />
          {renderTags()}
        </div>
        <div className={styles.leaderboard}>
          <div className={styles.headline}>
            Community Leaderboard
            <div className={styles.leaderboardLink} onClick={onSeeLeaderboard}>
              See Leaderboard
            </div>
          </div>
          <Leaderboard fetch={true} small={true} />
        </div>
      </div>
    );
  };

  return (
    <BaseContainerWithNavbar>
      {renderHeadline()}
      <Header />
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <EventsCarouselContainer eventType="streamed" />
          <EventsCarouselContainer eventType="non-streamed" />
          {renderRosiBanner()}
          {renderCategoriesAndLeaderboard()}
          <ContentFooter />
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.event.tags,
    events: state.event.events,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDrawer: () => {
      dispatch(LeaderboardActions.handleDrawer({ open: true }));
    },
    fetchTags: () => {
      dispatch(EventActions.fetchTags());
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
