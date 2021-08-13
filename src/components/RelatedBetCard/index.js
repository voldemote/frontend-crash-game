import _                  from 'lodash';
import styles             from './styles.module.scss';
import { connect }        from 'react-redux';
import { useState }       from 'react';
import classNames         from 'classnames';
import { getDefaultUser } from '../../helper/Profile';
import TimeLeftCounter    from 'components/TimeLeftCounter';
import Icon               from 'components/Icon';
import StateBadge         from 'components/StateBadge';
import { PopupActions }   from '../../store/actions/popup';
import PopupTheme         from '../Popup/PopupTheme';
import IconType           from '../Icon/IconType';

const RelatedBetCard = ({ onClick, bet, showPopup }) => {
    const [menuOpened, setMenuOpened] = useState(false);

    const renderFooter = () => {    
        return (
            <div className={styles.pillFooter}>
                <div className={styles.timeLeftCounterContainer}>
                    <span>
                        Event ends in:
                    </span>
                    <TimeLeftCounter endDate={bet.endDate} />
                </div>
            </div>
        );
    };

    const openInfoPopup = (popupType, e) => {
        e.stopPropagation();
        const options = {
            tradeId: bet._id,
            eventId: _.get(bet, 'event'),
        };

        showPopup(popupType, options);
    };

    const renderMenuInfoIcon = () => {
        return (
            <Icon
                className={styles.menuInfoIcon}
                iconType={IconType.info}
                iconTheme={null}
                width={16}
            />
        );
    };

    const openMenu = (e) => {
        e.stopPropagation();
        setMenuOpened(!menuOpened)
    }

    return (
        <div
            className={styles.relatedBetCard}
        >
            <div className={styles.relatedBetCardContainer} onClick={onClick}>
                <div className={styles.relatedBetCardHeader}>
                    <span className={styles.title}>
                        {bet.marketQuestion}
                    </span>

                    <div className={styles.menuMain}>
                        <Icon
                            iconType={IconType.menu}
                            iconTheme={null}
                            onClick={(e) => openMenu(e)}
                        />
                        <div
                            className={classNames(
                                styles.menuBox,
                                menuOpened ? styles.menuBoxOpened : null,
                            )}
                        >
                            <div
                                className={styles.menuItem}
                                onClick={(e) => openInfoPopup(PopupTheme.eventDetails, e)}
                            >
                                {renderMenuInfoIcon()}
                                <span>
                                    See <strong>Event</strong> Details
                                </span>
                            </div>
                            <div
                                className={styles.menuItem}
                                onClick={(e) => openInfoPopup(PopupTheme.tradeDetails, e)}
                            >
                                {renderMenuInfoIcon()}
                                <span>
                                    See <strong>Trade</strong> Details
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.stateBadgeContainer}>
                    <StateBadge state={_.get(bet, 'status')} />
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
        user = _.get(
            state.user.users,
            userId,
        );
    }

    return {
        user: user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showPopup: (popupType, options) => {
            dispatch(
                PopupActions.show({
                    popupType,
                    options,
                }),
            );
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RelatedBetCard);