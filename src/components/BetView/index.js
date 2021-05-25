import _                   from 'lodash';
import Button              from '../Button';
import ChoiceSelector      from '../ChoiceSelector';
import ChoiceSelectorTheme from '../ChoiceSelector/ChoiceSelectorTheme';
import classNames          from 'classnames';
import HotBetBadge         from '../HotBetBadge';
import React               from 'react';
import styles              from './styles.module.scss';
import TimeLeftCounter     from '../../components/TimeLeftCounter';
import TokenNumberInput    from '../TokenNumberInput';
import TokenValueSelector  from '../TokenValueSelector';
import { BetActions }      from '../../store/actions/bet';
import { connect }         from 'react-redux';
import { useEffect }       from 'react';
import { useIsMount }      from '../hoc/useIsMount';
import { useParams }       from 'react-router-dom';

const BetView = ({ closed, showEventEnd, events, selectedBetId, rawOutcomes, choice, commitment, setChoice, setCommitment, placeBet, fetchOutcomes }) => {
          const params   = useParams();
          const bet      = (
              () => {
                  let currentBetId = params.betId;

                  if (!currentBetId) {
                      currentBetId = selectedBetId;
                  }

                  let eventId = params.eventId;
                  let event   = null;

                  if (eventId) {
                      event = _.find(
                          events,
                          {
                              _id: eventId,
                          },
                      );
                  } else {
                      event = _.head(
                          _.filter(
                              events,
                              {
                                  bets: [
                                      {
                                          _id: currentBetId,
                                      },
                                  ],
                              },
                          ),
                      );
                  }

                  const bets = _.get(event, 'bets', []);
                  let bet    = _.find(
                      bets,
                      {
                          _id: currentBetId,
                      },
                  );

                  if (!bet) {
                      bet = _.head(bets);
                  }

                  return bet;
              }
          )();
          const event    = (
              () => {
                  let eventId = _.get(bet, 'event');

                  if (!eventId) {
                      eventId = params.eventId;
                  }

                  return _.find(
                      events,
                      {
                          _id: eventId,
                      },
                  );
              }
          )();
          const outcomes = (
              () => {
                  let outcomes = [];

                  if (bet) {
                      outcomes = _.get(
                          rawOutcomes,
                          bet._id,
                      );

                      if (outcomes) {
                          outcomes = _.get(outcomes, 'values', {});
                      }
                  }

                  return outcomes;
              }
          )();
          const isMount  = useIsMount();

          const validateInput = () => {
              let valid = true;

              if (choice === null) {
                  valid = false;
              }

              if (!commitment) {
                  valid = false;
              }

              return valid;
          };

          useEffect(
              () => {
                  if (!isMount && !closed) {
                      validateInput();
                  }
              },
              [choice, commitment],
          );
          useEffect(
              () => {
                  const betId = _.get(bet, '_id');

                  if (!_.isEmpty(betId)) {
                      _.each(
                          getDefaultTokenSelection(),
                          tokenAmount => fetchOutcomes(betId, tokenAmount),
                      );
                  }
              },
              [bet],
          );

          const getDefaultTokenSelection = () => {
              return [25, 50, 100, 150, 200, 300];
          };

          const onConfirm = () => {
              const validInput = validateInput();

              if (validInput) {
                  placeBet(bet._id, commitment, choice === 0);
              }
          };

          const onChoiceSelect = (id) => {
              return () => {
                  setChoice(id);
              };
          };

          const onTokenSelect = (number) => {
              setCommitment(number, _.get(bet, '_id'));
          };

          const getOutcome = (index) => {
              if (outcomes) {
                  const outcomeForValue = _.get(outcomes, commitment, {});

                  if (index === 0) {
                      return _.get(outcomeForValue, 'outcomeOne');
                  } else {
                      return _.get(outcomeForValue, 'outcomeTwo');
                  }
              }

              return null;
          };

          const renderChoiceSelector = (index, name, choiceSelectorTheme) => {
              return (
                  <ChoiceSelector
                      theme={choiceSelectorTheme}
                      className={styles.choice}
                      name={name}
                      winAmount={getOutcome(index)}
                      selected={choice === index}
                      onClick={onChoiceSelect(index)}
                  />
              );
          };

          if (!event || !bet) {
              return null;
          }

          return (
              <div className={styles.placeBetContainer}>
                  <span className={styles.eventName}>
                      {event.name}
                  </span>
                  <div className={styles.betMarketQuestion}>
                      {bet.marketQuestion}
                  </div>
                  <HotBetBadge />
                  <div className={styles.placeBetContentContainer}>
                      <label className={styles.label}>Your bet:</label>
                      <TokenNumberInput
                          value={commitment}
                          setValue={setCommitment}
                      />
                      <TokenValueSelector
                          className={styles.tokenValueSelector}
                          values={getDefaultTokenSelection()}
                          onSelect={onTokenSelect}
                      />
                      <div className={styles.buttonContainer}>
                          <label
                              className={styles.label}
                          >
                              Your choice & possible bet:
                          </label>
                          <div className={styles.choiceContainer}>
                              {renderChoiceSelector(0, bet.betOne, ChoiceSelectorTheme.colorMint)}
                              {renderChoiceSelector(1, bet.betTwo, ChoiceSelectorTheme.colorLightPurple)}
                          </div>
                      </div>
                  </div>
                  <Button
                      className={classNames(
                          styles.betButton,
                      )}
                      onClick={onConfirm}
                  >
                      Bet!
                  </Button>
                  {
                      showEventEnd && (
                          <div className={styles.timeLeftCounterContainer}>
                              <span>Event ends in:</span>
                              <TimeLeftCounter endDate={event.date} />
                          </div>
                      )
                  }
              </div>
          );
      }
;

const mapStateToProps = (state) => {
    return {
        events:        state.event.events,
        selectedBetId: state.bet.selectedBetId,
        rawOutcomes:   state.bet.outcomes,
        choice:        state.bet.selectedChoice,
        commitment:    state.bet.selectedCommitment,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setChoice:     (choice) => {
            dispatch(BetActions.selectChoice({ choice }));
        },
        setCommitment: (commitment, betId) => {
            dispatch(BetActions.setCommitment({ commitment, betId }));
        },
        fetchOutcomes: (betId, amount) => {
            dispatch(BetActions.fetchOutcomes({ betId, amount }));
        },
        placeBet:      (betId, amount, isOutcomeOne) => {
            dispatch(BetActions.place({ betId, amount, isOutcomeOne }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BetView);
