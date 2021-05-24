import _                   from 'lodash';
import classNames          from 'classnames';
import React               from 'react';
import styles              from './styles.module.scss';
import TimeLeftCounter     from '../../components/TimeLeftCounter';
import { connect }         from 'react-redux';
import { PopupActions }    from '../../store/actions/popup';
import { useEffect }       from 'react';
import { useIsMount }      from '../hoc/useIsMount';
import HotBetBadge         from '../HotBetBadge';
import Button              from '../Button';
import ChoiceSelector      from '../ChoiceSelector';
import ChoiceSelectorTheme from '../ChoiceSelector/ChoiceSelectorTheme';
import TokenNumberInput    from '../TokenNumberInput';
import TokenValueSelector  from '../TokenValueSelector';
import { BetActions }      from '../../store/actions/bet';

const BetView = ({ hidePopup, closed, event, bet, choice, outcomes, commitment, createBet, setChoice, setCommitment, placeBet, fetchOutcomes }) => {
          const isMount = useIsMount();

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
                  } else if (isMount) {
                      _.each(
                          getDefaultTokenSelection(),
                          tokenAmount => fetchOutcomes(_.get(bet, '_id'), tokenAmount),
                      );
                  }
              },
              [choice, commitment],
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
              setCommitment(number);
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
                  <div className={styles.timeLeftCounterContainer}>
                      <span>Event ends in:</span>
                      <TimeLeftCounter endDate={event.date} />
                  </div>
              </div>
          );
      }
;

const mapStateToProps = (state) => {
    const event  = _.find(
        state.event.events,
        {
            _id: state.bet.selectedEventId,
        },
    );
    const bet    = _.find(
        event ? event.bets : [],
        {
            _id: state.bet.selectedBetId,
        },
    );
    let outcomes = [];

    if (bet) {
        outcomes = _.get(
            state.bet.outcomes,
            bet._id,
        );

        if (outcomes) {
            outcomes = _.get(outcomes, 'values', {});
        }
    }

    return {
        event:      event,
        bet:        bet,
        choice:     state.bet.selectedChoice,
        commitment: state.bet.selectedCommitment,
        outcomes:   outcomes,
        events:     state.event.events,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hidePopup:     () => {
            dispatch(PopupActions.hide());
        },
        setChoice:     (choice) => {
            dispatch(BetActions.selectChoice({ choice }));
        },
        setCommitment: (commitment) => {
            dispatch(BetActions.setCommitment({ commitment }));
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
