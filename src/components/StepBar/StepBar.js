import classNames          from 'classnames';
import IconCheck           from '../../data/icons/check-icon.svg';
import PropTypes           from 'prop-types';
import React, { Fragment } from 'react';
import style               from './styles.module.scss';

class StepBar extends React.Component {
    render () {
        const size = this.props.size;
        const step = this.props.step;

        return (
            <div className={style.stepBar}>
                <div
                    className={style.stepBarLine}
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
            >
                {index === step ? (
                    <span
                        className={classNames(
                            style.stepBarItem,
                            style.stepBarActiveItem,
                        )}
                    >
                        {index + 1}
                    </span>
                ) : (
                    <span
                        className={classNames(
                            style.stepBarItem,
                            style.stepBarInactiveItem,
                        )}
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
