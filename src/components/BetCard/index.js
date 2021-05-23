import React            from 'react';
import styles           from './styles.module.scss';
import HotBetBadge      from '../HotBetBadge';
import TimeLeftCounter  from '../TimeLeftCounter';
import HotBetBadgeTheme from '../HotBetBadge/HotBetBadgeTheme';

const BetCard = ({ user, image, marketQuestion, hot, onClick, eventEnd }) => {
    const getBetCardStyle = () => {
        return {
            backgroundImage: 'url("' + image + '")',
        };
    };

    const getProfileStyle = () => {
        return {
            backgroundImage: 'url("' + user.profilePicture + '")',
        };
    };

    const renderFooter = () => {
        return (
            <div className={styles.betCardFooter}>
                <span>
                    Event ends in:
                </span>
                <TimeLeftCounter endDate={eventEnd} />
            </div>
        );
    };

    return (
        <div
            className={styles.betCardContainer}
            onClick={onClick}
        >
            <div
                className={styles.betCard}
            >
                <div
                    className={styles.betCardBackgroundBlur}
                    style={getBetCardStyle()}
                >
                </div>
                <div
                    className={styles.betCardBackground}
                >
                </div>
                <div className={styles.betCardContentContainer}>
                    <div className={styles.profileInfo}>
                        <div
                            className={styles.profilePicture}
                            style={getProfileStyle()}
                        >
                        </div>
                        <span>
                            {user.name}
                        </span>
                    </div>
                    <div className={styles.betCardMarketQuestion}>
                        {marketQuestion}
                    </div>
                    <div>
                        {hot && <HotBetBadge theme={HotBetBadgeTheme.opacity04} />}
                    </div>
                </div>
            </div>
            {renderFooter()}
        </div>
    );
};

export default BetCard;