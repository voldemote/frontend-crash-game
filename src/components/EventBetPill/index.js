import classNames          from 'classnames';
import React, { Fragment } from 'react';
import style               from './styles.module.scss';

const EventBetPill = () => {

    return (
        <div className={style.pill}>
            <div className={style.pillContent}>
                <div className={style.justify}>
                    <div className={style.profile}></div>
                    <div className={style.desc}>
                        <span>John Doe</span>
                        <p>Who will win Rampage downhill?</p>
                    </div>
                    <div className={style.tag}>🔥 Hot Bet</div>
                </div>
                <div className={style.justify}>
                    <div className={style.input}>
                        <label for="amount">Your bet:</label>
                        <div>
                            <input id="amount" type="number" name="amount" />
                            <span>EVNT</span>
                        </div>
                    </div>
                    <button onClick={() => console.log("bet placed")} className={style.btnBetLeft}>
                        <span>Paul</span>
                        6.000 EVNT
                    </button>
                    <button onClick={() => console.log("bet placed")} className={style.btnBetRight}>
                        <span>John</span>
                        8.000 EVNT
                    </button>
                    <a href="/" className={style.goToEvent}>Go to event</a>
                </div>
            </div>
            <div className={style.pillFooter}>
                <div className={style.countdown}>
                    <span>Event ends in:</span>
                </div>
            </div>
        </div>
    );
};

export default EventBetPill;