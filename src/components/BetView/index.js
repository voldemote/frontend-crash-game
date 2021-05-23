import _                     from 'lodash';
import classNames            from 'classnames';
import Divider               from '../../components/Divider';
import Dropdown              from '../../components/Dropdown';
import ExampleData           from '../../helper/ExampleData';
import Icon                  from '../Icon';
import IconType              from '../Icon/IconType';
import InputBox              from '../../components/InputBox';
import InputBoxTheme         from '../../components/InputBox/InputBoxTheme';
import Link                  from '../../components/Link';
import moment                from 'moment';
import ProfileContainer      from '../../components/ProfileContainer';
import React                 from 'react';
import RippedTicketContainer from '../../components/RippedTicketContainer';
import StepsContainer        from '../../components/StepsContainer';
import styles                from './styles.module.scss';
import TimeLeftCounter       from '../../components/TimeLeftCounter';
import { connect }           from 'react-redux';
import { PopupActions }      from '../../store/actions/popup';
import { useEffect }         from 'react';
import { useIsMount }        from '../hoc/useIsMount';
import { useState }          from 'react';
import HotBetBadge           from '../HotBetBadge';
import Button                from '../Button';
import style                 from '../EventBetPill/styles.module.scss';
import ChoiceSelector        from '../ChoiceSelector';
import ChoiceSelectorTheme   from '../ChoiceSelector/ChoiceSelectorTheme';
import TokenNumberInput      from '../TokenNumberInput';
import TokenValueSelector    from '../TokenValueSelector';

const initialState = {
    choice:     null,
    commitment: 1,
};

const BetView = ({ hidePopup, closed, event, bet, createBet }) => {
          const [error, setError]           = useState(initialState.error);
          const [choice, setChoice]         = useState(initialState.choice);
          const [commitment, setCommitment] = useState(initialState.commitment);
          const isMount                     = useIsMount();

          const resetStates = () => {
              setChoice(initialState.choice);
              setCommitment(initialState.commitment);
          };

          const validateInput = () => {
              let valid = true;
              let error = [];

              if (!choice) {
                  valid = false;
              }

              if (!commitment) {
                  valid = false;
              }

              if (error.length > 0) {
                  setError(error);
              } else {
                  setError(null);
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
                  if (!isMount && closed) {
                      resetStates();
                  }
              },
              [closed],
          );

          const onConfirm = () => {
              const validInput = validateInput();

              if (validInput) {

                  hidePopup();
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
                          values={[25, 50, 100, 150, 200, 300]}
                          onSelect={onTokenSelect}
                      />
                      <div className={styles.buttonContainer}>
                          <label
                              className={styles.label}
                          >
                              Your choice & possible bet:
                          </label>
                          <div className={styles.choiceContainer}>
                              <ChoiceSelector
                                  theme={ChoiceSelectorTheme.colorMint}
                                  className={styles.choice}
                                  name={bet.betOne}
                                  winAmount={6000}
                                  selected={choice === 0}
                                  onClick={onChoiceSelect(0)}
                              />
                              <ChoiceSelector
                                  theme={ChoiceSelectorTheme.colorLightPurple}
                                  className={styles.choice}
                                  name={bet.betTwo}
                                  winAmount={8000}
                                  selected={choice === 1}
                                  onClick={onChoiceSelect(1)}
                              />
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
                      <TimeLeftCounter endDate={new Date(new Date().getTime() + 12 * 60000)} />
                  </div>
              </div>
          );
      }
;

const mapStateToProps = (state) => {
    return {
        events: state.event.events,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hidePopup: () => {
            dispatch(PopupActions.hide());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BetView);
