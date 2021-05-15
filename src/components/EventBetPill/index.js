import React           from 'react';
import style           from './styles.module.scss';
import TimeLeftCounter from '../TimeLeftCounter';
import HotBetBadge     from '../HotBetBadge';
import classNames      from 'classnames';

const EventBetPill = ({ user, marketQuestion, hotBet, eventEnd, outcomes }) => {
    const getProfileStyle = () => {
        return {
            backgroundImage: 'url("' + user.profilePicture + '")',
        };
    };

    const renderFooter = () => {
        return (
            <div className={style.pillFooter}>
                <div className={style.timeLeftCounterContainer}>
                    <span>Event ends in:</span>
                    <TimeLeftCounter endDate={eventEnd} />
                </div>
            </div>
        );
    };

    return (
        <div className={style.pill}>
            <div className={style.pillContent}>
                <div className={classNames(style.justify, style.profileContainer)}>
                    <div className={style.profile} style={getProfileStyle()}></div>
                    <span>{user.name}</span>
                </div>
                <div className={style.desc}>
                    <p>{marketQuestion}</p>
                </div>
                <div className={style.hotBetBadgeContainer}>
                    {hotBet && <HotBetBadge />}
                </div>

                <hr className={style.divider} />

                <div className={style.justify} style={{width: "100%"}}>

                    <div style={{width: "100%"}}>
                        <label for="choice" className={style.label}>Your choice:</label>
                        <div className={style.buttonContainer}>
                            <button onClick={() => console.log('bet placed')} className={style.btnBetLeft}>
                                Paul
                                <span>Quote 2.0</span>
                            </button>
                            <button onClick={() => console.log('bet placed')} className={style.btnBetRight}>
                                John
                                <span>Quote 1.2</span>
                            </button>
                        </div>
                    </div>

                    <div className={style.input}>
                        <label for="amount" className={style.label}>Your bet:</label>
                        <div>
                            <input id="amount" type="number" name="amount"/>
                            <span>EVNT</span>
                        </div>
                    </div>

                    <div className={style.onWinInput}>
                        <label for="amount" className={style.label}>On win you get:</label>
                        <div>
                            <input id="amount" value="1000" type="number" name="amount" readOnly/>
                            <span>EVNT</span>
                        </div>
                    </div>

                    <a href="/" className={style.goToEvent}>
                        Go to event
                    </a>
                </div>
            </div>
            {renderFooter()}
        </div>
    );
};

export default EventBetPill;