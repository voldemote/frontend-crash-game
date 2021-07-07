import React       from 'react';
import styles      from './styles.module.scss';
import Navbar      from '../Navbar';
import { connect } from 'react-redux';
import classNames  from 'classnames';

const BaseContainerWithNavbar = ({ children, withPaddingTop, contentPadding, user }) => {
    return (
        <div className={classNames(
            styles.baseContainer,
            withPaddingTop ? styles.baseContainerWithPaddingTop : null,
            contentPadding ? styles.baseContainerWithContentPadding : null,
        )}>
            <Navbar user={user} />
            {children}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.authentication,
    };
};

export default connect(
    mapStateToProps,
    null,
)(BaseContainerWithNavbar);
