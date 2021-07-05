import React          from 'react';
import _              from 'lodash';
import classNames     from 'classnames';
import Icon           from '../Icon';
import IconTheme      from '../Icon/IconTheme';
import IconType       from '../Icon/IconType';
import Routes         from '../../constants/Routes';
import styles         from './styles.module.scss';
import { connect }    from 'react-redux';
import { useHistory } from 'react-router';

const MobileMenu = ({ opened, closeMobileMenu, openBetCount, balance }) => {
    const history = useHistory();

    const onClickGoToRoute = (destinationRoute) => {
        return () => {
            history.push(destinationRoute);
        };
    };

    const renderInfoDetailContainer = (infoValue, infoText, destinationRoute, withEvntToken) => {
        return (
            <div
                className={styles.infoDetailContainer}
                onClick={onClickGoToRoute(destinationRoute)}
            >
                <div className={styles.info}>
                    {infoValue}
                    {withEvntToken && <sup>
                        EVNT
                    </sup>}
                </div>
                <div className={styles.infoText}>
                    {infoText}
                    <Icon
                        iconType={IconType.arrowTopRight}
                        className={styles.infoTextIcon}
                        width={12}
                        height={12}
                    />
                </div>
            </div>
        );
    };

    const renderCloseButton = () => {
        return (
            <div className={styles.upperCloseMenuContainer}>
                <div className={styles.upperCloseMenuButton}>
                    <Icon
                        iconType={IconType.logout}
                        onClick={closeMobileMenu}
                    />
                </div>
            </div>
        );
    };

    const renderInfos = () => {
        return (
            <>
                {renderInfoDetailContainer(balance, 'Your actual balance', Routes.wallet, true)}
                {renderInfoDetailContainer(openBetCount, 'Open Bets', Routes.betOverview)}
                {renderInfoDetailContainer(0, 'Money won', null, true)}
            </>
        );
    };

    const renderMenuFooter = () => {
        return (
            <div className={styles.mobileMenuFooter}>
                {renderMenuButton(IconType.settings, 'Settings')}
                {renderLogoutButton()}
            </div>
        );
    };

    const renderMenuButton = (iconType, text) => {
        return (
            <div className={styles.menuButton}>
                <Icon
                    className={styles.menuButtonIcon}
                    iconTheme={IconTheme.primary}
                    iconType={iconType}
                />
                {text}
            </div>
        );
    };

    const renderLogoutButton = () => {
        return (
            <div
                className={styles.logoutButton}
                onClick={onClickGoToRoute(Routes.logout)}
            >
                <Icon
                    className={styles.logoutButtonIcon}
                    iconType={IconType.logout}
                />
                Logout
            </div>
        );
    };

    return (
        <div
            className={classNames(
                styles.mobileMenu,
                opened ? styles.mobileMenuOpened : null,
            )}
        >
            {renderCloseButton()}
            {renderInfos()}
            {renderMenuFooter()}
        </div>
    );
};

const mapStateToProps = (state) => {
    const openBetCount = _.size(state.bet.openBets);
    const balance      = state.authentication.balance;

    return {
        openBetCount,
        balance,
    };
};

export default connect(
    mapStateToProps,
    null,
)(MobileMenu);
