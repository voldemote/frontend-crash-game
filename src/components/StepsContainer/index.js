import React from 'react';
import styles from './styles.module.scss';
import Button from '../Button';
import StepBar from '../StepBar';
import classNames from 'classnames';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import Icon from '../Icon';

const StepsContainer = ({
  size,
  step,
  buttonContent,
  headlineClassName,
  cancelButtonContent,
  headline,
  highlightType,
  showButton = true,
  onButtonClick,
  onCancelButtonClick,
  splittedView = false,
  buttonDisabled = false,
  hideDefaultButtonBackground = false,
  children,
  renderFooter,
  onGoBackButtonClick,
  goBackSteps,
}) => {
  const renderStepBar = () => {
    return (
      <div className={styles.stepsStepBarContainer}>
        <StepBar size={size} step={step} />
      </div>
    );
  };

  const renderHeadline = () => {
    if (headline && headline.length) {
      return (
        <div className={styles.headlineContainer}>
          <p
            className={classNames(
              styles.stepsHeadline,
              splittedView ? styles.stepsHeadlineSplitView : null,
              headlineClassName
            )}
            dangerouslySetInnerHTML={{
              __html: headline,
            }}
          ></p>
        </div>
      );
    }

    return null;
  };

  const renderButton = () => {
    if (showButton && buttonContent) {
      return (
        <div
          className={classNames(
            styles.stepsButtonContainer,
            goBackSteps ? styles.authStepsContainer : null
          )}
        >
          {cancelButtonContent && (
            <Button
              className={classNames(styles.cancelButton)}
              onClick={onCancelButtonClick}
            >
              {cancelButtonContent}
            </Button>
          )}

          {onGoBackButtonClick && goBackSteps.includes(step) && (
            <Button
              className={classNames(
                styles.continueButton,
                onGoBackButtonClick ? styles.goBackButton : null
              )}
              withoutBackground={hideDefaultButtonBackground}
              highlightType={highlightType}
              onClick={onGoBackButtonClick}
              disabled={buttonDisabled}
            >
              <Icon iconType={IconType.arrowLeft} iconTheme={IconTheme.black} />
            </Button>
          )}
          <Button
            className={styles.continueButton}
            withoutBackground={hideDefaultButtonBackground}
            highlightType={highlightType}
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
      <div
        className={classNames(
          styles.stepsContentContainer,
          splittedView ? styles.splitView : null
        )}
      >
        <div>{renderHeadline()}</div>
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
