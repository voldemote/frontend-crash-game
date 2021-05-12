import classNames          from 'classnames';
import React, { Fragment } from 'react';
import style               from './styles.module.scss';
import darkModeLogo        from '../../data/images/logo-darkmode.svg';

const Navbar = () => {

    return (
        <div className={style.navbar}>
            <div className={style.navbarItems}>
                <img src={darkModeLogo} alt="Wallfair" />
                <a href="/" className={style.active}>Home</a>
                <a href="/">Discover</a>
                <a href="/">My Bets</a>
                <a href="/">My Wallet</a>
            </div>
            <div className={style.navbarItems}>
                <button onClick={true}>500 EVNT</button>
                <div className={style.profile}></div>
            </div>
        </div>
    );
};

export default Navbar;