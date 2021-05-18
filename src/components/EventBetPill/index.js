import React           from 'react';
import style           from './styles.module.scss';
import TimeLeftCounter from '../TimeLeftCounter';
import HotBetBadge     from '../HotBetBadge';
import classNames      from 'classnames';
import Link            from '../Link';
import Icon            from '../Icon';
import IconType        from '../Icon/IconType';

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

                <div className={style.desc}>
                    <div className={style.profileContainer}>
                        <div className={style.profile} style={getProfileStyle()}></div>
                        <span>{user.name}</span>
                    </div>
                    <p>{marketQuestion}</p>
                    {hotBet && <HotBetBadge />}
                </div>

                <hr className={style.divider} />

                <div className={style.justify}>

                    <div className={style.buttonContainer}>
                        <label htmlFor={'choice'} className={style.label} style={{ paddingBottom: "0.5rem", display: "inline-block" }}>Your choice:</label>
                        <div className={style.quoteButtons}>
                            <div>
                                <input type="radio" value="quote1" name="bet" id="bet1" required />
                                <label htmlFor="bet1">Paul <span>Quote 2.0</span></label>
                            </div>
                            <div>
                                <input type="radio" value="quote2" name="bet" id="bet2" required />
                                <label htmlFor="bet2">John <span>Quote 1.2</span></label>
                            </div>
                        </div>
                    </div>

                    <div className={style.inputWrapper}>
                        <label htmlFor={'amount'} className={style.label}>Your bet:</label>
                        <div className={style.input}>
                            <input id="amount" type="number" name="amount" />
                            <span>EVNT</span>
                        </div>
                    </div>

                    <div className={classNames(style.inputWrapper, style.onWin)}>
                        <label htmlFor={'amount'} className={style.label}>On win you get:</label>
                        <div className={style.input}>
                            <input id="amount" type="number" name="amount" value={1000} readOnly />
                            <span>EVNT</span>
                        </div>
                    </div>

                    <button onClick={() => console.log('bet placed')} className={style.betButton}>
                        {/* <Icon
                            width={18}
                            height={18}
                            iconType={IconType.featherArrowUpRight}
                            className={style.goToEventIcon}
                            circle={true}
                        /> */}
                        <span>Bet!</span>
                    </button>
                </div>
            </div>
            {renderFooter()}
        </div>
    );
};

export default EventBetPill;