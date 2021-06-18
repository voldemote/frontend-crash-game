import _                   from 'lodash';
import Button              from '../Button';
import ChoiceSelector      from '../ChoiceSelector';
import ChoiceSelectorTheme from '../ChoiceSelector/ChoiceSelectorTheme';
import classNames          from 'classnames';
import HighlightTheme      from '../Highlight/HighlightTheme';
import HighlightType       from '../../components/Highlight/HighlightType';
import HotBetBadge         from '../HotBetBadge';
import React               from 'react';
import SleepHelper         from '../../helper/Sleep';
import styles              from './styles.module.scss';
import SwitchableContainer from '../SwitchableContainer';
import SwitchableHelper    from '../../helper/SwitchableHelper';
import TimeLeftCounter     from '../../components/TimeLeftCounter';
import TokenNumberInput    from '../TokenNumberInput';
import TokenValueSelector  from '../TokenValueSelector';
import { BetActions }      from '../../store/actions/bet';
import { connect }         from 'react-redux';
import { useEffect }       from 'react';
import { useHasMounted }   from '../hoc/useHasMounted';
import { useParams }       from 'react-router-dom';
import { useState }        from 'react';
import moment              from 'moment';

const BetView = ({ closed, initialSellTab, showEventEnd, balance, events, selectedBetId, openBets, rawOutcomes, choice, commitment, setChoice, setCommitment, placeBet, pullOutBet, fetchOutcomes }) => {
    const params                                        = useParams();
    const defaultBetValue                               = _.max([balance, 10]);
    const bet                                           = (
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
    const betId                                         = _.get(bet, '_id', selectedBetId);
    const event                                         = (
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
    const outcomes                                      = (
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
    const hasOpenBet                                    = _.filter(
        openBets,
        {
            betId: betId,
        },
    );
    const [currentTradeView, setCurrentTradeView]       = useState(initialSellTab ? 1 : 0);
    const [validInput, setValidInput]                   = useState(false);
    const [commitmentErrorText, setCommitmentErrorText] = useState('');
    const hasMounted                                    = useHasMounted();

    const validateInput = () => {
        const betEndDate = bet.date;
        const current    = moment(new Date());
        const isSell     = currentTradeView === 1;
        let valid        = true;

        if (current.isAfter(betEndDate)) {
            // TODO valid = false;
        }

        if (choice === null) {
            valid = false;
        }

        if (!commitment && !isSell) {
            valid = false;
        }

        if (commitment > balance && !isSell) {
            valid = false;

            setCommitmentErrorText('Not enough balance.');
        } else {
            setCommitmentErrorText('');
        }

        setValidInput(valid);

        return valid;
    };

    function getDefaultTokenSelection () {
        return [25, 50, 100, 150, 200, 300];
    }

    function getDefaultTokenSelectionValues () {
        const tokenSelectionValues = _.map(
            getDefaultTokenSelection(),
            (value) => {
                return {
                    enabled: value <= balance,
                    value,
                };
            },
        );

        return tokenSelectionValues;
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
                setCurrentTradeView(initialSellTab ? 1 : 0);

                loadAfterMount();
            }
        },
        [hasMounted, closed],
    );

    useEffect(
        () => {
            if (!closed) {
                validateInput();
            }
        },
        [choice, commitment, currentTradeView],
    );

    useEffect(
        () => {
            if (currentTradeView === 1) {
                setChoice(null);
            }
        },
        [currentTradeView],
    );

    const onConfirm = () => {
        const validInput = validateInput();

        if (validInput) {
            const isOutcomeOne = choice === 0;

            if (currentTradeView === 0) {
                placeBet(betId, commitment, isOutcomeOne);
            } else {
                pullOutBet(betId, choice, commitment);
            }
        }
    };

    const onChoiceSelect = (id, enabled) => {
        return () => {
            if (enabled) {
                const isSell = currentTradeView === 1;

                if (isSell) {
                    pullOutBet(betId, id, getOpenBetsValue(id));
                } else {
                    setChoice(id);
                }
            }
        };
    };

    const onTokenSelect = (number) => {
        setCommitment(number, betId);
    };

    const getOpenBetsValue = (index) => {
        if (hasOpenBet) {
            const openBet = _.find(
                hasOpenBet,
                {
                    outcome: index,
                },
            );

            if (openBet) {
                return _.get(openBet, 'investmentAmount');
            }
        }

        return 0;
    };

    const getOutcome = (index) => {
        if (outcomes) {
            const isSell          = currentTradeView === 1;
            const outcomeForValue = _.get(
                outcomes,
                (
                    isSell ?
                        getOpenBetsValue(index) :
                        commitment
                ),
                {},
            );

            if (index === 0) {
                return _.get(outcomeForValue, 'outcomeOne');
            } else {
                return _.get(outcomeForValue, 'outcomeTwo');
            }
        }

        return null;
    };

    const isChoiceSelectorEnabled = (index) => {
        const isSell = currentTradeView === 1;

        return !isSell || getOpenBetsValue(index) > 0;
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
        const enabled = isChoiceSelectorEnabled(index);

        return (
            <ChoiceSelector
                theme={choiceSelectorTheme}
                className={styles.choice}
                name={name}
                winAmount={getOutcome(index)}
                selected={choice === index}
                onClick={onChoiceSelect(index, enabled)}
                disabled={!enabled}
            />
        );
    };

    const renderTokenSelection = () => {
        const isSell = currentTradeView === 1;

        if (isSell) {
            return (
                <>
                </>
            );
        }

        return (
            <>
                <label className={styles.label}>
                    You trade:
                </label>
                <TokenNumberInput
                    value={commitment}
                    setValue={onTokenSelect}
                    errorText={commitmentErrorText}
                />
                <TokenValueSelector
                    className={styles.tokenValueSelector}
                    values={getDefaultTokenSelectionValues()}
                    onSelect={onTokenSelect}
                    activeValue={commitment}
                />
            </>
        );
    };

    const renderTradeButton = () => {
        const isSell = currentTradeView === 1;

        if (!isSell) {
            const tradeButtonDisabled = !validInput;
            let tradeButtonTheme      = null;

            if (tradeButtonDisabled) {
                tradeButtonTheme = HighlightTheme.fillGray;
            }

            return (
                <Button
                    className={classNames(
                        styles.betButton,
                    )}
                    onClick={!tradeButtonDisabled ? onConfirm : _.noop}
                    highlightType={HighlightType.highlightHomeCtaBet}
                    highlightTheme={tradeButtonTheme}
                    disabled={tradeButtonDisabled}
                    disabledWithOverlay={false}
                >
                    Trade!
                </Button>
            );
        }
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
                {renderTokenSelection()}
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

};

const mapStateToProps = (state) => {
    return {
        balance:       state.authentication.balance,
        choice:        state.bet.selectedChoice,
        commitment:    _.get(state, 'bet.selectedCommitment', 0),
        events:        state.event.events,
        openBets:      state.bet.openBets,
        rawOutcomes:   state.bet.outcomes,
        selectedBetId: state.bet.selectedBetId,
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
