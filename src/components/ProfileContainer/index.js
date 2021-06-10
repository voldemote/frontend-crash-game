import _              from 'lodash';
import classNames     from 'classnames';
import ProfilePicture from '../ProfilePicture';
import React          from 'react';
import styles         from './styles.module.scss';
import { connect }    from 'react-redux';

const ProfileContainer = ({ className, user }) => {
    return (
        <div
            className={classNames(
                styles.profileContainer,
                className,
            )}
        >
            <ProfilePicture user={user} />
            <span className={styles.profileName}>
                {_.get(user, 'name')}
            </span>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    let { user } = ownProps;

    if (!user) {
        user = state.authentication;
    }

    return {
        user,
    };
};

export default connect(
    mapStateToProps,
    null,
)(ProfileContainer);
