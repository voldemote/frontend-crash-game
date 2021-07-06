import _                   from 'lodash';
import Button              from '../Button';
import ChoiceSelector      from '../ChoiceSelector';
import classNames          from 'classnames';
import ClickEvent          from '../../helper/ClickEvent';
import Divider             from '../Divider';
import HighlightTheme      from '../Highlight/HighlightTheme';
import HighlightType       from '../Highlight/HighlightType';
import HotBetBadge         from '../HotBetBadge';
import ProfileContainer    from '../ProfileContainer';
import React               from 'react';
import Routes              from '../../constants/Routes';
import SleepHelper         from '../../helper/Sleep';
import styles              from './styles.module.scss';
import TimeLeftCounter     from '../TimeLeftCounter';
import TokenNumberInput    from '../TokenNumberInput';
import { BetActions }      from '../../store/actions/bet';
import { connect }         from 'react-redux';
import { getDefaultUser }  from '../../helper/Profile';
import { useEffect }       from 'react';
import { useHasMounted }   from '../hoc/useHasMounted';
import { useHistory }      from 'react-router';
import { useState }        from 'react';
import ChoiceSelectorList  from '../ChoiceSelectorList';

const EventBetPill = ({ user, eventId, bet, fetchOutcomes, outcomes, placeBet }) => {
    const defaultBetValue         = 100;
    const [choice, setChoice]     = useState(null);
    const [betValue, setBetValue] = useState(defaultBetValue);
    const betId                   = _.get(bet, '_id');
    const history                 = useHistory();
    const hasMounted              = useHasMounted();

    useEffect(
        () => {
            fetchOutcomes(betId, betValue);
        },
        [betValue],
    );

    async function loadAfterMount () {
        await SleepHelper.sleep(100);

        setBetValue(defaultBetValue);
        fetchOutcomes(betId, defaultBetValue);
    }

    useEffect(
        () => {
            if (hasMounted) {
                loadAfterMount();
            }
        },
        [hasMounted],
    );

    const renderFooter = () => {
        const eventEnd = new Date(bet.date);

        return (
            <div className={styles.pillFooter}>
                <div className={styles.timeLeftCounterContainer}>
                    <span>Event ends in:</span>
                    <TimeLeftCounter endDate={eventEnd} />
                </div>
            </div>
        );
    };

    const onConfirm = (event) => {
        event.stopPropagation();

        placeBet(betId, betValue, choice);
        setChoice(null);
        setBetValue(defaultBetValue);
    };

    const onClick = () => {
        history.push(Routes.getRouteWithParameters(
            Routes.bet,
            {
                eventId,
                betId,
            },
        ));
    };

    const onChoiceSelect = (id) => {
        return (event) => {
            event.stopPropagation();

            setChoice(id);
        };
    };

    const getOutcome = (index) => {
        if (outcomes) {
            const outcomeForValue = _.get(outcomes, betValue, {});

            return _.get(outcomeForValue, [index, 'outcome']);
        }

        return null;
    };

    const renderChoiceSelector = (index, name, choiceSelectorTheme, styles) => {
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

    return (
        <div
            className={styles.pill}
            onClick={onClick}
        >
            <div className={styles.pillContent}>

                <div className={styles.desc}>
                    <ProfileContainer
                        user={user}
                    />
                    <p>{bet.marketQuestion}</p>
                    {bet.hotBet && <HotBetBadge />}
                </div>

                <Divider className={styles.divider} />

                <div
                    className={styles.justify}
                    onClick={ClickEvent.stopPropagation}
                >
                    <div className={styles.inputWrapper}>
                        <label
                            className={styles.label}
                        >
                            You trade:
                        </label>
                        <TokenNumberInput
                            value={betValue}
                            setValue={setBetValue}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.buttonContainer}>
                        <ChoiceSelectorList
                            className={styles.choiceContainer}
                            outcomes={bet.outcomes}
                            renderChoiceSelector={renderChoiceSelector}
                        />
                    </div>

                    <Button
                        className={classNames(
                            styles.betButton,
                        )}
                        highlightType={HighlightType.highlightSettingsMyBets}
                        highlightTheme={choice !== null ? null : HighlightTheme.fillGray}
                        onClick={onConfirm}
                    >
                        <span className={styles.buttonContent}>
                            Trade!
                        </span>
                    </Button>
                </div>
            </div>
            {renderFooter()}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { userId, bet } = ownProps;
    let user              = getDefaultUser();
    let outcomes          = [];

    if (bet) {
        outcomes = _.get(
            state.bet.outcomes,
            bet._id,
        );

        if (outcomes) {
            outcomes = _.get(outcomes, 'values', {});
        }
    }

    if (userId) {
        user = _.get(
            state.user.users,
            userId,
        );
    }

    return {
        user:     user,
        outcomes: outcomes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOutcomes: (betId, amount) => {
            dispatch(BetActions.fetchOutcomes({ betId, amount }));
        },
        placeBet:      (betId, amount, outcome) => {
            dispatch(BetActions.place({ betId, amount, outcome }));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventBetPill);
