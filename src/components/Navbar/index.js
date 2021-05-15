import React, { Fragment } from 'react';
import style               from './styles.module.scss';
import darkModeLogo        from '../../data/images/logo-darkmode.svg';
import classNames          from 'classnames';

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
                >Home
                </a>
                <a href="/">Discover</a>
                <a href="/">My Bets</a>
                <a href="/">My Wallet</a>
            </div>
            <div className={style.navbarItems}>
                <button onClick={true}>
                    <span>Your actual Balance</span>
                    500 EVNT
                </button>
                <div className={style.profile} style={getProfileStyle()}></div>
            </div>
        </div>
    );
};

export default Navbar;