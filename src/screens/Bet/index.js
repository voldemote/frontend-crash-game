import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _                            from 'lodash';
import darkModeLogo                 from '../../data/images/logo-demo.svg';
import FixedIconButton              from '../../components/FixedIconButton';
import IconType                     from '../../components/Icon/IconType';
import Icon                         from '../../components/Icon';
import Link                         from '../../components/Link';
import LiveBadge                    from 'components/LiveBadge';
import Routes                       from '../../constants/Routes';
import styles                       from './styles.module.scss';
import TimeLeftCounter              from 'components/TimeLeftCounter';
import ViewerBadge                  from 'components/ViewerBadge';
import { Carousel }                 from 'react-responsive-carousel';
import { connect }                  from 'react-redux';
import { PopupActions }             from '../../store/actions/popup';
import { useParams }                from 'react-router-dom';
import { useSelector }              from 'react-redux';
import { useState }                 from 'react';
import TwitchEmbedVideo             from '../../components/TwitchEmbedVideo';
import BetView                      from '../../components/BetView';
import RelatedBetCard               from '../../components/RelatedBetCard';
import MyBetCard                    from '../../components/MyBetCard';
import { useHistory }               from 'react-router-dom';
import Chat                         from '../../components/Chat';
import classNames                   from 'classnames';
import FixedEventCreationIconButton from '../../components/FixedEventCreationIconButton';
import { SwiperSlide, Swiper }      from 'swiper/react';
import EventTradesContainer         from '../../components/EventTradesContainer';
import EventTradeViewsHelper        from '../../helper/EventTradeViewsHelper';
import State                        from '../../helper/State';
import React                        from 'react';
import { LOGGED_IN }                from 'constants/AuthState';
import BaseContainerWithNavbar      from 'components/BaseContainerWithNavbar';

const Bet = ({ showPopup, rawOutcomes, transactions, openBets, authState }) => {
          const history                            = useHistory();
          const [swiper, setSwiper]                = useState(null);
          const { eventId, betId }                 = useParams();
          const [currentSlide, setCurrentSlide]    = useState(0);
          const [betAction, setBetAction]          = useState(0);
          const [activeBetId, setActiveBetId]      = useState(betId || null);
          const [betViewIsOpen, setBetViewIsOpen]  = useState(false);

          const status = {
            'active': 1,
            'resolved': 2,
            'closed': 3
        };

          const event = useSelector(
            (state) => _.find(
                state.event.events,
                {
                    _id: eventId,
                },
            ),
        );

          const moveToSlide = (index) => {
              if (swiper) {
                  swiper.slideTo(index);
              }
          };

          const renderChatButton = () => {
              return (
                  <FixedIconButton
                      className={styles.fixedChatButton}
                      onClick={() => moveToSlide(1)}
                      iconType={IconType.chat}
                      left={true}
                  />
              );
          };

          const renderEventCreationButton = () => {
              return (
                  <FixedEventCreationIconButton
                      eventId={eventId}
                  />
              );
          };

          const getMyEventTrades = () => {
            const currentBets = _.map(
                openBets,
                (openBet) => {
                    const betId  = openBet.betId;
                    const bet    = State.getTradeByEvent(_.get(openBet, 'betId'), event);
                    let outcomes = _.get(
                        rawOutcomes,
                        betId,
                        {},
                    );
        
                    if (outcomes) {
                        const outcomeValues = _.get(outcomes, 'values', {});
                        const amount        = _.get(openBet, 'investmentAmount');
                        outcomes            = _.get(
                            outcomeValues,
                            amount,
                            {},
                        );
                    }
        
                    return {
                        ...openBet,
                        outcomes,
                        bet,
                        event,
                    };
                },
            );

             
            return _.map(
                [...transactions],
                (transaction) => {
                    const betId = _.get(transaction, 'bet');
                    const bet   = State.getTradeByEvent(betId, event);
                    const openBet = _.find(
                        currentBets,
                        {
                            betId: betId,
                        },
                    )
                    
                    if(bet) {
                        return {
                            ...transaction,
                            event,
                            bet,
                            openBet
                        };
                    }
                },
            ).filter(Boolean).sort((a, b) => status[a.bet.status] - status[b.bet.status]);
          };

          const getRelatedBets = () => {
              return [..._.get(event, 'bets', [])].sort((a, b) => status[a.status] - status[b.status]);
          };

          const getRelatedBetSliderPages = (bets, size) => {
              return _.ceil(_.size(bets) / size);
          };

          const renderRelatedBetList = () => {
              return _.map(
                  getRelatedBets(),
                  (bet, index) => {
                      return renderRelatedBetCard(bet, index);
                  },
              );
          };

          const onBetClick = (betId) => {
              return () => {
                  const eventId = _.get(event, '_id', null);

                  history.push(Routes.getRouteWithParameters(
                      Routes.bet,
                      {
                          eventId,
                          betId,
                      },
                  ));

                  setActiveBetId(betId);
                  setBetViewIsOpen(true);
              };
          };

          const renderRelatedBetCard = (bet, index) => {
              if (bet) {
                  const betId = _.get(bet, '_id');

                  return (
                      <RelatedBetCard
                          key={index}
                          bet={bet}
                          onClick={onBetClick(betId)}
                      />
                  );
              }

              return <div />;
          };

          const renderMyBetCard = (transaction, index) => {
            if (transaction) {
                const betId = _.get(transaction.bet, '_id');

                return (
                    <MyBetCard
                        key={index}
                        transaction={transaction}
                        onClick={onBetClick(betId)}
                    />
                );
            }

            return <div />;
        };

          const renderRelatedBetSliders = (relatedBets) => {
              const size = getRelatedBetSliderPages(relatedBets, 3);

              return _.map(
                  _.range(0, size),
                  (sliderPage, index) => renderRelatedBetSlider(sliderPage, index, relatedBets),
              );
          };

          const renderMyBetSliders = (myEventTrades) => {
            const size = getRelatedBetSliderPages(myEventTrades, 2);

            return _.map(
                _.range(0, size),
                (sliderPage, index) => renderMyBetSlider(sliderPage, index, myEventTrades),
            );
          }

          const renderMyBetSlider = (pageIndex, index, myEventTrades) => {
            const indexes = [];
            const listLength = myEventTrades.length > 2 ? 2 : myEventTrades.length;

            for(let i=0; i<listLength; i++) {
              indexes.push(pageIndex * 2 + i);
            }

            return (
                <div
                    key={index}
                    className={classNames(
                        styles.carouselSlide,
                        styles.relatedBetSlide,
                    )}
                >
                    {renderMyBetCard(
                        _.get(
                            myEventTrades,
                            '[' + indexes[0] + ']',
                        ),
                    )}
                    {renderMyBetCard(
                        _.get(
                            myEventTrades,
                            '[' + indexes[1] + ']',
                        ),
                    )}
                </div>
            );
        };

          const renderRelatedBetSlider = (pageIndex, index, relatedBets) => {
              const indexes = [];
              const listLength = relatedBets.length > 3 ? 3 : relatedBets.length;

              for(let i=0; i<listLength; i++) {
                indexes.push(pageIndex * 3 + i);
              }

              return (
                  <div
                      key={index}
                      className={classNames(
                          styles.carouselSlide,
                          styles.relatedBetSlide,
                      )}
                  >
                      {renderRelatedBetCard(
                          _.get(
                              relatedBets,
                              '[' + indexes[0] + ']',
                          ),
                      )}
                      {renderRelatedBetCard(
                          _.get(
                              relatedBets,
                              '[' + indexes[1] + ']',
                          ),
                      )}
                      {renderRelatedBetCard(
                          _.get(
                              relatedBets,
                              '[' + indexes[2] + ']',
                          ),
                      )}
                  </div>
              );
          };

          const renderBetSidebarContent = () => {
            if(betViewIsOpen) {
                return (
                    <div>
                        <div 
                            className={styles.betViewClose} 
                            onClick={onBetClose()}
                        >
                            <Icon iconType={'arrowLeft'} iconTheme={'white'} className={styles.arrowBack}/>
                            <span>Go back to all tracks</span>
                        </div>
                        <div className={styles.betViewContent}>
                            <BetView
                                closed={false}
                                showEventEnd={true}
                            />
                        </div>
                    </div>
                );
            }

            return (
                <div>
                    {renderSwitchableView()}
                    <div className={styles.contentContainer}>
                        {renderContent()}
                    </div>
                </div>
            );
        }        

        const onBetActionSwitch = (newIndex) => {
            setBetAction(newIndex);
        };

        const isLoggedIn = () => {
            return authState === LOGGED_IN;
        }

        const renderSwitchableView = () => {
            
            
            const eventViews = [
                EventTradeViewsHelper.getView(
                    'Event Trades',
                ),
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
                const relatedBets = getRelatedBets();
                return (
                    <div className={styles.relatedBets}>
                        <Carousel
                            className={classNames(
                                styles.relatedBetsCarousel,
                                relatedBets.length > 3 ? '' : styles.oneCarouselPage,
                            )}
                            dynamicHeight={false}
                            emulateTouch={true}
                            infiniteLoop={true}
                            autoPlay={false}
                            showArrows={false}
                            showStatus={false}
                            interval={1e11}
                        >
                            {renderRelatedBetSliders(relatedBets)}
                        </Carousel>
                    </div>
                );
            }

            const myEventTrades = getMyEventTrades();

            if(!isLoggedIn() || myEventTrades.length < 1) {
                return (
                    <div className={styles.relatedBetsNone}>
                        No trades placed.
                    </div>
                )
            }

            return (
                <div className={styles.relatedBets}>
                    <Carousel
                        className={classNames(
                            styles.relatedBetsCarousel,
                            myEventTrades.length > 2 ? '' : styles.oneCarouselPage,
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
            )
        };

        const onBetClose = () => {
            return () => {
                const eventId = _.get(event, '_id', null);

                history.push(Routes.getRouteWithParameters(
                    Routes.bet,
                    {
                        eventId,
                        betId: '',
                    },
                ));

                setActiveBetId(null);
                setBetViewIsOpen(false);
            };
          }

          const renderMobileMenuIndicator = (index) => {
              return (
                  <span
                      className={currentSlide === index ? styles.active : ''}
                      onClick={() => {
                          setCurrentSlide(index);
                      }}
                  >
                  </span>
              );
          };

          if (!event) {
              return null;
          }

          return (

              <BaseContainerWithNavbar 
                withPaddingTop={true}
                withoutPaddingBottom={true}
              >
                <div className={styles.bet}>
                  <div className={styles.upperLeftOval}>
                  </div>
                  <div className={styles.centeredBottomOval}>
                  </div>
                  <div className={styles.headlineContainer}>
                      <div>
                          <Link
                              to={Routes.home}
                              className={styles.arrowBack}
                          >
                          </Link>
                          <div className={styles.headline}>
                              <h1>
                                  {_.get(event, 'name')}
                              </h1>
                              <div>
                                  <LiveBadge />
                                  <ViewerBadge viewers={1123} />
                              </div>
                          </div>
                      </div>
                      <div className={styles.logo}>
                          <div>
                              <img
                                  src={darkModeLogo}
                                  alt="Wallfair"
                              />
                          </div>
                      </div>
                  </div>
                  <div className={styles.row}>
                      <div className={styles.columnLeft}>
                          <div className={styles.streamContainer}>
                              <TwitchEmbedVideo
                                  video={event.streamUrl}
                              />
                              <div className={styles.timeLeft}>
                                  <span>
                                      End of Event:
                                  </span>
                                  <TimeLeftCounter endDate={new Date(_.get(event, 'endDate'))} />
                              </div>
                          </div>
                          <Chat
                              className={styles.desktopChat}
                              event={event}
                          />
                          <div className={styles.mobileCarousel}>
                              <Swiper
                                  slidesPerView={1}
                                  pagination={{
                                      'clickable': false,
                                  }}
                                  autoHeight={true}
                                  onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                                  onSwiper={setSwiper}
                              >
                                  <SwiperSlide className={styles.carouselSlide}>
                                      <BetView
                                          closed={false}
                                          showEventEnd={true}
                                      />
                                  </SwiperSlide>
                                  <SwiperSlide className={styles.carouselSlide}>
                                      <Chat
                                          event={event}
                                          className={styles.mobileChat}
                                      />
                                  </SwiperSlide>
                                  <SwiperSlide className={styles.carouselSlide}>
                                      <div
                                          className={styles.headline}
                                          style={{ flexDirection: 'row', display: 'flex', marginBottom: '1rem', alignItems: 'center' }}
                                      >
                                          <h2 style={{ fontSize: '16px', marginRight: '0.5rem' }}>🚀 Related Bets</h2>
                                          <LiveBadge />
                                      </div>
                                      <div>
                                          {renderRelatedBetList()}
                                      </div>
                                  </SwiperSlide>
                              </Swiper>
                          </div>
                      </div>
                      <div className={styles.columnRight}>
                          {renderBetSidebarContent()}
                      </div>
                  </div>
                  <div className={styles.mobileMenu}>
                      <div className={styles.indicators}>
                          {renderMobileMenuIndicator(0)}
                          {renderMobileMenuIndicator(1)}
                          {renderMobileMenuIndicator(2)}
                      </div>
                  </div>
                  {renderEventCreationButton()}
                  {renderChatButton()}
                </div>
              </BaseContainerWithNavbar>
          );
      }
;

const mapStateToProps = (state) => {
    return {
        authState: state.authentication.authState,
        rawOutcomes: state.bet.outcomes,
        transactions: state.transaction.transactions,
        openBets: state.bet.openBets
    };
};

const mapDispatchToProps = (dispatch) => {
          return {
              showPopup: (popupType) => {
                  dispatch(PopupActions.show(popupType));
              },
          };
      }
;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Bet);