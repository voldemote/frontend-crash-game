import React       from 'react';
import styles      from './styles.module.scss';
import Button      from '../Button';
import ButtonTheme from '../Button/ButtonTheme';
import StepBar     from '../StepBar';
import classNames  from 'classnames';

const StepsContainer = (
    {
        size,
        step,
        buttonContent,
        headlineClassName,
        cancelButtonContent,
        headline,
        showButton = true,
        onButtonClick,
        onCancelButtonClick,
        splittedView = false,
        buttonDisabled = false,
        hideDefaultButtonBackground = false,
        children,
        renderFooter,
    },
) => {
    const renderStepBar = () => {
        return (
            <div className={styles.stepsStepBarContainer}>
                <StepBar
                    size={size}
                    step={step}
                />
            </div>
        );
    };

    const renderHeadline = () => {
        if (headline && headline.length) {
            return (
                <p
                    className={classNames(
                        styles.stepsHeadline,
                        headlineClassName,
                    )}
                    dangerouslySetInnerHTML={{
                        __html: headline,
                    }}
                />
            );
        }

        return null;
    };

    const renderButton = () => {
        if (showButton && buttonContent) {
            return (
                <div className={styles.stepsButtonContainer}>
                    {
                        cancelButtonContent && (
                            <Button
                                className={classNames(
                                    styles.cancelButton,
                                )}
                                onClick={onCancelButtonClick}
                            >
                                {cancelButtonContent}
                            </Button>
                        )
                    }
                    <Button
                        className={classNames(
                            styles.continueButton,
                            hideDefaultButtonBackground ? styles.continueButtonHiddenBackground : null,
                        )}
                        onClick={onButtonClick}
                        disabled={buttonDisabled}
                    >
                        {buttonContent}
                    </Button>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={styles.stepsContainer}>
            {renderStepBar()}
            <div className={classNames(
                styles.stepsContentContainer,
                splittedView ? styles.splittedView : null,
            )}>
                <div>
                    {renderHeadline()}
                </div>
                <div>
                    {children}
                    {renderButton()}
                    {renderFooter && renderFooter()}
                </div>
            </div>
        </div>
    );
};

export default StepsContainer;
