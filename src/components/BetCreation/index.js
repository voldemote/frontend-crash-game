import _                   from 'lodash';
import classNames          from 'classnames';
import Divider             from '../../components/Divider';
import Dropdown            from '../../components/Dropdown';
import Icon                from '../Icon';
import IconType            from '../Icon/IconType';
import InputBox            from '../../components/InputBox';
import InputBoxTheme       from '../../components/InputBox/InputBoxTheme';
import Link                from '../../components/Link';
import moment              from 'moment';
import React               from 'react';
import StepsContainer      from '../../components/StepsContainer';
import styles              from './styles.module.scss';
import { connect }         from 'react-redux';
import { PopupActions }    from '../../store/actions/popup';
import { useEffect }       from 'react';
import { useIsMount }      from '../hoc/useIsMount';
import { useState }        from 'react';
import { BetActions }      from '../../store/actions/bet';
import HighlightType       from '../Highlight/HighlightType';
import Routes              from '../../constants/Routes';
import CheckBox            from '../CheckBox';
import BetSummaryContainer from '../BetSummaryContainer';
import BetSummaryHelper    from '../../helper/BetSummary';
import IconTheme           from '../Icon/IconTheme';

const BetCreation = ({ hidePopup, closed, events, eventId, createBet }) => {
          const initialState                                                = {
              step:                       eventId ? 1 : 0,
              error:                      null,
              marketQuestion:             '',
              description:                '',
              eventUrl:                   eventId ? eventId : null,
              selectedDate:               null,
              selectedEndTime:            null,
              termsAndConditionsAccepted: false,
              outcomes:                   [{}, {}],
          };
          const [step, setStep]                                             = useState(initialState.step);
          const [error, setError]                                           = useState(initialState.error);
          const [marketQuestion, setMarketQuestion]                         = useState(initialState.marketQuestion);
          const [description, setDescription]                               = useState(initialState.description);
          const [eventUrl, setEventUrl]                                     = useState(initialState.eventUrl);
          const [selectedDate, setSelectedDate]                             = useState(initialState.selectedDate);
          const [selectedEndTime, setSelectedEndTime]                       = useState(initialState.selectedEndTime);
          const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(initialState.termsAndConditionsAccepted);
          const [outcomes, setOutcomes]                                     = useState(initialState.outcomes);
          const isMount                                                     = useIsMount();

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
                          valid    = false;
                      }

                      if (!descriptionIsValid()) {
                          error[1] = 'Please enter a description!';
                          valid    = false;
                      }

                      break;
                  case 2:
                      _.forEach(
                          outcomes,
                          function (outcome, index) {
                              if (!outcome.value) {
                                  error[index] = 'Please enter a valid outcome!';
                                  valid        = false;
                              }
                          },
                      );

                      break;
                  case 3:
                      if (!dateIsValid()) {
                          error[0] = 'Please enter a valid date!';
                          valid    = false;
                      }

                      if (!endTimeIsValid()) {
                          error[1] = 'Please enter a valid time!';
                          valid    = false;
                      }

                      break;

                  case 4:
                      if (!termsAndConditionsAccepted) {
                          error = 'Please accept our terms and conditions!';
                          valid = false;
                      }

                      break;
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
              [eventUrl, marketQuestion, outcomes, selectedDate],
          );

          useEffect(
              () => {
                  if (!isMount && closed) {
                      resetStates();
                  }
              },
              [closed],
          );

          const getEventUrlOptions = () => {
              return _.map(
                  events,
                  (event) => {
                      return {
                          label: event.name + ' - ' + event.streamUrl,
                          value: event._id,
                      };
                  },
              );
          };

          const getDateWithTime = (time) => {
              const dateTime = moment(selectedDate);

              dateTime.hours(time.hours());
              dateTime.minutes(time.minutes());
              dateTime.seconds(time.seconds());

              return dateTime;
          };

          const getEndDateTime = () => {
              const time = selectedEndTime;

              return getDateWithTime(time);
          };

          const getButtonContent = () => {
              if (step <= 2) {
                  return 'Next Step';
              } else if (step === 3) {
                  return 'Last Step';
              } else if (step === 4) {
                  return (
                      <div className={styles.publishBetButton}>
                          <Icon
                              iconType={IconType.bet}
                              iconTheme={IconTheme.primary}
                          />
                          Publish Bet!
                      </div>
                  );
              }

              return null;
          };

          const getCancelButtonContent = () => {
              if (step === 0) {
                  return 'Cancel';
              } else if (step <= 4) {
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
                  case 4:
                      return 'Accept Terms and Conditions';
                  case 5:
                      return 'Awesome, that looks great!';
              }

              return null;
          };

          const getError = (index) => {
              if (_.isArray(error)) {
                  return error[index];
              }
          };

          const onConfirm = () => {
              const validInput = validateInput();

              if (validInput) {
                  if (step <= 4) {
                      if (step === 4) {
                          createBet(eventUrl, marketQuestion, description, outcomes, getEndDateTime());
                      }

                      setStep(step + 1);
                  }
              }
          };

          const onCancel = () => {
              if (step === 0) {
                  hidePopup();
              } else if (step <= 4) {
                  setStep(step - 1);
              }
          };

          const setOutcomeValue = (index) => {
              return (value) => {
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

              return (
                  _.times(
                      size,
                      (index) => {
                          const outcome = outcomes[index];
                          let theme     = InputBoxTheme.coloredBorderMint;

                          if (index % 2 === 0) {
                              theme = InputBoxTheme.coloredBorderLightPurple;
                          }

                          return (
                              <div className={styles.outcomeRow}>
                                  <InputBox
                                      value={outcome.value}
                                      placeholder={'Outcome #' + (
                                          index + 1
                                      )}
                                      setValue={setOutcomeValue(index)}
                                      errorText={getError(index)}
                                      theme={theme}
                                  />
                              </div>
                          );
                      },
                  )
              );
          };

          const renderOutcomeCreator = () => {
              return (
                  <div className={styles.outcomeCreator}>
                      <div className={styles.outcomeRow}>
                          Event outcomes
                      </div>
                      {renderOutcomeInputs()}
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
                  </div>
              );
          };

          const renderTermsAndConditions = () => {
              const checkboxText = (
                  <>I accept the <Link to={Routes.termsAndConditions}>terms and conditions</Link>.</>
              );

              return (
                  <div className={styles.termsAndConditionsContainer}>
                      <span>
                          In order to publish the bet, you need to accept our <Link to={Routes.termsAndConditions}>terms and conditions</Link>.
                          <br />
                          <br />
                          <CheckBox
                              checked={termsAndConditionsAccepted}
                              setChecked={setTermsAndConditionsAccepted}
                              text={checkboxText}
                              errorText={error}
                          />
                      </span>
                  </div>
              );
          };

          const getSummaryOutcomeRows = () => {
              const summaryOutcomeRows = [];

              _.each(
                  outcomes,
                  (outcome, index) => {
                      summaryOutcomeRows.push(
                          BetSummaryHelper.getDivider(),
                          BetSummaryHelper.getKeyValue(
                              'Outcome #' + (
                                  index + 1
                              ),
                              outcome.value,
                          ),
                          BetSummaryHelper.getKeyValue(
                              'Probability #' + (
                                  index + 1
                              ),
                              50,
                          ),
                      );
                  },
              );

              return summaryOutcomeRows;
          };

          const renderSummary = () => {
              const summaryRows = _.concat(
                  getSummaryOutcomeRows(),
                  [
                      BetSummaryHelper.getDivider(),
                      BetSummaryHelper.getKeyValue(
                          'Event Link:',
                          Routes.getRouteWithParameters(
                              Routes.bet,
                              {
                                  eventId: eventUrl,
                              },
                          ),
                          false,
                          false,
                          null,
                          true,
                      ),
                      BetSummaryHelper.getKeyValue(
                          'Event Title:',
                          'TBD',
                      ),
                  ],
              );

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
              } else if (step === 4) {
                  return renderTermsAndConditions();
              } else if (step === 5) {
                  return renderSummary();
              }
          };

          return (
              <StepsContainer
                  step={step}
                  size={5}
                  headlineClassName={styles.stepsHeadline}
                  headline={getHeadline()}
                  buttonContent={getButtonContent()}
                  highlightType={HighlightType.highlightHomeCtaBet}
                  cancelButtonContent={getCancelButtonContent()}
                  onCancelButtonClick={onCancel}
                  onButtonClick={onConfirm}
                  hideDefaultButtonBackground={true}
                  splittedView={step === 5}
                  buttonDesktopMargin={true}
              >
                  <div
                      className={classNames(
                          styles.contentContainer,
                          step >= 5 ? styles.fullHeightContentContainer : null,
                      )}
                  >
                      <div
                          className={classNames(styles.contentContentContainer)}
                      >
                          {renderContent()}
                      </div>
                  </div>
              </StepsContainer>
          );
      }
;

const mapStateToProps = (state) => {
          return {
              events: state.event.events,
          };
      }
;

const mapDispatchToProps = (dispatch) => {
          return {
              hidePopup: () => {
                  dispatch(PopupActions.hide());
              },
              createBet: (eventId, marketQuestion, description, outcomes, startDate, endDate, liquidityAmount = 1000) => {
                  dispatch(BetActions.create({ eventId, marketQuestion, description, outcomes, endDate, liquidityAmount }));
              },
          };
      }
;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BetCreation);
