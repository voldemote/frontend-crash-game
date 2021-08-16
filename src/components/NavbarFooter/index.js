import styles    from './styles.module.scss';
import classNames from 'classnames';
import { matchPath } from 'react-router-dom';
import { connect }              from 'react-redux';
import { useEffect, useState } from 'react';
import { useHasMounted }      from '../hoc/useHasMounted';

const NavbarFooter = ({children, className = null, location, hideForRoutes = []}) => {

    if (hideForRoutes.some(route => matchPath(location.pathname, route))) {
        return null;
    }

    return (
        <div className={classNames(styles.navbarFooter, className)}>
            {children}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        location: state.router.location,
    };
};

export default connect(mapStateToProps)(NavbarFooter);