import _                from 'lodash';
import React            from 'react';
import State            from '../../helper/State';
import styles           from './styles.module.scss';
import { connect }      from 'react-redux';
import { PopupActions } from '../../store/actions/popup';

const TradeDetailView = ({ trade }) => {

    return (
        <div className={styles.tradeDetailContainer}>
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
