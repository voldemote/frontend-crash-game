import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { OnboardingActions } from 'store/actions/onboarding';
import { dataLayerPush, trackWalletAddWfair } from 'config/gtm';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import { GeneralActions } from 'store/actions/general';
import authState from 'constants/AuthState';
import Routes from 'constants/Routes';

const CustomCarousel = ({loggedIn, showWalletDepositPopup, handleKycInfoVisible, setOpenDrawer, userId, showPopup}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const carouselLinks = [
      'create-events',
      'fun-events',
      'bonus',
  ];

  const onClickItem = itemIndex => {
    switch(carouselLinks[itemIndex]) {
      case 'create-events':
        if (loggedIn) {
          history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));
          showPopup(PopupTheme.newEvent, { eventType: 'non-streamed' });
        } else {
          dispatch(OnboardingActions.start());
          dataLayerPush({
            event:'gtm.click',
            'gtm.elementId': 'banner--create-events',
          });
        }
        break;
      case 'fun-events':
        history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--fun-events',
        });
        break;
      case 'bonus':
        history.push(Routes.leaderboard);
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--bonus',
        });
        break;
    }
  };

  const renderLandingPageSlides = () => {
    return (
      <Carousel
        className={styles.carousel}
        autoPlay
        interval={6500}
        transitionTime={800}
        infiniteLoop={true}
        stopOnHover={false}
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        onClickItem={onClickItem}
      >
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/landingpage-carousel/slide_create_own_event.jpg?v=2`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/landingpage-carousel/slide_2_bg.jpg?v=2`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/landingpage-carousel/slide_3_bg.jpg?v=2`}
        />
      </div>
    </Carousel>
    )
  }

  return (
    <div className={styles.carouselContainer}>
      {renderLandingPageSlides()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    loggedIn: state.authentication.authState === authState.LOGGED_IN,
    userId: state.authentication.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    showWalletDepositPopup: () => {
      trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
    handleKycInfoVisible: bool => {
      dispatch(GeneralActions.setKycInfoVisible(bool));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomCarousel);
