import React from 'react';
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
import InputBox from "../InputBox";

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
                  }) => {
    const [editVisible, setEditVisible] = useState(false);

    const [name, setName]            = useState('');
    const [username, setUsername]    = useState('');

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

    const handleChange = (e) => {
        console.log("called " + e.target.value)
    }

    const editProfileWrapper = () => {
        return (
            <div className={classNames(
                styles.panel,
                !editVisible && styles.panelHidden
            )}>
                <div className={styles.profileWrapper}>
                    <h2 className={styles.profileHeading}>
                        <Icon className={styles.backButton} iconType={'arrowTopRight'} onClick={() => setEditVisible(!editVisible)}/>
                        Edit My Profile
                    </h2>

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
                    <div className={styles.fundsContainer}>
                        <div className={styles.overallFunds}>
                            <p className={styles.overallFundsHeadline}>OVERALL FUNDS</p>
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
                            ;
                        </div>
                        <div className={styles.fundsSeperator}/>
                        <div className={styles.detailedFunds}>
                            <div className={styles.investedFunds}>
                                <div className={styles.investedFundsHeadline}>
                                    <div className={styles.investedFundsDot}/>
                                    Invested Market Value
                                </div>
                                <div className={styles.investedFundsAmount}>
                                    <p className={styles.investedFundsTotal}>
                                        {formatToFixed(investedAmount)}
                                    </p>
                                    <p className={styles.investedFundsTitle}>EVNT</p>
                                </div>
                            </div>
                            <div className={styles.liquidFunds}>
                                <div className={styles.liquidFundsHeadline}>
                                    <div className={styles.liquidFundsDot}/>
                                    Liquid EVNTs
                                </div>
                                <div className={styles.liquidFundsAmount}>
                                    <p className={styles.liquidFundsTotal}>{formatToFixed(balance)}</p>
                                    <p className={styles.liquidFundsTitle}>EVNT</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className={styles.goToWallet}
                            onClick={onClickGoToRoute(Routes.wallet)}
                        >
                            <p className={styles.goToWalletText}>Go to my Wallet</p>
                            <Icon
                                className={styles.goToWalletIcon}
                                iconType={IconType.arrowTopRight}
                            />
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

    return {
        openBetCount,
        openBets,
        balance,
        totalWin,
        overallFundsTotal,
        liquidFundsPercentage,
        investedFundsPercentage,
        investmentAmount,
    };
};

export default connect(mapStateToProps, null)(MainMenu);
