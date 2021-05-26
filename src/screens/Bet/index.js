import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _                from 'lodash';
import Chat             from 'components/Chat';
import darkModeLogo     from '../../data/images/logo-darkmode.svg';
import FixedIconButton  from '../../components/FixedIconButton';
import Icon             from '../../components/Icon';
import IconTheme        from '../../components/Icon/IconTheme';
import IconType         from '../../components/Icon/IconType';
import Link             from '../../components/Link';
import LiveBadge        from 'components/LiveBadge';
import PopupTheme       from '../../components/Popup/PopupTheme';
import Routes           from '../../constants/Routes';
import styles           from './styles.module.scss';
import TimeLeftCounter  from 'components/TimeLeftCounter';
import ViewerBadge      from 'components/ViewerBadge';
import { Carousel }     from 'react-responsive-carousel';
import { connect }      from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useParams }    from 'react-router-dom';
import { useSelector }  from 'react-redux';
import { useState }     from 'react';
import TwitchEmbedVideo from '../../components/TwitchEmbedVideo';
import BetView          from '../../components/BetView';
import RelatedBetCard   from '../../components/RelatedBetCard';
import { useHistory }   from 'react-router-dom';

const Bet = ({ showPopup }) => {
          const history                         = useHistory();
          const { eventId, betId }              = useParams();
          const exampleEventImage               = 'https://media-cdn.tripadvisor.com/media/photo-s/0e/85/8d/53/red-bull-flugtag-event.jpg';
          const [currentSlide, setCurrentSlide] = useState(0);
          const event                           = useSelector(
              (state) => _.find(
                  state.event.events,
                  {
                      _id: eventId,
                  },
              ),
          );
          const bet                             = useSelector(
              () => _.find(
                  event ? event.bets : [],
                  {
                      _id: betId,
                  },
              ),
          );

          const updateCurrentSlide = (index) => {
              if (currentSlide !== index) {
                  setCurrentSlide(index);
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

          const getRelatedBets = () => {
              return _.get(event, 'bets', []);
          };

          const getRelatedBetSliderPages = () => {
              return _.ceil(_.size(getRelatedBets()) / 2);
          };

          const renderRelatedBetList = () => {
              return _.map(
                  getRelatedBets(),
                  (bet) => {
                      return renderRelatedBetCard(bet);
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
              };
          };

          const renderRelatedBetCard = (bet) => {
              if (bet) {
                  const betId = _.get(bet, '_id');

                  return (
                      <RelatedBetCard
                          title={bet.marketQuestion}
                          userId={bet.creator}
                          image={event.previewImageUrl}
                          onClick={onBetClick(betId)}
                      />
                  );
              }

              return null;
          };

          const renderRelatedBetSliders = () => {
              const size = getRelatedBetSliderPages();

              return _.map(
                  _.range(0, size),
                  (sliderPage) => renderRelatedBetSlider(sliderPage + 1),
              );
          };

          const renderRelatedBetSlider = (index) => {
              const bets        = getRelatedBets();
              const firstIndex  = index * 1;
              const secondIndex = index * 2;

              return (
                  <div className={styles.carouselSlide}>
                      {renderRelatedBetCard(
                          _.get(
                              bets,
                              '[' + firstIndex + ']',
                          ),
                      )}
                      {renderRelatedBetCard(
                          _.get(
                              bets,
                              '[' + secondIndex + ']',
                          ),
                      )}
                  </div>
              );
          };

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

          return (
              <div className={styles.bet}>
                  <div className={styles.row}>
                      <div className={styles.columnLeft}>
                          <div className={styles.headlineContainer}>
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
                          <div style={{ height: '100%', flex: 'initial' }}>
                              <TwitchEmbedVideo
                                  video={'https://www.twitch.tv/esl_csgo'}
                                  channel={'esl_csgo'}
                              />
                              <div className={styles.timeLeft}>
                                  <span>
                                      Event ends in:
                                  </span>
                                  <TimeLeftCounter endDate={_.get(event, 'date')} />
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
                                  dynamicHeight={true}
                                  selectedItem={currentSlide}
                                  onChange={(index) => {
                                      updateCurrentSlide(index);
                                  }}
                              >
                                  <div className={styles.carouselSlide}>
                                      <Chat />
                                  </div>
                                  <div className={styles.carouselSlide}>
                                      <BetView closed={false} />
                                  </div>
                                  <div className={styles.carouselSlide}>
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
                                  </div>
                              </Carousel>
                          </div>
                      </div>
                      <div className={styles.columnRight}>
                          <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', flexDirection: 'column', height: '100%' }}>
                              <div className={styles.logo}>
                                  <img
                                      src={darkModeLogo}
                                      alt="Wallfair"
                                  />
                              </div>
                              <BetView closed={false} />
                          </div>
                          <div className={styles.relatedBets}>
                              <div className={styles.headline}>
                                  <h2>🚀 Related Bets</h2>
                                  <LiveBadge />
                              </div>
                              <Carousel
                                  className={styles.relatedBetsCarousel}
                                  dynamicHeight={true}
                                  emulateTouch={true}
                                  infiniteLoop={true}
                                  showArrows={false}
                                  showStatus={false}
                              >
                                  {renderRelatedBetSliders()}
                              </Carousel>
                          </div>
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
                  <button
                      className={styles.fixedChatButton}
                  >
                      <Icon
                          iconType={IconType.chat}
                          iconTheme={IconTheme.primary}
                      />
                  </button>
              </div>
          );
      }
;

const mapDispatchToProps = (dispatch) => {
          return {
              showPopup: (popupType) => {
                  dispatch(PopupActions.show(popupType));
              },
          };
      }
;

export default connect(
    null,
    mapDispatchToProps,
)(Bet);
