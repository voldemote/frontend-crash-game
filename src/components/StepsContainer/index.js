import React       from 'react';
import styles      from './styles.module.scss';
import Button      from '../Button';
import ButtonTheme from '../Button/ButtonTheme';
import StepBar     from '../StepBar';

const StepsContainer = (
    {
        size,
        step,
        buttonContent,
        headline,
        showButton = true,
        onButtonClick,
        buttonDisabled = false,
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
                    className={styles.stepsHeadline}
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
                <Button
                    theme={ButtonTheme.authenticationScreenButton}
                    className={styles.stepsButton}
                    onClick={onButtonClick}
                    disabled={buttonDisabled}
                >
                    {buttonContent}
                </Button>
            );
        }

        return null;
    };

    return (
        <div className={styles.stepsContainer}>
            <div className={styles.stepsContentContainer}>
                {renderStepBar()}
                {renderHeadline()}
                {children}
                {renderButton()}
                {renderFooter && renderFooter()}
            </div>
        </div>
    );
};

export default StepsContainer;
