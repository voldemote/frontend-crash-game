import React            from 'react';
import classNames       from 'classnames';
import Icon             from '../Icon';
import IconTheme        from '../Icon/IconTheme';
import IconType         from '../Icon/IconType';
import styles           from './styles.module.scss';
import { connect }      from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useEffect }    from 'react';
import PopupTheme       from './PopupTheme';
import BetCreation      from '../BetCreation';
import BetView          from '../BetView';
import _                from 'lodash';

const Popup = ({ type, visible, options, events, hidePopup }) => {
    useEffect(() => {
        document.body.style.overflow = visible ? 'hidden' : null;

        return () => {
            document.body.style.overflow = null;
        };
    }, [visible]);

    const renderPopup = () => {
        switch (type) {
            case PopupTheme.betCreation:
                return (
                    <BetCreation closed={!visible} />
                );
            case PopupTheme.betView:
                return (
                    <BetView closed={!visible} />
                );
        }

        return null;
    };

    return (
        <div
            className={classNames(
                styles.popupFullScreenContainer,
                visible ? null : styles.hidden,
            )}
        >
            <div className={styles.popupContainer}>
                <Icon
                    width={30}
                    height={30}
                    className={styles.closeButton}
                    iconType={IconType.deleteInput}
                    iconTheme={IconTheme.primary}
                    onClick={hidePopup}
                />
                <div className={styles.popupContentContainer}>
                    {renderPopup()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        type:    state.popup.popupType,
        options: state.popup.options,
        visible: state.popup.visible,
        events:  state.event.events,
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
)(Popup);
