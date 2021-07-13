import React              from 'react';
import styles             from './styles.module.scss';
import HotBetBadge        from '../HotBetBadge';
import TimeLeftCounter    from '../TimeLeftCounter';
import HotBetBadgeTheme   from '../HotBetBadge/HotBetBadgeTheme';
import { getDefaultUser } from '../../helper/Profile';
import { connect }        from 'react-redux';
import _                  from 'lodash';
import ProfileContainer   from '../ProfileContainer';

const BetCard = ({ user, image, marketQuestion, hot, onClick, eventEnd }) => {
    const getBetCardStyle = () => {
        return {
            backgroundImage: 'url("' + image + '")',
        };
    };

    const renderFooter = () => {
        return (
            <div className={styles.betCardFooter}>
                <span>
                    End of Trade:
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
                    <ProfileContainer
                        className={styles.profileInfo}
                        user={user}
                    />
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

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps;
    let user         = getDefaultUser();

    if (userId) {
        user = _.find(
            state.user.users,
            {
                userId: userId,
            },
        );
    }

    return {
        user: user,
    };
};

export default connect(
    mapStateToProps,
    null,
)(BetCard);