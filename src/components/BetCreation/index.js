import _ from 'lodash';
import BetSummaryContainer from '../BetSummaryContainer';
import BetSummaryHelper from '../../helper/BetSummary';
import Button from '../Button';
import CheckBox from '../CheckBox';
import classNames from 'classnames';
import Dropdown from '../../components/Dropdown';
import ErrorHint from '../ErrorHint';
import HighlightType from '../Highlight/HighlightType';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType from '../Icon/IconType';
import InputBox from '../../components/InputBox';
import InputBoxTheme from '../../components/InputBox/InputBoxTheme';
import moment from 'moment';
import React from 'react';
import Routes from '../../constants/Routes';
import StepsContainer from '../../components/StepsContainer';
import styles from './styles.module.scss';
import { BetActions } from '../../store/actions/bet';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useEffect } from 'react';
import { useIsMount } from '../hoc/useIsMount';
import { useState } from 'react';

const BetCreation = ({ hidePopup, closed, events, eventId, createBet }) => {
  const initialState = {
    step: 0,
    error: null,
    marketQuestion: '',
    description: '',
    eventUrl: null,
    selectedDate: null,
    selectedEndTime: null,
    termsAndConditionsAccepted: false,
    endOfStreamAsEndDate: false,
    outcomes: [{}, {}],
  };
  const [step, setStep] = useState(initialState.step);
  const [error, setError] = useState(initialState.error);
  const [marketQuestion, setMarketQuestion] = useState(
    initialState.marketQuestion
  );
  const [description, setDescription] = useState(initialState.description);
  const [eventUrl, setEventUrl] = useState(initialState.eventUrl);
  const [selectedDate, setSelectedDate] = useState(initialState.selectedDate);
  const [selectedEndTime, setSelectedEndTime] = useState(
    initialState.selectedEndTime
  );
  // @TODO: this is unused atm, can we safely remove that?
  // const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(initialState.termsAndConditionsAccepted);
  const [endOfStreamAsEndDate, setEndOfStreamAsEndDate] = useState(
    initialState.endOfStreamAsEndDate
  );
  const [outcomes, setOutcomes] = useState(initialState.outcomes);
  const isMount = useIsMount();

  const resetStates = () => {
    setMarketQuestion(initialState.marketQuestion);
    setDescription(initialState.description);
    setEventUrl(initialState.eventUrl);
    setSelectedDate(initialState.selectedDate);
    setSelectedEndTime(initialState.selectedEndTime);
    setOutcomes(initialState.outcomes);
    setStep(initialState.step);
    setError(initialState.error);
  };

  const validateInput = () => {
    let valid = true;
    let error = [];

    switch (step) {
      case 0:
        if (!eventUrlIsValid()) {
          error = 'Please select a valid event url!';
          valid = false;
        }

        break;
      case 1:
        if (!marketQuestionIsValid()) {
          error[0] = 'Please enter a market question!';
          valid = false;
        }

        if (!descriptionIsValid()) {
          error[1] = 'Please enter a description!';
          valid = false;
        }

        break;
      case 2:
        _.forEach(outcomes, function (outcome, index) {
          if (!outcome.value) {
            error = 'Please enter valid outcomes!';
            valid = false;
          }
        });

        break;
      case 3:
        if (!endOfStreamAsEndDate) {
          if (!dateIsValid()) {
            error[0] = 'Please enter a valid date!';
            error[2] = 'Or select end of stream as date';
            valid = false;
          }

          if (!endTimeIsValid()) {
            error[1] = 'Please enter a valid time!';
            valid = false;
          }
        }

        break;

      // case 4:
      //    if (!termsAndConditionsAccepted) {
      //        error = 'Please accept our terms and conditions!';
      //        valid = false;
      //    }

      //    break;
    }

    if (error.length > 0) {
      setError(error);
    } else {
      setError(null);
    }

    return valid;
  };

  const marketQuestionIsValid = () => {
    return marketQuestion && marketQuestion.length;
  };

  const descriptionIsValid = () => {
    return true;
  };

  const eventUrlIsValid = () => {
    return eventUrl !== null;
  };

  const dateIsValid = () => {
    return selectedDate && selectedDate.isValid();
  };

  const endTimeIsValid = () => {
    return selectedEndTime && selectedEndTime.isValid();
  };

  useEffect(
    () => {
      if (!isMount && !closed) {
        validateInput();
      }
    },
    // @TODO: this possibly needs refactoring and or adding remaining deps,
    // the functions that do not depend on state or props should move out of the component.
    // for the other functions useCallback() would make sense to prevent unnecessary rerenders (e.g. validateInput)
    [eventUrl, marketQuestion, outcomes, selectedDate]
  );

  useEffect(() => {
    if (!isMount && closed) {
      resetStates();
    }
  }, [closed]);

  useEffect(() => {
    if (eventId && step === 0) {
      setStep(1);
      setEventUrl(eventUrl);
    } else if (!eventId && step === 1) {
      setStep(0);
    }
  }, [eventId]);

  const getEventUrlOptions = () => {
    return _.map(events, event => {
      return {
        label: event.name + ' - ' + event.streamUrl,
        value: event._id,
      };
    });
  };

  const getEvent = () => {
    const event = _.find(events, {
      _id: eventUrl,
    });

    return event;
  };

  const getDateWithTime = time => {
    const dateTime = moment(selectedDate);

    dateTime.hours(time.hours());
    dateTime.minutes(time.minutes());
    dateTime.seconds(time.seconds());

    return dateTime;
  };

  const getEndDateTime = () => {
    let dateWithTime;

    if (endOfStreamAsEndDate) {
      dateWithTime = moment(_.get(getEvent(), 'endDate'));
    } else {
      dateWithTime = getDateWithTime(selectedEndTime);
    }

    return moment(dateWithTime).toDate();
  };

  const getButtonContent = () => {
    if (step <= 1) {
      return 'Next Step';
    } else if (step === 2) {
      return 'Last Step';
    } else if (step === 3) {
      return (
        <div className={styles.publishBetButton}>
          <Icon iconType={IconType.bet} iconTheme={IconTheme.primary} />
          Publish Bet!
        </div>
      );
    }

    return null;
  };

  const getCancelButtonContent = () => {
    if (step === 0) {
      return 'Cancel';
    } else if (step <= 3) {
      return 'Go back';
    }

    return null;
  };

  const getHeadline = () => {
    switch (step) {
      case 0:
        return 'Choose Event';
      case 1:
        return 'Create Trade';
      case 2:
        return 'Define outcomes';
      case 3:
        return 'When does the trade end?';
      // case 4:
      //    return 'Accept Terms and Conditions';
      case 4:
        return 'Awesome, that looks great!';
    }

    return null;
  };

  const getError = index => {
    if (_.isArray(error)) {
      return error[index];
    }
  };

  const onConfirm = () => {
    const validInput = validateInput();

    if (validInput) {
      if (step <= 3) {
        if (step === 3) {
          const endTime = getEndDateTime();

          createBet(eventUrl, marketQuestion, description, outcomes, endTime);
        }

        setStep(step + 1);
      }
    }
  };

  const onCancel = () => {
    if (step === 0) {
      hidePopup();
    } else if (step <= 3) {
      setStep(step - 1);
    }
  };

  const setOutcomeValue = index => {
    return value => {
      let newOutcomes = [...outcomes];

      newOutcomes[index].value = value;

      setOutcomes(newOutcomes);
    };
  };

  const renderMarketQuestionAndDescription = () => {
    return (
      <div className={styles.marketQuestionAndDescription}>
        <InputBox
          containerClassName={styles.marketQuestion}
          type={'text'}
          invitationText={'What to trade on?'}
          errorText={getError(0)}
          placeholder={'Who will win the race?'}
          value={marketQuestion}
          setValue={setMarketQuestion}
        />
        <InputBox
          type={'text'}
          invitationText={'Enter a short description'}
          errorText={getError(1)}
          placeholder={'A race between...'}
          value={description}
          setValue={setDescription}
        />
      </div>
    );
  };

  const renderOutcomeInputs = () => {
    const size = outcomes.length;

    return _.times(size, index => {
      const outcome = outcomes[index];
      let theme = InputBoxTheme.coloredBorderMint;

      if (index % 2 === 0) {
        theme = InputBoxTheme.coloredBorderLightPurple;
      }

      return (
        <div className={styles.outcomeRow}>
          <InputBox
            value={outcome.value}
            placeholder={'Outcome #' + (index + 1)}
            setValue={setOutcomeValue(index)}
            theme={theme}
          />
        </div>
      );
    });
  };

  const addOutcomeButtonClicked = () => {
    setOutcomes([...outcomes, {}]);
  };

  const renderOutcomeCreator = () => {
    return (
      <div className={styles.outcomeCreator}>
        <div className={styles.outcomeRow}>Event outcomes</div>
        {renderOutcomeInputs()}
        <ErrorHint className={styles.outcomeErrorHint} errorText={error} />
        <div className={styles.outcomeRow}>
          <Button
            className={styles.addOutcomeButton}
            onClick={addOutcomeButtonClicked}
          >
            + Outcome
          </Button>
        </div>
      </div>
    );
  };

  const renderDateAndTime = () => {
    return (
      <div className={styles.dateAndTimeContainer}>
        <div className={styles.dateContainer}>
          <InputBox
            type={'date'}
            invitationText={'Choose Date'}
            value={selectedDate}
            setValue={setSelectedDate}
            placeholder={'Today'}
            showDeleteIcon={false}
            errorText={getError(0)}
          />
        </div>
        <div className={styles.timeContainer}>
          <InputBox
            type={'time'}
            invitationText={'End of the trade'}
            value={selectedEndTime}
            setValue={setSelectedEndTime}
            placeholder={'02:30 PM'}
            showDeleteIcon={false}
            errorText={getError(1)}
          />
        </div>
        <div className={styles.setEndOfStreamContainer}>
          <CheckBox
            checked={endOfStreamAsEndDate}
            setChecked={setEndOfStreamAsEndDate}
            text={'Set end of stream as default'}
            errorText={getError(2)}
          />
        </div>
      </div>
    );
  };
  // @TODO: this will come back soon enough
  //   const renderTermsAndConditions = () => {
  //       const checkboxText = (
  //           <>I accept the <Link to={Routes.termsAndConditions}>terms and conditions</Link>.</>
  //       );

  //       return (
  //           <div className={styles.termsAndConditionsContainer}>
  //               <span>
  //                   In order to publish the bet, you need to accept our <Link to={Routes.termsAndConditions}>terms and conditions</Link>.
  //                   <br />
  //                   <br />
  //                   <CheckBox
  //                       checked={termsAndConditionsAccepted}
  //                       setChecked={setTermsAndConditionsAccepted}
  //                       text={checkboxText}
  //                       errorText={error}
  //                   />
  //               </span>
  //           </div>
  //       );
  //   };

  const getSummaryOutcomeRows = () => {
    const summaryOutcomeRows = [];

    _.each(outcomes, (outcome, index) => {
      summaryOutcomeRows.push(
        BetSummaryHelper.getDivider(),
        BetSummaryHelper.getKeyValue('Outcome #' + (index + 1), outcome.value)
      );
    });

    return summaryOutcomeRows;
  };

  const renderSummary = () => {
    const event = getEvent();
    const eventTitle = _.get(event, 'name', null);

    const bet = event.bets.find(
      bet =>
        bet.marketQuestion === marketQuestion &&
        bet.description === description &&
        _.isEqual(
          bet.outcomes.map(_.property('name')),
          outcomes.map(_.property('value'))
        )
    );

    const summaryRows = _.concat(getSummaryOutcomeRows(), [
      BetSummaryHelper.getDivider(),
      BetSummaryHelper.getKeyValue(
        'Bet Link:',
        Routes.getRouteWithParameters(Routes.bet, {
          eventId: eventUrl,
          betId: bet && bet._id,
        }),
        false,
        false,
        null,
        true,
        true,
        undefined,
        undefined,
        undefined,
        'Bet Details',
        '_self'
      ),
      BetSummaryHelper.getKeyValue('Event Title:', eventTitle),
    ]);

    return (
      <BetSummaryContainer
        marketQuestion={marketQuestion}
        endDate={getEndDateTime()}
        summaryRows={summaryRows}
      />
    );
  };

  const renderContent = () => {
    if (step === 0) {
      return (
        <Dropdown
          errorText={error}
          value={eventUrl}
          setValue={setEventUrl}
          placeholder={'https://www.twitch.tv/...'}
          options={getEventUrlOptions()}
        />
      );
    } else if (step === 1) {
      return renderMarketQuestionAndDescription();
    } else if (step === 2) {
      return renderOutcomeCreator();
    } else if (step === 3) {
      return renderDateAndTime();
      // } else if (step === 4) {
      //     return renderTermsAndConditions();
    } else if (step === 4) {
      return renderSummary();
    }
  };

  return (
    <StepsContainer
      step={step}
      size={4}
      headlineClassName={styles.stepsHeadline}
      headline={getHeadline()}
      buttonContent={getButtonContent()}
      highlightType={HighlightType.highlightHomeCtaBet}
      cancelButtonContent={getCancelButtonContent()}
      onCancelButtonClick={onCancel}
      onButtonClick={onConfirm}
      hideDefaultButtonBackground={true}
      splittedView={step === 4}
      buttonDesktopMargin={true}
    >
      <div
        className={classNames(
          styles.contentContainer,
          step >= 4 ? styles.fullHeightContentContainer : null
        )}
      >
        <div className={classNames(styles.contentContentContainer)}>
          {renderContent()}
        </div>
      </div>
    </StepsContainer>
  );
};

const mapStateToProps = state => {
  return {
    events: state.event.events,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    createBet: (
      eventId,
      marketQuestion,
      description,
      outcomes,
      endDate,
      liquidityAmount = 1000,
      callback
    ) => {
      dispatch(
        BetActions.create({
          eventId,
          marketQuestion,
          description,
          outcomes,
          endDate,
          liquidityAmount,
          callback,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BetCreation);
