import React from 'react';
import { AlertActions } from '../../store/actions/alert';
import { GeneralActions } from '../../store/actions/general';
import { AuthenticationActions } from '../../store/actions/authentication';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Logout = ({ removeAlerts, logout, setOpenDrawer }) => {
  useEffect(() => {
    setOpenDrawer();
    removeAlerts();
    logout();
  }, []);

  return <></>;
};

const mapDispatchToProps = dispatch => {
  return {
    removeAlerts: () => {
      dispatch(AlertActions.removeAlerts());
    },
    logout: () => {
      dispatch(AuthenticationActions.logout());
    },
    setOpenDrawer: () => {
      dispatch(GeneralActions.setDrawer(''));
    },
  };
};

export default connect(null, mapDispatchToProps)(Logout);
