import AlertType        from './AlertType';
import Icon             from '../Icon';
import IconType         from '../Icon/IconType';
import React            from 'react';
import styles           from './styles.module.scss';
import { connect }      from 'react-redux';
import { AlertActions } from '../../store/actions/alert';

const AlertBox = ({ alerts, removeAlert }) => {
    const renderAlertIcon = (alert) => {
        switch (alert.type) {
            case AlertType.success:
                return (
                    <Icon
                        className={styles.alertIcon}
                        iconType={IconType.success}
                    />
                );

            case AlertType.error:

                return (
                    <Icon
                        className={styles.alertIcon}
                        iconType={IconType.attention}
                    />
                );

            case AlertType.info:

                return (
                    <Icon
                        className={styles.alertIcon}
                        iconType={IconType.info}
                    />
                );
        }

        return null;
    };

    const onAlertXClick = (alert, index) => {
        return () => {
            removeAlert({ index });
        };
    };

    const renderAlert = (alert, index) => {
        return (
            <div className={styles.alertContainer}>
                {renderAlertIcon(alert)}
                <span className={styles.alertMessage}>
                    {alert.message}
                </span>
                <Icon
                    className={styles.closeIcon}
                    iconType={IconType.deleteInput}
                    onClick={onAlertXClick(alert, index)}
                />
            </div>
        );
    };

    const renderAlerts = () => {
        if (alerts !== null) {
            return (
                <>
                    {alerts.map(renderAlert)}
                </>
            );
        }

        return null;
    };

    return (
        <div className={styles.alertBoxContainer}>
            {renderAlerts()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        alerts: state.alert.alerts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeAlert: (index) => {
            dispatch(AlertActions.removeAlert(index));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AlertBox);
