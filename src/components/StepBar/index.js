import classNames          from 'classnames';
import IconCheck           from '../../data/icons/check-icon.svg';
import React, { Fragment } from 'react';
import style               from './styles.module.scss';

const StepBar = ({ size, step }) => {
    const renderStepBarItemComplete = () => {
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

    const renderStepBarItemIncomplete = (index, step) => {
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

    return (
        <div className={style.stepBar}>
            <div
                className={style.stepBarLine}
            >
            </div>
            {
                [...Array(size)].map(
                    (arr, index) => (
                        <Fragment key={index}>
                            {index < step ? renderStepBarItemComplete() : renderStepBarItemIncomplete(index, step)}
                        </Fragment>
                    ),
                )
            }
        </div>
    );
};

export default StepBar;
