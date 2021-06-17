import _                   from 'lodash';
import Button              from '../Button';
import ChoiceSelector      from '../ChoiceSelector';
import ChoiceSelectorTheme from '../ChoiceSelector/ChoiceSelectorTheme';
import classNames          from 'classnames';
import HotBetBadge         from '../HotBetBadge';
import React               from 'react';
import styles              from './styles.module.scss';
import TimeLeftCounter     from '../../components/TimeLeftCounter';
import HighlightType       from '../../components/Highlight/HighlightType';
import TokenNumberInput    from '../TokenNumberInput';
import TokenValueSelector  from '../TokenValueSelector';
import { BetActions }      from '../../store/actions/bet';
import { connect }         from 'react-redux';
import { useEffect }       from 'react';
import { useIsMount }      from '../hoc/useIsMount';
import { useParams }       from 'react-router-dom';
import SleepHelper         from '../../helper/Sleep';
import { useHasMounted }   from '../hoc/useHasMounted';
import SwitchableContainer from '../SwitchableContainer';
import SwitchableHelper    from '../../helper/SwitchableHelper';
import { useState }        from 'react';
import HighlightTheme      from '../Highlight/HighlightTheme';

const BetView = ({ closed, showEventEnd, events, selectedBetId, openBets, rawOutcomes, choice, commitment, setChoice, setCommitment, placeBet, fetchOutcomes }) => {
          const params                                  = useParams();
          const defaultBetValue                         = 100;
          const bet                                     = (
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
          const betId                                   = _.get(bet, '_id', selectedBetId);
          const event                                   = (
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
          const outcomes                                = (
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
          const hasOpenBet                              = _.find(
              openBets,
              {
                  betId: betId,
              },
          );
          const [currentTradeView, setCurrentTradeView] = useState(0);
          const hasMounted                              = useHasMounted();
          const isMount                                 = useIsMount();

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

          function getDefaultTokenSelection () {
              return [25, 50, 100, 150, 200, 300];
          }

          async function loadAfterMount () {
              await SleepHelper.sleep(100);

              fetchDefaultTokenSelection();
              onTokenSelect(defaultBetValue);
          }

          async function fetchDefaultTokenSelection () {
              if (!_.isEmpty(betId)) {
                  const tokensToFetch = [
                      defaultBetValue,
                      ...getDefaultTokenSelection(),
                  ];

                  for (const tokenAmount of tokensToFetch) {
                      fetchOutcomes(betId, tokenAmount);
                      await SleepHelper.sleep(100);
                  }
              }
          }

          useEffect(
              () => {
                  if (hasMounted) {
                      loadAfterMount();
                  }
              },
              [hasMounted],
          );

          useEffect(
              () => {
                  if (!isMount && !closed) {
                      validateInput();
                  }
              },
              [choice, commitment],
          );

          const onConfirm = () => {
              const validInput = validateInput();

              if (validInput) {
                  placeBet(betId, commitment, choice === 0);
              }
          };

          const onChoiceSelect = (id) => {
              return () => {
                  setChoice(id);
              };
          };

          const onTokenSelect = (number) => {
              setCommitment(number, betId);
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

          const renderSwitchableView = () => {
              if (hasOpenBet) {
                  const switchableViews = [
                      SwitchableHelper.getSwitchableView(
                          'Buy',
                      ),
                      SwitchableHelper.getSwitchableView(
                          'Sell',
                      ),
                  ];

                  return (
                      <SwitchableContainer
                          switchableViews={switchableViews}
                          currentIndex={currentTradeView}
                          setCurrentIndex={setCurrentTradeView}
                      />
                  );
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

          const renderTradeButton = () => {
              const isSell = currentTradeView === 1;

              return (
                  <Button
                      className={classNames(
                          styles.betButton,
                      )}
                      onClick={onConfirm}
                      highlightType={HighlightType.highlightHomeCtaBet}
                      highlightTheme={isSell ? HighlightTheme.fillRed : null}
                  >
                      Trade!
                  </Button>
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
                  <div className={styles.description}>
                      {bet.description}
                  </div>
                  <HotBetBadge />
                  {renderSwitchableView()}
                  <div className={styles.placeBetContentContainer}>
                      <label className={styles.label}>
                          You trade:
                      </label>
                      <TokenNumberInput
                          value={commitment}
                          setValue={onTokenSelect}
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
                              Potential Winnings:
                          </label>
                          <div className={styles.choiceContainer}>
                              {renderChoiceSelector(0, bet.betOne, ChoiceSelectorTheme.colorMint)}
                              {renderChoiceSelector(1, bet.betTwo, ChoiceSelectorTheme.colorLightPurple)}
                          </div>
                      </div>
                  </div>
                  {renderTradeButton()}
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
        openBets:      state.bet.openBets,
        choice:        state.bet.selectedChoice,
        commitment:    _.get(state, 'bet.selectedCommitment', 0),
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
        pullOutBet:    (betId, outcome, amount) => {
            dispatch(BetActions.pullOutBet({ betId, outcome, amount }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BetView);
