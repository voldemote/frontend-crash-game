import _ from "lodash";
import classNames from "classnames";
import medalGold from "../../data/icons/medal-gold.png";
import cross from "../../data/icons/cross.svg";
import Logo from "../../data/images/logo-demo.svg";
import React from "react";
import style from "./styles.module.scss";
import { getProfilePictureUrl } from "../../helper/ProfilePicture";
import Link from "../Link";
import Routes from "../../constants/Routes";
import Icon from "../Icon";
import IconType from "../Icon/IconType";
import { useState } from "react";
import MainMenu from "../MainMenu";
import LeaderboardItem from "../LeaderboardItem";
import Notifications from "../Notifications";
// import { connect }              from 'react-redux';
// import { LeaderboardActions }   from 'store/actions/leaderboard';
// Just as long as I don't get Redux
import axios from "axios";
import { useEffect } from "react";
import { matchPath } from "react-router";
import { connect } from "react-redux";

const Navbar = ({ user, location }) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [rank, setRank] = useState(0);
    const [unreadNotifications, setUnreadNotifications] = useState(0);

    const [notifications, setNotifications] = useState([
        {
            id: "1",
            message:
                "The event CS:Go LIVE Stream has ended. Output: Name of the Winner. Your Trade Amount was 500 EVNT.",
            read: false,
        },
        {
            id: "2",
            message:
                "The event Ultimate Snail Race has ended. Output: Wallfair Snail. You Trade Amount was 500 EVNT. You won 3.000 EVNT. 🥳",
            read: false,
        },
        {
            id: "3",
            message:
                "The event CS:Go LIVE Stream has ended. Output: Name of the Winner. Your Trade Amount was 500 EVNT.",
            read: false,
        },
        {
            id: "4",
            message:
                "The event Ultimate Snail Race has ended. Output: Wallfair Snail. You Trade Amount was 500 EVNT. You won 3.000 EVNT. 🥳",
            read: false,
        },
        {
            id: "5",
            message:
                "The event CS:Go LIVE Stream has ended. Output: Name of the Winner. Your Trade Amount was 500 EVNT.",
            read: true,
        },
        {
            id: "6",
            message:
                "The event Ultimate Snail Race has ended. Output: Wallfair Snail. You Trade Amount was 500 EVNT. You won 3.000 EVNT. 🥳",
            read: true,
        },
    ]);

    useEffect(() => {
        setUnreadNotifications(
            notifications.filter((notification) => notification.read === false)
                .length
        );
    }, [notifications]);

    // Just as long as I don't get Redux
    const token = user.token;

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/user/getUsers")
            .then((response) => {
                setLeaderboard(response.data.users);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`http://localhost:8000/api/user/${user.userId}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                setRank(response.data.rank);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token, rank, user.userId]);
    // End of temporary solution

    const onChangeLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard);
    };

    const getProfileStyle = () => {
        const profilePicture = getProfilePictureUrl(
            _.get(user, "profilePicture")
        );

        return {
            backgroundImage: 'url("' + profilePicture + '")',
        };
    };

    const getBalance = () => {
        const userBalance = user.balance;

        if (!_.isNull(userBalance)) {
            return userBalance;
        }

        return "-";
    };

    const openMobileMenu = () => {
        setMenuOpened(true);
    };

    const closeMobileMenu = () => {
        setMenuOpened(false);
    };

    const showNotificationsHandler = () => {
        setShowNotifications(!showNotifications);
    };

    const closeNotifications = () => {
        setShowNotifications(false);
    };

    const showDesktopMenuHandler = () => {
        setMenuOpened(!menuOpened);
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

    return (
        <div className={style.navbar}>
            <div className={classNames(style.navbarItems, style.hideOnMobile)}>
                <img src={Logo} width={200} alt={"Wallfair"} />
                {renderNavbarLink(Routes.home, "Home")}
                {renderNavbarLink(Routes.betOverview, "My Trades")}
                {renderNavbarLink(Routes.wallet, "My Wallet")}
            </div>
            <div className={style.navbarItems}>
                <Icon
                    className={style.mainMenu}
                    iconType={IconType.mainMenu}
                    onClick={openMobileMenu}
                />
                <div className={style.ranking} onClick={onChangeLeaderboard}>
                    <img src={medalGold} alt="medal" className={style.medal} />
                    <p className={style.rankingText}>Rank # {rank}</p>
                </div>
                <Link to={Routes.wallet} className={style.balanceOverview}>
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
            {showLeaderboard && (
                <div className={style.leaderboard}>
                    <img
                        src={cross}
                        alt="close"
                        className={style.closeLeaderboard}
                        onClick={onChangeLeaderboard}
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
                    setUnreadNotifications={setUnreadNotifications}
                    closeNotifications={closeNotifications}
                />
            )}
            <MainMenu opened={menuOpened} closeMobileMenu={closeMobileMenu} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        location: state.router.location,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
