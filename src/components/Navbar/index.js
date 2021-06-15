import _                        from 'lodash';
import classNames               from 'classnames';
import darkModeLogo             from '../../data/images/logo-darkmode.svg';
import React                    from 'react';
import style                    from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import Link                     from '../Link';
import Routes                   from '../../constants/Routes';

const Navbar = ({ user }) => {
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
                <a>Discover</a>
                <Link to={Routes.betOverview}>
                    My Bets
                </Link>
                <Link to={Routes.wallet}>
                    My Wallet
                </Link>
            </div>
            <div className={style.navbarItems}>
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
        </div>
    );
};

export default Navbar;