import React               from 'react';
import _                   from 'lodash';
import classNames          from 'classnames';
import Divider             from '../Divider';
import HotBetBadge         from '../HotBetBadge';
import ProfileContainer    from '../ProfileContainer';
import styles              from './styles.module.scss';
import TimeLeftCounter     from '../TimeLeftCounter';
import { connect }         from 'react-redux';
import { getDefaultUser }  from '../../helper/Profile';
import { useState }        from 'react';
import ChoiceSelector      from '../ChoiceSelector';
import ChoiceSelectorTheme from '../ChoiceSelector/ChoiceSelectorTheme';
import Button              from '../Button';
import TokenNumberInput    from '../TokenNumberInput';
import { useEffect }       from 'react';
import { BetActions }      from '../../store/actions/bet';

const EventBetPill = ({ user, bet, fetchOutcomes, outcomes, placeBet }) => {
    const [choice, setChoice]     = useState(null);
    const [betValue, setBetValue] = useState(0);

    useEffect(
        () => {
            fetchOutcomes(bet._id, betValue);
        },
        [betValue],
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

    const onConfirm = () => {
        placeBet(bet._id, betValue, choice === 0);
        setChoice(null);
        setBetValue(0);
    };

    const onChoiceSelect = (id) => {
        return () => {
            setChoice(id);
        };
    };

    const getOutcome = (index) => {
        if (outcomes) {
            const outcomeForValue = _.get(outcomes, betValue, {});

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

    return (
        <div className={styles.pill}>
            <div className={styles.pillContent}>

                <div className={styles.desc}>
                    <ProfileContainer
                        user={user}
                    />
                    <p>{bet.marketQuestion}</p>
                    {bet.hotBet && <HotBetBadge />}
                </div>

                <Divider className={styles.divider} />

                <div className={styles.justify}>
                    <div className={styles.inputWrapper}>
                        <label
                            className={styles.label}
                        >
                            Your bet:
                        </label>
                        <TokenNumberInput
                            value={betValue}
                            setValue={setBetValue}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.buttonContainer}>
                        <div className={styles.quoteButtons}>
                            {renderChoiceSelector(0, bet.betOne, ChoiceSelectorTheme.colorMint)}
                            {renderChoiceSelector(1, bet.betTwo, ChoiceSelectorTheme.colorLightPurple)}
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
        user = _.find(
            state.user.users,
            {
                userId: userId,
            },
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
        placeBet:      (betId, amount, isOutcomeOne) => {
            dispatch(BetActions.place({ betId, amount, isOutcomeOne }));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventBetPill);
