import styles      from './styles.module.scss';
import HotBetBadge from 'components/HotBetBadge';

const BetPlaceContainer = () => {

    return (
        <div className={styles.placeBet}>
            <div className={styles.headline}>
                <div className={styles.title}>Who will win Red Bull Rampage?</div>
                <small>by Anna Smith | Category: Sports</small>
                <HotBetBadge className={styles.badge} />
            </div>

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
                            <input type="radio" value="quote1" name="betEventId" id="betEventIdOption1" required />
                            <label htmlFor="betEventIdOption1">Paul <span>6.000 EVNT</span></label>
                        </div>
                        <div>
                            <input type="radio" value="quote2" name="betEventId" id="betEventIdOption2" required />
                            <label htmlFor="betEventIdOption2">John <span>8.000 EVNT</span></label>
                        </div>
                    </div>
                </div>
            </div>
            <button  className={styles.betButton} type="submit">Bet!</button>
        </div>
    );
};

export default BetPlaceContainer;
