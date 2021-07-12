import _                from 'lodash';
import React            from 'react';
import State            from '../../helper/State';
import styles           from './styles.module.scss';
import { connect }      from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import Icon             from '../Icon';
import IconType         from '../Icon/IconType';

const TradeDetailView = ({ trade }) => {
    const renderHeader = () => {
        return (
            <div className={styles.headline}>
                <Icon
                    className={styles.headlineIcon}
                    iconType={IconType.info}
                    width={16}
                    height={16}
                />
                <span className={styles.headlineText}>
                    See <strong>Trade</strong> Details
                </span>
            </div>
        );
    };

    const renderHeadline = () => {
        const marketQuestion = _.get(trade, 'marketQuestion');

        return (
            <div className={styles.tradeDetailHeadline}>
                {marketQuestion}
            </div>
        );
    };

    return (
        <div className={styles.tradeDetailContainer}>
            {renderHeader()}
            {renderHeadline()}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const tradeId = _.get(ownProps, 'tradeId');
    const trade   = State.getTrade(tradeId, state.event.events);

    return {
        trade,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hidePopup: () => {
            dispatch(PopupActions.hide());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TradeDetailView);
