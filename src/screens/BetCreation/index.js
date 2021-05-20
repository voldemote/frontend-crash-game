import _                     from 'lodash';
import classNames            from 'classnames';
import ExampleData           from '../../helper/ExampleData';
import InputBox              from '../../components/InputBox';
import InputBoxTheme         from '../../components/InputBox/InputBoxTheme';
import ProfileContainer      from '../../components/ProfileContainer';
import RippedTicketContainer from '../../components/RippedTicketContainer';
import StepsContainer        from '../../components/StepsContainer';
import styles                from './styles.module.scss';
import { isValidURL }        from '../../helper/Url';
import { useEffect }         from 'react';
import { useIsMount }        from '../../components/hoc/useIsMount';
import { useState }          from 'react';
import Divider               from '../../components/Divider';
import TimeLeftCounter       from '../../components/TimeLeftCounter';
import React                 from 'react';
import moment                from 'moment';
import Link                  from '../../components/Link';

const BetCreation = () => {
          const [step, setStep]                     = useState(0);
          const [error, setError]                   = useState(null);
          const [marketQuestion, setMarketQuestion] = useState(null);
          const [eventUrl, setEventUrl]             = useState(null);
          const [selectedDate, setSelectedDate]     = useState(null);
          const [selectedTime, setSelectedTime]     = useState(null);
          const [outcomes, setOutcomes]             = useState([{}, {}]);
          const isMount                             = useIsMount();

          const validateInput = () => {
              switch (step) {
                  case 0:
                      if (eventUrlIsValid()) {
                          setError(null);
                      } else {
                          setError('Please enter a valid event url!');
                          return false;
                      }

                      break;
                  case 1:
                      if (marketQuestionIsValid()) {
                          setError(null);
                      } else {
                          setError('Please enter a market question!');
                          return false;
                      }

                      break;
                  case 3:
                      if (dateIsValid()) {
                          setError(null);
                      } else {
                          setError('Please enter a valid date!');
                          return false;
                      }

                      if (timeIsValid()) {
                          setError(null);
                      } else {
                          setError('Please enter a valid time!');
                          return false;
                      }

                      break;
              }

              return true;
          };

          const marketQuestionIsValid = () => {
              return marketQuestion && marketQuestion.length;
          };

          const eventUrlIsValid = () => {
              return eventUrl && isValidURL(eventUrl);
          };

          const dateIsValid = () => {
              return selectedDate && selectedDate.isValid();
          };

          const timeIsValid = () => {
              return selectedTime && selectedTime.isValid();
          };

          useEffect(
              () => {
                  if (!isMount) {
                      validateInput();
                  }
              },
              [marketQuestion, eventUrl, selectedDate, selectedTime],
          );

          const getEndDateTime = () => {
              const dateTime = moment(selectedDate);

              dateTime.hours(selectedTime.hours());
              dateTime.minutes(selectedTime.minutes());
              dateTime.seconds(selectedTime.seconds());

              return dateTime;
          };

          const getButtonContent = () => {
              if (step <= 1) {
                  return 'Next Step';
              } else if (step === 2) {
                  return 'Last Step';
              } else if (step === 3) {
                  return 'See Summary';
              }

              return 'Publish Bet';
          };

          const getHeadline = () => {
              switch (step) {
                  case 0:
                      return 'Choose Event';
                  case 1:
                      return 'Create Bet';
                  case 2:
                      return 'Define outcomes';
                  case 3:
                      return 'When does the event end?';
                  case 4:
                      return 'Awesome, that looks great!';
              }

              return null;
          };

          const onConfirm = () => {
              const validInput = validateInput();

              if (validInput) {
                  if (step <= 3) {
                      setStep(step + 1);
                  } else {
                      // TODO publish bet
                  }
              }
          };

          const setOutcomeValue = (index) => {
              return (value) => {
                  let newOutcomes = [...outcomes];

                  newOutcomes[index].value = value;

                  setOutcomes(newOutcomes);
              };
          };

          const renderOutcomeInputs = () => {
              const size = outcomes.length;

              return (
                  _.times(
                      size,
                      (index) => {
                          const outcome = outcomes[index];

                          return (
                              <div className={styles.outcomeRow}>
                                  <InputBox
                                      value={outcome.value}
                                      placeholder={'Outcome #' + (
                                          index + 1
                                      )}
                                      setValue={setOutcomeValue(index)}
                                      theme={InputBoxTheme.coloredBorder}
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
                      <InputBox
                          type={'date'}
                          invitationText={'Choose Date'}
                          value={selectedDate}
                          setValue={setSelectedDate}
                          placeholder={'Today'}
                          showDeleteIcon={false}
                          errorText={error}
                      />
                      <InputBox
                          type={'time'}
                          invitationText={'Choose Time'}
                          value={selectedTime}
                          setValue={setSelectedTime}
                          placeholder={'02:30 PM'}
                          showDeleteIcon={false}
                          errorText={error}
                      />
                  </div>
              );
          };

          const renderSummaryRow = (key, value, isLink = false) => {
              return (
                  <div className={styles.summaryTicketRow}>
                      <span>
                          {key}
                      </span>
                      {
                          isLink ?
                              (
                                  <Link
                                      to={value}
                                      target={'_blank'}
                                  >
                                      {value}
                                  </Link>
                              ) :
                              (
                                  <span>
                                      {value}
                                  </span>
                              )
                      }
                  </div>
              );
          };

          const renderSummaryOutcomes = () => {
              return outcomes.map(
                  (outcome, index) => (
                      <>
                          <Divider />
                          {
                              renderSummaryRow('Outcome #' + (
                                  index + 1
                              ), outcome.value)
                          }
                          {
                              renderSummaryRow('Probability #' + (
                                  index + 1
                              ), 50)
                          }
                      </>
                  ),
              );
          };

          const renderSummary = () => {
              return (
                  <RippedTicketContainer className={styles.summaryTicketContainer}>
                      <ProfileContainer user={ExampleData.user} />
                      <span className={styles.summaryTicketHeadline}>
                          {marketQuestion}
                      </span>
                      {renderSummaryOutcomes()}
                      <Divider />
                      {renderSummaryRow('Event Link:', eventUrl, true)}
                      {renderSummaryRow('Event Title:', 'TBD')}
                      <div className={styles.summaryTimeLeftContainer}>
                          <span>
                              Event ends in:
                          </span>
                          <TimeLeftCounter endDate={getEndDateTime()} />
                      </div>
                  </RippedTicketContainer>
              );
          };

          const renderContent = () => {
              if (step === 0) {
                  return (
                      <InputBox
                          type={'text'}
                          invitationText={'Put URL or choose for existing'}
                          errorText={error}
                          placeholder={'https://www.twitch.com/user/12345'}
                          value={eventUrl}
                          setValue={setEventUrl}
                      />
                  );
              } else if (step === 1) {
                  return (
                      <InputBox
                          type={'text'}
                          invitationText={'What to bet on?'}
                          errorText={error}
                          placeholder={'Who will win the race?'}
                          value={marketQuestion}
                          setValue={setMarketQuestion}
                      />
                  );
              } else if (step === 2) {
                  return renderOutcomeCreator();
              } else if (step === 3) {
                  return renderDateAndTime();
              } else if (step === 4) {
                  return renderSummary();
              }
          };

          return (
              <StepsContainer
                  step={step}
                  size={4}
                  headline={getHeadline()}
                  buttonContent={getButtonContent()}
                  onButtonClick={onConfirm}
              >
                  <div
                      className={classNames(
                          styles.contentContainer,
                          step >= 4 ? styles.fullHeightContentContainer : null,
                      )}
                  >
                      {renderContent()}
                  </div>
              </StepsContainer>
          );
      }
;

export default BetCreation;
