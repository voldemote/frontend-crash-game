import classNames          from 'classnames';
import React, { Fragment } from 'react';
import style               from './styles.module.scss';
import darkModeLogo        from '../../data/images/logo-darkmode.svg';

const EventCard = () => {

    return (
        <div className={style.eventCard}>
            <div>
                <span className={style.live}><div></div>Live</span>
                <span className={style.viewers}>🔥 3.456 Viewers</span>
            </div>
            <div>
                <span className={style.title}>eSports Alliance<br/>JIB PUBG</span>
                <div className={style.tags}>
                    <span>#esports</span>
                    <span>#shooter</span>
                </div>
            </div>
        </div>
    );
};

export default EventCard;