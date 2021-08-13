import _                  from 'lodash';
import styles             from './styles.module.scss';
import { connect }        from 'react-redux';
import { useState }       from 'react';
import classNames         from 'classnames';
import { getDefaultUser } from '../../helper/Profile';
import TimeLeftCounter    from 'components/TimeLeftCounter';
import Icon               from 'components/Icon';
import StateBadge         from 'components/StateBadge';
import { formatToFixed }  from '../../helper/FormatNumbers';
import { PopupActions }   from '../../store/actions/popup';
import PopupTheme         from '../Popup/PopupTheme';
import IconType           from '../Icon/IconType';

const MyBetCard = ({ onClick, transaction, showPopup }) => {
    const [menuOpened, setMenuOpened] = useState(false);

    const renderFooter = () => {    
        return (
            <div className={styles.pillFooter}>
                <div className={styles.timeLeftCounterContainer}>
                    <span>
                        Event ends in:
                    </span>
                    <TimeLeftCounter endDate={transaction.bet.endDate} />
                </div>
            </div>
        );
    };

    const renderMyTradeBlock = () => {
        const amount        = formatToFixed(_.get(transaction, 'investmentAmount', 0));
        const outcomeIndex  = _.get(transaction, 'outcome');
        const outcomeValue  = _.get(transaction.bet, ['outcomes', outcomeIndex, 'name']);
        const outcomeReturn = formatToFixed(_.get(transaction, transaction.outcomeAmount ? 'outcomeAmount' : 'outcomeTokensBought', 0));

        return (
            <div className={styles.tradeInfoContainer}>
                <div className={styles.summaryRow}>
                    <span className={styles.infoName}>Start Price:</span>
                    <span className={styles.infoValue}>{amount} EVNT</span>
                </div>
                <div className={styles.summaryRow}>
                    <span className={styles.infoName}>Your Prediction:</span>
                    <span className={styles.infoValue}>{outcomeValue}</span>
                </div>
                <div className={styles.divider}></div>

                <div className={styles.summaryRow}>
                    <span className={styles.cashoutValue}>Cashout {outcomeReturn} EVNT</span>
                </div>
            </div>
        )
    }

    const openInfoPopup = (popupType, e) => {
        e.stopPropagation();
        const options = {
            tradeId: transaction.bet._id,
            eventId: _.get(transaction.event, '_id'),
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
            className={styles.myBetCard}
        >
            <div className={styles.myBetCardContainer} onClick={onClick}>
                <div className={styles.myBetCardHeader}>
                    <span className={styles.title}>
                        {transaction.bet.marketQuestion}
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
                    <StateBadge state={_.get(transaction.bet, 'status')} />
                </div>
            </div>
            {renderMyTradeBlock()}
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
)(MyBetCard);