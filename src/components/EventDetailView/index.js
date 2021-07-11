import _                from 'lodash';
import React            from 'react';
import State            from '../../helper/State';
import styles           from './styles.module.scss';
import { connect }      from 'react-redux';
import { PopupActions } from '../../store/actions/popup';

const EventDetailView = ({ event }) => {

    return (
        <div className={styles.eventDetailContainer}>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const eventId = _.get(ownProps, 'eventId');
    const event   = State.getEvent(eventId, state.event.events);

    return {
        event,
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
)(EventDetailView);
