import React                     from 'react';
import { AlertActions }          from '../../store/actions/alert';
import { AuthenticationActions } from '../../store/actions/authentication';
import { connect }               from 'react-redux';
import { useEffect }             from 'react';

const Logout = ({ removeAlerts, logout }) => {
    useEffect(
        () => {
            removeAlerts();
            logout();
        },
        [],
    );

    return <></>;
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeAlerts: () => {
            dispatch(AlertActions.removeAlerts());
        },
        logout:       () => {
            dispatch(AuthenticationActions.logout());
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(Logout);