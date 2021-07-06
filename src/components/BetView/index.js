// @TODO: this component is WAY TOO BIG IMO, hard to read for new devs and the state logic is very complex,
// would be good to refactor this and break it down in smaller components
import _                   from 'lodash';
import Button              from '../Button';
import ChoiceSelector      from '../ChoiceSelector';
import ChoiceSelectorTheme from '../ChoiceSelector/ChoiceSelectorTheme';
import classNames          from 'classnames';
import HighlightTheme      from '../Highlight/HighlightTheme';
import HighlightType       from '../../components/Highlight/HighlightType';
import HotBetBadge         from '../HotBetBadge';
import moment              from 'moment';
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
import ChoiceSelectorList  from '../ChoiceSelectorList';

const BetView = ({ closed, initialSellTab, forceSellView, disableSwitcher = false, showEventEnd, balance, events, selectedBetId, openBets, rawOutcomes, rawSellOutcomes, choice, commitment, setChoice, setCommitment, placeBet, pullOutBet, fetchOutcomes }) => {
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
    const sellOutcomes                                  = (
        () => {
            let outcomes = [];

            if (bet) {
                outcomes = _.get(
                    rawSellOutcomes,
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
    const [currentTradeView, setCurrentTradeView]       = useState(forceSellView ? 1 : 0);
    const [validInput, setValidInput]                   = useState(false);
    const [commitmentErrorText, setCommitmentErrorText] = useState('');
    const hasMounted                                    = useHasMounted();

    const validateInput = () => {
        const betEndDate = bet.date;
        const current    = moment(new Date());
        const isSell     = hasSellView();
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
                setCurrentTradeView(forceSellView ? 1 : 0);

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

    const hasSellView = () => {
        return (
                currentTradeView === 1 ||
                forceSellView
            ) &&
            _.size(hasOpenBet);
    };

    const getFinalOutcome = () => {
        const finalOutcome = _.get(bet, 'finalOutcome', false);

        return finalOutcome;
    };

    const onConfirm = () => {
        const validInput = validateInput();

        if (validInput) {
            const isSell = hasSellView();

            if (!isSell) {
                placeBet(betId, commitment, choice);
            } else {
                // @TODO: when does that happen, imo onConfirm will not be called from "sell" state?
                pullOutBet(betId, choice, commitment);
            }
        }
    };
    const sellBet = () => {
        pullOutBet(betId, choice, getOpenBetsValue(choice));
        setChoice(null);
    }

    const onChoiceSelect = (id, enabled) => {
        return () => {
            if (enabled) {
                setChoice(id);
            }
        };
    };

    const onTokenSelect = (number) => {
        setCommitment(number, betId);
    };

    const getOpenBetsValue = (index) => {
        const openBet = _.find(
            hasOpenBet,
            {
                outcome: index,
            },
        );

        if (openBet) {
            return _.get(openBet, 'outcomeAmount');
        }

        return 0;
    };

    const getOutcome = (index) => {
        const isSell          = hasSellView();
        const outcomeForValue = _.get(
            isSell ? sellOutcomes : outcomes,
            (
                isSell ?
                    getOpenBetsValue(index) :
                    commitment
            ),
            {},
        );

        return _.get(outcomeForValue, [index, 'outcome']);
    };

    const isChoiceSelectorEnabled = (index) => {
        const isSell = hasSellView();

        return !isSell || getOpenBetsValue(index) > 0;
    };

    const renderSwitchableView = () => {
        // @TODO: this is not very readable, couldn't we use a "standard" tab interface, would be good for a11y as well
        // like e.g. react-aria tablist
        // @see: https://react-spectrum.adobe.com/react-aria/useTabList.html
        if (_.size(hasOpenBet) && !disableSwitcher) {
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

    const renderChoiceSelector = (index, name, choiceSelectorTheme, styles, resolved = false, forceSelect = false) => {
        const enabled = isChoiceSelectorEnabled(index);

        return (
            <ChoiceSelector
                theme={choiceSelectorTheme}
                className={styles.choice}
                name={name}
                winAmount={getOutcome(index)}
                selected={choice === index || forceSelect}
                onClick={!resolved ? onChoiceSelect(index, enabled) : _.noop}
                hideAmount={resolved}
                disabled={!enabled}
            />
        );
    };

    const renderTokenSelection = () => {
        const isSell = hasSellView();

        if (isSell) {
            return null;
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
        const isSell       = hasSellView();
        const finalOutcome = getFinalOutcome();

        if (!isSell && !finalOutcome) {
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
                    Trade
                </Button>
            );
        }
        if (isSell && !finalOutcome) {
            const tradeButtonDisabled = !validInput;
            let tradeButtonTheme      = HighlightTheme.fillRed;

            if (tradeButtonDisabled) {
                tradeButtonTheme = HighlightTheme.fillGray;
            }

            return (
                <Button
                    className={classNames(
                        styles.betButton,
                    )}
                    onClick={sellBet}
                    highlightType={HighlightType.highlightHomeCtaBet}
                    highlightTheme={tradeButtonTheme}
                    disabledWithOverlay={false}
                >
                    Cashout
                </Button>
            );
        }
    };

    const renderChoiceSelectors = (resolved = false, forceSelect) => {
        const outcomes = bet.outcomes;

        return (
            <ChoiceSelectorList
                outcomes={outcomes}
                resolved={resolved}
                forceSelect={forceSelect}
                renderChoiceSelector={renderChoiceSelector}
            />
        );
    };

    const renderPlaceBetContentContainer = () => {
        const finalOutcome = getFinalOutcome();

        if (!finalOutcome) {
            return (
                <>
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
                                {renderChoiceSelectors()}
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        return (
            <div className={styles.placeBetContentContainer}>
                This Bet was already resolved.
                <div className={styles.buttonContainer}>
                    <div className={styles.choiceContainer}>
                        {renderChoiceSelectors(true, finalOutcome)}
                    </div>
                </div>
            </div>
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
            {renderPlaceBetContentContainer()}
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
        balance:         state.authentication.balance,
        choice:          state.bet.selectedChoice,
        commitment:      _.get(state, 'bet.selectedCommitment', 0),
        events:          state.event.events,
        openBets:        state.bet.openBets,
        rawOutcomes:     state.bet.outcomes,
        rawSellOutcomes: state.bet.sellOutcomes,
        selectedBetId:   state.bet.selectedBetId,
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
        placeBet:      (betId, amount, outcome) => {
            dispatch(BetActions.place({ betId, amount, outcome }));
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
