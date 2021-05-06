import IconCheck           from '../../data/icons/check-icon.svg';
import PropTypes           from 'prop-types';
import React, { Fragment } from 'react';
import style               from './styles.module.scss';
import Theme               from '../../themes/theme.js';

class StepBar extends React.Component {
    getStepBarLineStyle = () => {
        return {
            backgroundColor: Theme.colors.gray_light,
        };
    };

    getStepBarItemIncompleteStyle = () => {
        return {
            border: `'1px solid ${Theme.colors.gray_light};'`,
        };
    };

    getStepBarActiveItemStyle = () => {
        return {
            fontFamily: Theme.fonts.regular,
            color:      Theme.colors.primary,
        };
    };

    getStepBarInactiveItemStyle = () => {
        return {
            fontFamily: Theme.fonts.regular,
            color:      Theme.colors.gray_light,
        };
    };

    render () {
        const size = this.props.size;
        const step = this.props.step;

        return (
            <div className={style.stepBar}>
                <div
                    className={style.stepBarLine}
                    style={this.getStepBarLineStyle()}
                >
                </div>
                {[...Array(size)].map((arr, index) => (
                    <Fragment key={index}>
                        {index < step ? this.renderStepBarItemComplete() : this.renderStepBarItemIncomplete(index, step)}
                    </Fragment>
                ))}
            </div>
        );
    }

    renderStepBarItemComplete = () => {
        return (
            <div className={style.stepBarItemComplete}>
                <img
                    className={style.stepCompleteItem}
                    src={IconCheck}
                    alt=""
                />
            </div>
        );
    };

    renderStepBarItemIncomplete = (index, step) => {
        return (
            <div
                className={style.stepBarItemIncomplete}
                style={this.getStepBarItemIncompleteStyle()}
            >
                {index === step ? (
                    <span
                        className={style.stepBarItem}
                        style={this.getStepBarActiveItemStyle()}
                    >
                        {index + 1}
                    </span>
                ) : (
                    <span
                        className={style.stepBarItem}
                        style={this.getStepBarInactiveItemStyle()}
                    >
                        {index + 1}
                    </span>
                )}
            </div>
        );
    };
}

const Component = StepBar;

Component.propTypes = {
    size: PropTypes.bool,
    step: PropTypes.number,
};

Component.defaultProps = {
    size: null,
    step: null,
};

export default Component;
