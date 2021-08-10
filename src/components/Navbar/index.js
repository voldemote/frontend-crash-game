import _                        from 'lodash';
import classNames               from 'classnames';
import medalGold                from '../../data/icons/medal-gold.png';
import cross                    from '../../data/icons/cross.svg';
import Logo                     from '../../data/images/logo-demo.svg';
import React                    from 'react';
import style                    from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import Link                     from '../Link';
import Routes                   from '../../constants/Routes';
import Icon                     from '../Icon';
import IconType                 from '../Icon/IconType';
import { useState }             from 'react';
import MainMenu                 from '../MainMenu';
import LeaderboardItem          from '../LeaderboardItem';
import Notifications            from '../Notifications';
import { matchPath }            from 'react-router';
import { connect }              from 'react-redux';
import { NotificationActions }  from 'store/actions/notification';
import transaction              from 'store/reducer/transaction';
import { formatToFixed }        from '../../helper/FormatNumbers';
import { put }                  from 'redux-saga/effects';
import { LeaderboardActions }   from '../../store/actions/leaderboard';
import { LOGGED_OUT }           from 'constants/AuthState';
import Button                   from '../Button';
import { useHistory }           from 'react-router';

const Navbar = ({
                    user,
                    location,
                    notifications,
                    leaderboard,
                    rank,
                    setUnread,
                    transactions,
                    fetchLeaderboard,
                    authState
                }) => {
    const [menuOpened, setMenuOpened]               = useState(false);
    const [showLeaderboard, setShowLeaderboard]     = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const history                                   = useHistory();

    const sellTransactions = transactions
        .filter((transaction) => transaction.direction === 'SELL')
        .slice(-3)
        .reverse();

    const unreadNotifications = notifications.filter(
        (notification) => !notification.read,
    ).length;

    const onChangeLeaderboard = () => {
        const newShowLeaderboard = !showLeaderboard;

        setShowLeaderboard(newShowLeaderboard);

        if (newShowLeaderboard) {
            fetchLeaderboard();

            closeMenu();
            closeNotifications();
        }
    };

    const closeLeaderboard = () => {
        setShowLeaderboard(false);
    }

    const getProfileStyle = () => {
        const profilePicture = getProfilePictureUrl(
            _.get(user, 'profilePicture'),
        );

        return {
            backgroundImage: 'url("' + profilePicture + '")',
        };
    };

    const getBalance = () => {
        const userBalance = user.balance;

        if (!_.isNull(userBalance)) {
            return formatToFixed(userBalance);
        }

        return '-';
    };

    const toggleMobileMenu = () => {
        const isOpen = !menuOpened;
        if(isOpen) {
            closeNotifications();
            closeLeaderboard();
        }
        setMenuOpened(isOpen);
    };

    const closeMenu = () => {
        setMenuOpened(false);
    };

    const showNotificationsHandler = () => {
        const isOpen = !showNotifications;
        if(isOpen) {
            closeMenu();
            closeLeaderboard();
        }
        setShowNotifications(isOpen);

    };

    const closeNotifications = () => {
        setShowNotifications(false);
    };

    const showDesktopMenuHandler = () => {
        const isOpen = !menuOpened;
        if(isOpen) {
            closeMenu();
            closeLeaderboard();
            closeNotifications();
        }
        setMenuOpened(isOpen);
    };

    const isRouteActive = (route) => {
        return !!matchPath(location.pathname, route);
    };

    const renderNavbarLink = (route, text) => {
        return (
            <Link
                to={route}
                className={isRouteActive(route) ? style.active : null}
            >
                {text}
            </Link>
        );
    };

    const goToJoinPage = () => {
        if(!isLoggedIn()) {
            history.push(Routes.join);
        }
    };

    const isLoggedIn = () => {
        return authState !== LOGGED_OUT;
    }

    return (
        <div className={style.navbar}>
            <div className={classNames(style.navbarItems, style.hideOnMobile)}>
                <img
                    src={Logo}
                    width={200}
                    alt={'Wallfair'}
                />
                {isLoggedIn() &&
                    <div>
                        {renderNavbarLink(Routes.home, 'Home')}
                        {renderNavbarLink(Routes.betOverview, 'My Trades')}
                        {renderNavbarLink(Routes.wallet, 'My Wallet')}
                    </div>
                }
            </div>
            {!isLoggedIn() &&
                <div className={style.navbarItems}>
                    <Button
                        className={style.signUpButton}
                        withoutBackground={true}
                        onClick={goToJoinPage}>
                        JOIN NOW
                    </Button>
                </div>
            }
            {isLoggedIn() &&
                <div className={style.navbarItems}>
                    <Icon
                        className={style.mainMenu}
                        iconType={IconType.mainMenu}
                        onClick={toggleMobileMenu}
                    />
                    <div
                        className={style.ranking}
                        onClick={onChangeLeaderboard}
                    >
                        <img
                            src={medalGold}
                            alt="medal"
                            className={style.medal}
                        />
                        <p className={style.rankingText}>Rank # {rank}</p>
                    </div>
                    <Link
                        to={Routes.wallet}
                        className={style.balanceOverview}
                    >
                        <span className={style.actualBalanceText}>
                            Your current Balance
                        </span>
                        {getBalance()} EVNT
                    </Link>
                    <div
                        className={style.notificationOverview}
                        onClick={showNotificationsHandler}
                    >
                        <Icon
                            iconType={IconType.bell}
                            className={style.notificationIcon}
                        />
                        {unreadNotifications > 0 && (
                            <div className={style.notificationNew}>
                                <p className={style.notificationNewText}>
                                    {unreadNotifications}
                                </p>
                            </div>
                        )}
                    </div>
                    <div
                        className={style.profile}
                        style={getProfileStyle()}
                        onClick={showDesktopMenuHandler}
                    ></div>
                    <div
                        className={style.profileMobile}
                        style={getProfileStyle()}
                    ></div>
                </div>
            }
            {showLeaderboard && (
                <div className={style.leaderboard}>
                    <Icon
                        iconType={'cross'}
                        onClick={onChangeLeaderboard}
                        className={style.closeLeaderboard}
                    />
                    <p className={style.leaderboardHeading}>
                        Community
                        <br />
                        Leaderboard
                    </p>
                    <div className={style.leaderboardTable}>
                        <div className={style.tableHeadings}>
                            <p className={style.rankingHeading}>RANKING</p>
                            <p className={style.userHeading}>USER</p>
                            <p className={style.tokenHeading}>TOKENBALANCE</p>
                        </div>
                        <div className={style.leaderboardRanking}>
                            {leaderboard &&
                            leaderboard.map((user) => {
                                return (
                                    <LeaderboardItem
                                        user={user}
                                        key={user.userId}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {showNotifications && (
                <Notifications
                    notifications={notifications}
                    unreadNotifications={unreadNotifications}
                    closeNotifications={closeNotifications}
                    setUnread={setUnread}
                />
            )}
            <MainMenu
                opened={menuOpened}
                closeMobileMenu={closeMenu}
                sellTransactions={sellTransactions}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authState:     state.authentication.authState,
        location:      state.router.location,
        notifications: state.notification.notifications,
        leaderboard:   _.get(state.leaderboard.leaderboard, 'users', []),
        rank:          _.get(state.authentication, 'rank', 0),
        transactions:  state.transaction.transactions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUnread:        (notification) => {
            dispatch(NotificationActions.setUnread({ notification }));
        },
        fetchLeaderboard: () => {
            dispatch(LeaderboardActions.fetchAll());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
