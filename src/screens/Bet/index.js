import classNames          from 'classnames';
import darkModeLogo        from '../../data/images/logo-darkmode.svg';
import Link                from '../../components/Link';
import Routes              from '../../constants/Routes';
import styles              from './styles.module.scss';
import { useState }        from 'react';
import ExampleProfilePicture from '../../data/images/doge.jpg';
import LiveBadge from 'components/LiveBadge';
import HotBetBadge from 'components/HotBetBadge';
import ViewerBadge from 'components/ViewerBadge';
import ChatBubble from 'components/chatBubble';

const Bet = ({ bet }) => {

    return (
        <div className={styles.bet}>
            <div className={styles.header}>
                <div className={styles.headlineContainer}>
                    <div className={styles.arrowBack}></div>
                    <div className={styles.headline}>
                        <h1>RedBull Rampage 2021</h1>
                        <LiveBadge />
                        <ViewerBadge viewers={1123} />
                    </div>
                </div>
                <img src={darkModeLogo} alt="Wallfair" />
            </div>
            <div className={styles.row}>
                <div className={styles.columnLeft}>
                    <div>
                        <iframe width="100%" height="500" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/6imi43ehYzQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className={styles.liveChat}>
                        <div className={styles.chat}>
                            <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "} date={"just now"} />
                        </div>
                        <form className={styles.messageInput}>
                            <input id="message" type="text" name="message" placeholder="Comment..." />
                            <button type="submit" onClick={() => console.log("sent")}>Send</button>
                        </form>
                    </div>
                </div>
                <div className={styles.columnRight}>
                    <div className={styles.placeBet}>
                        <div className={styles.title}>Who will win Red Bull Rampage?</div>
                        <small>by Anna Smith | Category: Sports</small>
                        <HotBetBadge className={styles.badge} />
                        <div className={styles.wrapper}>
                            <label className={styles.label}>Your bet:</label>
                            <div className={styles.input}>
                                <input id="amount" type="number" name="amount" />
                                <span>EVNT</span>
                            </div>

                            <div className={styles.buttonContainer}>
                                <label htmlFor={'choice'} className={styles.label}>Your choice &amp; possible bet:</label>
                                <div className={styles.quoteButtons}>
                                    <div>
                                        <input type="radio" value="quote1" name="bet" id="bet1" required />
                                        <label htmlFor="bet1">Paul <span>6.000 EVNT</span></label>
                                    </div>
                                    <div>
                                        <input type="radio" value="quote2" name="bet" id="bet2" required />
                                        <label htmlFor="bet2">John <span>8.000 EVNT</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button  className={styles.betButton} type="submit">Bet!</button>
                    </div>
                    <div className={styles.bettingTicker}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bet;
