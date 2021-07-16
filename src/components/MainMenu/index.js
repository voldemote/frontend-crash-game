import React             from 'react';
import { useState }      from 'react';
import _                 from 'lodash';
import classNames        from 'classnames';
import Icon              from '../Icon';
import IconType          from '../Icon/IconType';
import IconTheme         from '../Icon/IconTheme';
import Routes            from '../../constants/Routes';
import styles            from './styles.module.scss';
import { connect }       from 'react-redux';
import { useHistory }    from 'react-router';
import HomeSettings      from '../HomeSettings';
import { PieChart }      from 'react-minimal-pie-chart';
import { formatToFixed } from '../../helper/FormatNumbers';

const MainMenu = ({
                      opened,
                      closeMobileMenu,
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
    const [openSettings, setOpenSettings] = useState(false);

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

    const showSettingsHandler = () => {
        setOpenSettings(true);
    };

    const notShowSettingsHandler = () => {
        setOpenSettings(false);
    };

    const onClickGoToRoute = (destinationRoute) => {
        return () => {
            history.push(destinationRoute);
        };
    };

    const growth = 0;

    return (
        <div
            className={classNames(
                styles.menu,
                opened ? styles.menuOpened : null,
            )}
        >
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
                        <p className={styles.overallFundsTotal}>{overallFundsTotal}</p>
                        <p className={styles.overallFundsTitle}>EVNT</p>
                    </div>
                    ;
                </div>
                <div className={styles.fundsSeperator} />
                <div className={styles.detailedFunds}>
                    <div className={styles.investedFunds}>
                        <div className={styles.investedFundsHeadline}>
                            <div className={styles.investedFundsDot} />
                            Invested Market Value
                        </div>
                        <div className={styles.investedFundsAmount}>
                            <p className={styles.investedFundsTotal}>
                                {investedAmount}
                            </p>
                            <p className={styles.investedFundsTitle}>EVNT</p>
                        </div>
                        {/*growth > 0 ? (
                            <div className={styles.growthPositive}>
                                +{growth}
                            </div>
                        ) : growth < 0 ? (
                            <div className={styles.growthNegative}>
                                {growth}
                            </div>
                        ) : (
                            <div className={styles.growthNeutral}>
                                {growth} / 0%
                            </div>
                        )*/}
                        {/*<div className={styles.originInvestedAmount}>
                            {investedAmount} EVNT invested
                        </div>*/}
                    </div>
                    <div className={styles.liquidFunds}>
                        <div className={styles.liquidFundsHeadline}>
                            <div className={styles.liquidFundsDot} />
                            Liquid EVNTs
                        </div>
                        <div className={styles.liquidFundsAmount}>
                            <p className={styles.liquidFundsTotal}>{balance}</p>
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
            {/* <div className={styles.latestTradesContainer}>
                <div className={styles.latestTradesHeadline}>
                    <p className={styles.HeadlineLeft}>LATEST TRADES</p>
                    <p
                        className={styles.HeadlineRight}
                        onClick={onClickGoToRoute(Routes.betOverview)}
                    >
                        See all
                    </p>
                </div>
            </div> */}
            <div className={styles.buttonContainer}>
                <div
                    className={styles.settingButton}
                    onClick={showSettingsHandler}
                >
                    <Icon
                        iconTheme={IconTheme.black}
                        iconType={IconType.settings}
                    />
                </div>
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
            {openSettings && (
                <HomeSettings notShowSettingsHandler={notShowSettingsHandler} />
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    const openBetCount            = _.size(state.bet.openBets);
    const openBets                = state.bet.openBets;
    const balance                 = formatToFixed(+state.authentication.balance);
    const totalWin                = formatToFixed(+state.authentication.totalWin);
    const investmentAmount        = formatToFixed(_.sum(openBets.map(_.property('investmentAmount')).map(Number).filter(_.isFinite)));
    const overallFundsTotal       = formatToFixed(balance + investmentAmount);
    const liquidFundsPercentage   = formatToFixed(100 * balance / overallFundsTotal);
    const investedFundsPercentage = formatToFixed(100 * investmentAmount / overallFundsTotal);

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
