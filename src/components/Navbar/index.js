import _                        from 'lodash';
import classNames               from 'classnames';
import darkModeLogo             from '../../data/images/logo-darkmode.svg';
import medalGold                from "../../data/icons/medal-gold.png";
import cross                    from "../../data/icons/cross.svg";
import React                    from 'react';
import style                    from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import Link                     from '../Link';
import Routes                   from '../../constants/Routes';
import { useState }             from 'react';
import LeaderboardItem          from '../LeaderboardItem';
import { connect }              from 'react-redux';
import { LeaderboardActions }   from 'store/actions/leaderboard';


const users = [
    {
        userId: "1",
        name:"user1",
        balance:2000,
        index: 1
    },
    {
        userId: "2",
        name:"user2",
        balance:1999,
        index: 2
    },
    {
        userId: "3",
        name:"user3",
        balance:1998,
        index: 3
    },
    {
        userId: "4",
        name:"user4",
        balance:1997,
        index: 4
    },
    {
        userId: "5",
        name:"user5",
        balance:1996,
        index: 5
    },
    {
        userId: "6",
        name:"user6",
        balance:1995,
        index: 6
    },
    {
        userId: "7",
        name:"user7",
        balance:1994,
        index: 7
    },
    {
        userId: "8",
        name:"user8",
        balance:1993,
        index: 8
    },
    {
        userId: "9",
        name:"user9",
        balance:1992,
        index: 9
    },
    {
        userId: "10",
        name:"user10",
        balance:1991,
        index: 10
    },
    {
        userId: "11",
        name:"user11",
        balance:1990,
        index: 11
    },
    {
        userId: "12",
        name:"user12",
        balance:1989,
        index: 12
    },
    {
        userId: "13",
        name:"user13",
        balance:1988,
        index: 13
    },
    {
        userId: "14",
        name:"user14",
        balance:1987,
        index: 14
    },
]

const Navbar = ({ user, leaderboard }) => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const onChangeLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard)
    }

    const getProfileStyle = () => {
        const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));

        return {
            backgroundImage: 'url("' + profilePicture + '")',
        };
    };

    const getBalance = () => {
        const userBalance = user.balance;

        if (!_.isNull(userBalance)) {
            return userBalance;
        }

        return '-';
    };

    console.log(leaderboard);

    return (
        <div className={style.navbar}>
            <div
                className={classNames(
                    style.navbarItems,
                    style.hideOnMobile,
                )}
            >
                <img
                    src={darkModeLogo}
                    alt="Wallfair"
                />
                <Link
                    to={Routes.home}
                    className={style.active}
                >
                    Home
                </Link>
                <Link to={Routes.betOverview}>
                    My Trades
                </Link>
                <Link to={Routes.wallet}>
                    My Wallet
                </Link>
            </div>
            <div className={style.navbarItems}>
                <div className={style.ranking} onClick={onChangeLeaderboard}>
                    <img src={medalGold} alt="medal" className={style.medal} />
                    <p className={style.rankingText}>Rank # 1</p>
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
                    className={style.profile}
                    style={getProfileStyle()}
                >
                </div>
            </div>
            {
            showLeaderboard &&  
                <div className={style.leaderboard}>
                    <img src={cross} alt="close" className={style.closeLeaderboard} onClick={onChangeLeaderboard}/>
                    <p className={style.leaderboardHeading}>
                        Community
                        <br/>
                        Leaderboard
                    </p>
                    <div className={style.leaderboardTable}>
                        <div className={style.tableHeadings}>
                            <p className={style.rankingHeading}>RANKING</p>
                            <p className={style.userHeading}>USER</p>        
                            <p className={style.tokenHeading}>TOKENBALANCE</p>                
                        </div>
                        <div className={style.leaderboardRanking}>
                        {
                            users.map((user) => {
                                return (
                                    <LeaderboardItem user={user} />
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        leaderboard: state 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);