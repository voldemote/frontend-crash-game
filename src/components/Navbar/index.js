import _                        from 'lodash';
import classNames               from 'classnames';
import medalGold                from '../../data/icons/medal-gold.png';
import LogoDemo                 from '../../data/images/logo-demo.svg';
import style                    from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import Routes                   from '../../constants/Routes';
import Icon                     from '../Icon';
import IconType                 from '../Icon/IconType';
import { useEffect, useState }             from 'react';
import MainMenu                 from '../MainMenu';
import LeaderboardItem          from '../LeaderboardItem';
import Notifications            from '../Notifications';
import { connect }              from 'react-redux';
import { NotificationActions }  from 'store/actions/notification';
import { formatToFixed }        from '../../helper/FormatNumbers';
import { LeaderboardActions }   from '../../store/actions/leaderboard';
import { LOGGED_IN }            from 'constants/AuthState';
import Button                   from '../Button';
import { useHistory }           from 'react-router';
import Wallet                   from '../Wallet';
import { NavLink }              from 'react-router-dom';
import State                    from "../../helper/State";
import { matchPath } from 'react-router-dom';

const Navbar = ({
                    user,
                    notifications,
                    leaderboard,
                    userRank,
                    setUnread,
                    transactions,
                    fetchLeaderboard,
                    authState,
                    location,
                    skipRoutes = [],
                }) => {

    const [openDrawer, setOpenDrawer] = useState('');
    const [leaderboardPage, setLeaderboardPage] = useState(0);
    const history = useHistory();
    
    if (skipRoutes.some(route => matchPath(location.pathname, route))) {
        return null;
    }
    
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
        if (!drawers.hasOwnProperty(drawerName)) {
            return;
        }
        const isDrawerOpen = openDrawer === drawerName;
        if (!isDrawerOpen && drawerName === drawers.leaderboard) {
            fetchLeaderboard(leaderboardPage);
        }
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

    const renderNavbarLink = (route, text) => {
        return (
            <NavLink 
                exact 
                to={route} 
                activeClassName={style.active}
            >
                {text}
            </NavLink>
        );
    };
    
    const hasOpenDrawer = !isOpen('');

    if(hasOpenDrawer) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
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
                className={classNames(style.ranking, style.pillButton, isOpen(drawers.leaderboard) ? style.pillButtonActive : null)}
                onClick={() => toggleOpenDrawer(drawers.leaderboard)}
            >
                <img
                    src={medalGold}
                    alt="medal"
                    className={style.medal}
                />
                <p className={style.rankingText}># {user.rank}</p>
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
                className={classNames(style.balanceOverview, style.pillButton, isOpen(drawers.wallet) ? style.pillButtonActive : null)}
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

    const onLeaderboardLoad = () => {
        const nextPage = leaderboardPage + 1;
        setLeaderboardPage(nextPage);
        fetchLeaderboard(nextPage);
    }

    const getMissingWinnerAmount = () => {
        const first = leaderboard[0];
        if (leaderboard.length == 0 || first._id === userRank._id) return 0;
        return formatToFixed(first.amountWon - userRank.amountWon);
    }

    const renderLeaderboardDrawer = () => {
        return (
            <div className={classNames(style.leaderboard, style.drawer, !isOpen(drawers.leaderboard) && style.drawerHidden)}>
                <Icon
                    iconType={'cross'}
                    onClick={closeDrawers}
                    className={style.closeLeaderboard}
                />
                <div className={style.leaderboardHeadingWrapper}>
                    <p className={style.leaderboardHeading}>
                        Community
                        <br />
                        Leaderboard
                    </p>
                    <div className={style.leaderboardHeadingRank}>
                        <div className={style.leaderboardHeadingRankText}>MY RANK</div>
                        <div className={style.leaderboardHeadingRankValue}>#{user.rank}</div>
                    </div>
                </div>
                <div className={style.leaderboardInfo}>
                    <div className={style.leaderboardInfoItem}>
                        <div className={style.leaderboardInfoItemText}>MISSING TO WINNER</div>
                        <div className={style.leaderboardInfoItemNumber}>{getMissingWinnerAmount()} 
                        <span className={style.leaderboardInfoItemToken}> EVNT</span></div>
                    </div>
                    <div className={style.leaderboardInfoItem}>
                        <div className={style.leaderboardInfoItemText}>MISSING TO NEXT RANK</div>
                        <div className={style.leaderboardInfoItemNumber}>{user.toNextRank} 
                        <span className={style.leaderboardInfoItemToken}> EVNT</span></div>
                    </div>
                </div>
                <div className={style.leaderboardTable}>
                    <div className={style.tableHeadings}>
                        <p className={style.rankingHeading}>RANKING</p>
                        <p className={style.userHeading}>USER</p>
                        <p className={style.tokenHeading}>TOKENS WON</p>
                    </div>
                    <div className={style.leaderboardRanking}>
                        {leaderboard &&
                        leaderboard.map(user => {
                            return (
                                <LeaderboardItem
                                    user={user}
                                    isCurrentUser={user._id === userRank._id}
                                    key={user.userId}
                                    showLoadButton={leaderboard.length - 1  === user.rank}
                                    onLoad={() => onLeaderboardLoad()}
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
            <Icon
                iconType={IconType.logoSmall}
                className={style.logoMobile}
            />
            
            <div className={classNames(style.navbarItems, style.hideOnMobile)}>
                <img
                    src={LogoDemo}
                    width={200}
                    alt={'Wallfair'}
                />
                {isLoggedIn() &&
                    <div className={style.linkWrapper}>
                        {renderNavbarLink(Routes.home, <Icon iconType={IconType.home} className={style.homeIcon} />)}
                        {renderNavbarLink(Routes.liveEvents, 'Live Events')}
                        {renderNavbarLink(Routes.events, 'Events')}
                        {renderNavbarLink(Routes.rosiGame, 'Rosi Game')}
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
        notifications: state.notification.notifications,
        leaderboard:   _.get(state.leaderboard.leaderboard, 'users', []),
        userRank:      state.leaderboard.leaderboard.currentUser,
        transactions:  state.transaction.transactions,
        user:          state.authentication,
        location:      state.router.location,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUnread:        (notification) => {
            dispatch(NotificationActions.setUnread({ notification }));
        },
        fetchLeaderboard: (page) => {
            dispatch(LeaderboardActions.fetchAll({page, perPage: 20}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
