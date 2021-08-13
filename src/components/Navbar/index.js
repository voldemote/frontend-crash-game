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
import { LOGGED_IN }            from 'constants/AuthState';
import Button                   from '../Button';
import { useHistory }           from 'react-router';
import Wallet                   from '../Wallet';

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
    const [openDrawer, setOpenDrawer] = useState('');
    const history = useHistory();
    
    const drawers = {
        notifications: 'notifications',
        leaderboard: 'leaderboard',
        profile: 'profile',
        wallet: 'wallet',
    }

    const sellTransactions = transactions
        .filter((transaction) => transaction.direction === 'SELL')
        .slice(-3)
        .reverse();

    const unreadNotifications = notifications.filter(
        (notification) => !notification.read,
    ).length;

    const toggleOpenDrawer = (drawerName) => {
        if(!drawers.hasOwnProperty(drawerName)) {
            return;
        }
        const isDrawerOpen = openDrawer === drawerName;
        setOpenDrawer(isDrawerOpen ? '' : drawerName);
    }

    const isOpen = (drawerName) => openDrawer === drawerName;

    const closeDrawers = () => {
        setOpenDrawer('');
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
    
    const hasOpenDrawer = !isOpen('');

    if(hasOpenDrawer) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    if(isOpen(drawers.wallet)) {
        fetchLeaderboard();
    }

    const goToJoinPage = () => {
        if(!isLoggedIn()) {
            history.push(Routes.join);
        }
    };

    const isLoggedIn = () => {
        return authState === LOGGED_IN;
    }

    const renderJoinButton = () => {
        return (
            <div className={style.navbarItems}>
                <Button
                    className={style.signUpButton}
                    withoutBackground={true}
                    onClick={goToJoinPage}>
                    Join now
                </Button>
            </div>
        );
    }

    const renderNavButtons = () => {

        const leaderboardBtn = (
            <div
                className={classNames(style.ranking, style.pillButton)}
                onClick={() => toggleOpenDrawer(drawers.leaderboard)}
            >
                <img
                    src={medalGold}
                    alt="medal"
                    className={style.medal}
                />
                <p className={style.rankingText}># {rank}</p>
            </div>
        );

        const notificationsBtn = (
            <div
                className={style.notificationOverview}
                onClick={() => toggleOpenDrawer(drawers.notifications)}
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
        );

        const walletBtn = (
            <div
                className={classNames(style.balanceOverview, style.pillButton)}
                onClick={() => toggleOpenDrawer(drawers.wallet)}
            >
                <Icon iconType={'wallet'}/>
                {getBalance()} EVNT
            </div>
        );

        const profileBtn = (
            <div
                role="button"
                className={classNames(style.profileContainer, isOpen(drawers.profile) && style.menuOpened)}
                onClick={() => toggleOpenDrawer(drawers.profile)}
            >
                <div
                    role="img"
                    className={style.profile}
                    style={getProfileStyle()}
                ></div>
                <Icon
                    className={style.downCaret}
                    iconType={'arrowDown'}
                    iconTheme={'white'}
                />
            </div>
        )

        return (
            <div className={style.navbarItems}>
                {leaderboardBtn}
                {walletBtn}
                {notificationsBtn}
                {profileBtn}
            </div>
        )
    };

    const renderLeaderboardDrawer = () => {
        return (
            <div className={classNames(style.leaderboard, style.drawer, !isOpen(drawers.leaderboard) && style.drawerHidden)}>
                <Icon
                    iconType={'cross'}
                    onClick={closeDrawers}
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
        )
    }

    const renderNotificationsDrawer = () => {
        return (
            <div className={classNames(
                style.drawer,
                !isOpen(drawers.notifications) && style.drawerHidden
            )}>
                <Notifications
                    notifications={notifications}
                    unreadNotifications={unreadNotifications}
                    closeNotifications={closeDrawers}
                    setUnread={setUnread}
                />
            </div>
        )
    };

    const renderMenuDrawer = () => {
        return (
            <MainMenu
                opened={isOpen(drawers.profile)}
                closeMobileMenu={closeDrawers}
                sellTransactions={sellTransactions}
            />
        )
    };

    const renderWalletDrawer = () => {
        return (
            <Wallet
                show={isOpen(drawers.wallet)}
                close={closeDrawers}
            />
        )
    }

    return (
        <div className={classNames(style.navbar, hasOpenDrawer && style.navbarSticky)}>
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

            {!isLoggedIn() && renderJoinButton()}
            {isLoggedIn() && (
                <>
                    {renderNavButtons()}
                    {renderLeaderboardDrawer()}
                    {renderNotificationsDrawer()}
                    {renderMenuDrawer()}
                    {renderWalletDrawer()}
                </>
            )}
            
            
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
