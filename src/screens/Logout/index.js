import React                    from 'react';
import { AlertActions }         from '../../store/actions/alert';
import { AuthorizationActions } from '../../store/actions/authorization';
import { connect }              from 'react-redux';

const Logout = ({ removeAlerts, logout }) => {
    removeAlerts();
    logout();

    return <></>;
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeAlerts: () => {
            dispatch(AlertActions.removeAlerts());
        },
        logout:       () => {
            dispatch(AuthorizationActions.logout());
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(Logout);