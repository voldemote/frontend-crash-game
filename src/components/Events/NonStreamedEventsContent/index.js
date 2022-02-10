import _ from 'lodash';
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import CategoryList from '../../CategoryList';
import { useMappedActions } from '../hooks/useMappedActions';
import { useRouteHandling } from '../hooks/useRouteHandling';
import ContentFooter from 'components/ContentFooter';
import AdminOnly from 'components/AdminOnly';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import classNames from 'classnames';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import BetCard from '../../BetCard';

import { EventActions } from '../../../store/actions/event';
import StatusTabs from './StatusTabs';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import { OnboardingActions } from 'store/actions/onboarding';
import { LOGGED_IN } from 'constants/AuthState';
import { getMarketEvents } from 'api';

const NonStreamedEventsContent = ({
  categories,
  setCategories,
  showPopup,
  userId,
  token,
  bookmarkEvent,
  bookmarkEventCancel,
  startOnboarding,
  authState,
}) => {
  const eventType = 'non-streamed';

  const { location, category: encodedCategory } = useRouteHandling(eventType);
  const category = decodeURIComponent(encodedCategory);

  const [status, setStatus] = useState('current');
  const [events, setEvents] = useState([]);

  const handleSelectCategory = useCallback(
    value => {
      console.log(value);
      const updatedCats = categories.map(cat => ({
        ...cat,
        isActive: true,
      }));

      setCategories(updatedCats);
    },
    [setCategories]
  );

  const mappedCategories = _.map(categories, c => {
    return {
      ...c,
      disabled: false,
    };
  });

  useEffect(() => {
    handleSelectCategory(category);
    getMarketEvents(
      category,
      status === 'current'
        ? ['ACTIVE']
        : ['RESOLVED', 'CANCELLED', 'CLOSED', 'WAITING_RESOLUTION', 'DISPUTED']
    ).then(res => {
      setEvents(res);
    });
  }, [category, status]);

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation, {
      type: eventType,
    });
  }, []);

  const showJoinPopup = useCallback(event => {
    startOnboarding();
  }, []);

  return (
    <>
      <section className={styles.title}>
        <span>Events</span>
        <Icon
          className={styles.questionIcon}
          iconType={IconType.question}
          iconTheme={IconTheme.white}
          height={25}
          width={25}
          onClick={handleHelpClick}
        />
        <span onClick={handleHelpClick} className={styles.howtoLink}>
          How does it work?
        </span>
      </section>
      <section className={styles.header}>
        <div className={styles.categories}>
          <CategoryList
            eventType={eventType}
            categories={mappedCategories}
            handleSelect={handleSelectCategory}
          />
        </div>
      </section>

      <section className={classNames([styles.main, styles.notStreamed])}>
        <StatusTabs onSelect={setStatus} />
        {authState === LOGGED_IN && (
          <div
            className={styles.newEventLink}
            onClick={() => showPopup(PopupTheme.newEvent, { eventType })}
          >
            <Icon
              className={styles.newEventIcon}
              iconType={IconType.addYellow}
              iconTheme={IconTheme.white}
              height={25}
              width={25}
            />
            <span>New Event</span>
          </div>
        )}

        <div className={styles.nonStreamed}>
          {events.map(item => (
            <Link
              className={styles.betLinkWrapper}
              to={{
                pathname: `/trade/${item.slug}/${item.bet.slug}`,
                state: { fromLocation: location },
              }}
              key={item.bet.id}
            >
              <BetCard
                item={item.bet}
                key={item.id}
                betId={item.bet.id}
                title={item.bet.market_question}
                organizer={''}
                viewers={12345}
                state={item.bet.status}
                tags={item.tags}
                image={item.preview_image_url}
                eventEnd={item.bet.end_date}
                category={item.category}
                isBookmarked={!!item?.bookmarks?.includes(userId)}
                onBookmark={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!userId) {
                    return showJoinPopup(e);
                  }
                  bookmarkEvent(item.id);
                }}
                onBookmarkCancel={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  bookmarkEventCancel(item.id);
                }}
              />
            </Link>
          ))}
        </div>
      </section>
      {/* <ContentFooter /> */}
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    bookmarkEvent: eventId => {
      dispatch(EventActions.bookmarkEvent({ eventId }));
    },
    bookmarkEventCancel: eventId => {
      dispatch(EventActions.bookmarkEventCancel({ eventId }));
    },
    startOnboarding: () => {
      dispatch(OnboardingActions.start());
    },
  };
};

function mapStateToProps(state) {
  return {
    authState: state.authentication.authState,
    userId: state.authentication.userId,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonStreamedEventsContent);
