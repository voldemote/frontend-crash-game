import _                   from 'lodash';
import BetSummaryContainer from '../BetSummaryContainer';
import BetSummaryHelper    from '../../helper/BetSummary';
import Icon                from '../Icon';
import IconTheme           from '../Icon/IconTheme';
import IconType            from '../Icon/IconType';
import moment              from 'moment';
import React               from 'react';
import styles              from './styles.module.scss';
import { connect }         from 'react-redux';
import Button              from '../Button';
import HighlightTheme      from '../Highlight/HighlightTheme';
import HighlightType       from '../Highlight/HighlightType';
import { PopupActions }    from '../../store/actions/popup';

const WelcomeView = ({ closed, user, hidePopup }) => {
    const renderHeadline = () => {
        const name = _.get(user, 'name');

        return (
            <span className={styles.welcomeHeadline}>
                Welcome, {name} ❤️
            </span>
        );
    };

    const renderWelcomeText = () => {
        return (
            <div className={styles.welcomeTextContainer}>
                <span className={styles.welcomeTextHeadline}>
                    1.000 EVNT
                </span>
                <span className={styles.welcomeTextText}>
                    Free for full Wallfair experience!
                </span>
            </div>
        );
    };

    const renderStartTradingButton = () => {
        return (
            <Button
                highlightType={HighlightType.highlightHomeCtaBet}
                withoutBackground={true}
                onClick={hidePopup}
            >
                Start Trading
            </Button>
        );
    };

    return (
        <div className={styles.welcomeContainer}>
            {renderHeadline()}
            {renderWelcomeText()}
            {renderStartTradingButton()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.authentication,
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
)(WelcomeView);
