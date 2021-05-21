import React        from 'react';
import style        from './styles.module.scss';
import darkModeLogo from '../../data/images/logo-darkmode.svg';
import classNames   from 'classnames';

const Navbar = ({ user }) => {
    const getProfileStyle = () => {
        return {
            backgroundImage: 'url("' + user.profilePicture + '")',
        };
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
                <a
                    href="/"
                    className={style.active}
                >
                    Home
                </a>
                <a>Discover</a>
                <a>My Bets</a>
                <a>My Wallet</a>
            </div>
            <div className={style.navbarItems}>
                <button
                    className={style.balanceOverview}
                >
                    <span className={style.actualBalanceText}>
                        Your actual Balance
                    </span>
                    {user.currentTokens} EVNT
                </button>
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