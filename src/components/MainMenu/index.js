import React, {useRef} from 'react';
import {useState} from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import {connect} from 'react-redux';
import {useHistory} from 'react-router';
import HomeSettings from '../HomeSettings';
import {PieChart} from 'react-minimal-pie-chart';
import {formatToFixed} from '../../helper/FormatNumbers';
import {UserActions} from "../../store/actions/user";

const MainMenu = ({
                      opened,
                      openBetCount,
                      openBets,
                      balance,
                      totalWin,
                      overallFundsTotal,
                      liquidFundsPercentage,
                      investedFundsPercentage,
                      investmentAmount,
                      sellTransactions,
                      user,
                      updateUser,
                  }) => {
    const [editVisible, setEditVisible] = useState(false);

    const [name, setName]               = useState(user.name);
    const [username, setUsername]       = useState(user.username);
    const [email, setEmail]             = useState(user.email);

    const profilePictureRefName = useRef(null);

    const clickUploadProfilePicture = () => {
        profilePictureRefName.current?.click();
    }

    let investedAmount = 0;

    const calculateInvestedAmount = () => {
        openBets.map((bet) => {
            return (
                investedAmount += Number(bet.investmentAmount)
            );
        });
    };

    calculateInvestedAmount();

    const history = useHistory();

    const onClickGoToRoute = (destinationRoute) => {
        return () => {
            history.push(destinationRoute);
        };
    };

    const onClickShowEditProfile = () => {
        setEditVisible(!editVisible);
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = () => {
        updateUser(name, username, email, null)
    }

    const handleProfilePictureUpload = event => {
        console.log(event.target.files[0])
    }

    const editProfileWrapper = () => {
        return (
            <div className={classNames(
                styles.panel,
                !editVisible && styles.panelHidden
            )}>
                <h2 className={styles.profileHeading}>
                    <Icon className={styles.backButton} iconType={'arrowTopRight'} onClick={() => setEditVisible(!editVisible)}/>
                    Edit My Profile
                </h2>
                <div className={styles.editProfileContent}>
                    <div className={styles.profilePictureWrapper}>
                        <div className={styles.profilePicture}>
                            <div className={styles.profilePictureUpload} onClick={clickUploadProfilePicture}>
                                <div className={styles.iconContainer}>
                                    <Icon className={styles.uploadIcon} iconTheme={IconTheme.white} iconType={IconType.avatarUpload} />
                                </div>
                                <input ref={profilePictureRefName} type={'file'} style={{display: 'none'}} onChange={handleProfilePictureUpload} />
                            </div>
                            <p className={styles.profilePictureUploadLabel}>Your avatar</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.profileContent}>
                            <div className={styles.profileInputGroup}>
                                <label className={styles.profileInputLabel}>My Name is...</label>
                                <input className={styles.profileInput} value={name} onChange={handleName} />
                            </div>
                            <div className={styles.profileInputGroup}>
                                <label className={styles.profileInputLabel}>But you can call me...</label>
                                <input className={styles.profileInput} value={username} onChange={handleUsername} />
                            </div>
                            <div className={styles.profileInputGroup}>
                                <label className={styles.profileInputLabel}>E-Mail</label>
                                <input className={styles.profileInput} disabled value={email} onChange={handleEmail} />
                            </div>
                            <input className={styles.profileSubmit} type={'submit'} value={'Save changes'} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const growth = 0;

    return (
        <div
            className={classNames(
                styles.menu,
                opened ? styles.menuOpened : null
            )}
        >
            <div className={classNames(styles.panel, styles.firstPanel, editVisible && styles.panelHidden)}>
                <h2 className={styles.profileHeading}>My Profile</h2>
                <div className={styles.mainContent}>
                    <div className={styles.profileStats}>
                        <div className={styles.profileStatItem}>
                            <p className={styles.statItemHeading}>community<br /> leaderboard</p>
                            <div className={styles.statItemContent}>
                                <p className={styles.statItemContent}># 31</p>
                                <Icon
                                    className={styles.goToIcon}
                                    iconType={IconType.arrowTopRight}
                                />
                            </div>
                        </div>
                        <div className={styles.profileStatItem}>
                            <p className={styles.statItemHeading}>my wallet<br /> (in evnt)</p>
                            <div className={styles.statItemContent}>
                                <p className={styles.statItemValue}>2.800</p>
                                <Icon
                                    className={styles.goToIcon}
                                    iconType={IconType.arrowTopRight}
                                />
                            </div>
                        </div>
                        <div className={styles.profileStatItem}>
                            <p className={styles.statItemHeading}>current trades</p>
                            <div className={styles.statItemContent}>
                                <p className={styles.statItemContent}>3</p>
                                <Icon
                                    className={styles.goToIcon}
                                    iconType={IconType.arrowTopRight}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.profileBalance}>
                        <div className={styles.profileBalanceHeading}>
                            <p className={styles.profileBalanceTitle}>total balance</p>
                            <div className={styles.goToMyTrades}>
                                <p className={styles.goToMyTradesText}>Go to my Trades</p>
                                <Icon
                                    className={styles.goToMyTradesIcon}
                                    iconType={IconType.arrowTopRight}
                                />
                            </div>
                        </div>
                        <div className={styles.profileBalanceContent}>
                            <div className={styles.profileBalanceItem}>
                                <div className={styles.overallFunds}>
                                    <div className={styles.overallFundsAmount}>
                                        <PieChart
                                            data={[
                                                {
                                                    title: 'InvestedFunds',
                                                    value: investedFundsPercentage,
                                                    color: '#69ffa5',
                                                },
                                                {
                                                    title: 'LiquidFunds',
                                                    value: liquidFundsPercentage,
                                                    color: '#3570ff',
                                                },
                                            ]}
                                            lineWidth={14}
                                            startAngle={270}
                                        />
                                        <p className={styles.overallFundsTotal}>{formatToFixed(overallFundsTotal)}</p>
                                        <p className={styles.overallFundsTitle}>EVNT</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.profileBalanceItem}>
                                <div className={styles.availableEvnts}>
                                    <div className={styles.availableEvntsHeadline}>
                                        <div className={styles.availableEvntsDot} />
                                        Available evnts
                                    </div>
                                    <div className={styles.availableEvntsAmount}>
                                        <p className={styles.availableEvntsTotal}>
                                            {formatToFixed(investedAmount)}
                                        </p>
                                        <p className={styles.availableEvntsTitle}>EVNT</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.profileBalanceItem}>
                                <div className={styles.liquidFunds}>
                                    <div className={styles.liquidFundsHeadline}>
                                        <div className={styles.liquidFundsDot} />
                                        Open positions
                                    </div>
                                    <div className={styles.liquidFundsAmount}>
                                        <p className={styles.liquidFundsTotal}>{formatToFixed(balance)}</p>
                                        <p className={styles.liquidFundsTitle}>EVNT</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <HomeSettings onEditClick={() => onClickShowEditProfile()}/>
                    <div className={styles.buttonContainer}>
                        <div
                            className={styles.logoutButton}
                            onClick={onClickGoToRoute(Routes.logout)}
                        >
                            <Icon
                                iconTheme={IconTheme.black}
                                iconType={IconType.logout}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {editProfileWrapper()}
        </div>
    );
};

const mapStateToProps = (state) => {
    const openBetCount = _.size(state.bet.openBets);
    const openBets = state.bet.openBets;
    const balance = +state.authentication.balance;
    const totalWin = +state.authentication.totalWin;
    const investmentAmount = _.sum(openBets.map(_.property('investmentAmount')).map(Number).filter(_.isFinite));
    const overallFundsTotal = balance + investmentAmount;
    const liquidFundsPercentage = 100 * balance / overallFundsTotal;
    const investedFundsPercentage = 100 * investmentAmount / overallFundsTotal;
    const user = state.authentication;

    return {
        openBetCount,
        openBets,
        balance,
        totalWin,
        overallFundsTotal,
        liquidFundsPercentage,
        investedFundsPercentage,
        investmentAmount,
        user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (name, username, email, profilePicture) => {
            dispatch(UserActions.update({name, username, email, profilePicture}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
