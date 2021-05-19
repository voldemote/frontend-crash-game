import _              from 'lodash';
import InputBox       from '../../components/InputBox';
import StepsContainer from '../../components/StepsContainer';
import styles         from './styles.module.scss';
import { useState }   from 'react';
import InputBoxTheme  from '../../components/InputBox/InputBoxTheme';

const BetCreation = () => {
    const [step, setStep]                     = useState(0);
    const [error, setError]                   = useState(null);
    const [marketQuestion, setMarketQuestion] = useState(null);
    const [selectedDate, setSelectedDate]     = useState(null);
    const [selectedTime, setSelectedTime]     = useState(null);
    const [outcomes, setOutcomes]             = useState([{ probability: 50 }, { probability: 50 }]);

    const getButtonContent = () => {
        if (step <= 1) {
            return 'Next Step';
        } else if (step === 2) {
            return 'Last Step';
        }

        return 'See Summary';
    };

    const getHeadline = () => {
        switch (step) {
            case 0:
                return 'Create Bet';
            case 1:
                return 'Define outcomes';
            case 2:
                return 'Choose Event';
            case 3:
                return 'When does the event end?';
            default:
                return 'Awesome, that looks great';
        }
    };

    const onConfirm = () => {
        setStep(step + 1);
    };

    const setOutcomeValue = (index) => {
        return (value) => {
            let newOutcomes = [...outcomes];

            newOutcomes[index].value = value;

            setOutcomes(newOutcomes);
        };
    };

    const setOutcomeProbability = (index) => {
        return (value) => {
            let newOutcomes  = [...outcomes];
            const floatValue = parseFloat(value);

            if (_.isNaN(floatValue) || floatValue < 1 || floatValue > 99) {
                return;
            }

            newOutcomes[index].probability = floatValue;

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
                            <div>
                                <InputBox
                                    value={outcome.value}
                                    placeholder={'Outcome #' + (
                                        index + 1
                                    )}
                                    setValue={setOutcomeValue(index)}
                                    theme={InputBoxTheme.coloredBorder}
                                />
                            </div>
                            <div>
                                <InputBox
                                    type={'number'}
                                    value={outcome.probability}
                                    placeholder={''}
                                    min={1}
                                    max={99}
                                    setValue={setOutcomeProbability(index)}
                                    theme={InputBoxTheme.coloredBorder}
                                    showDeleteIcon={false}
                                />
                            </div>
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
                    <div>
                        Event outcomes
                    </div>
                    <div>
                        Probability
                    </div>
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
                />
                <InputBox
                    type={'time'}
                    invitationText={'Choose Time'}
                    value={selectedTime}
                    setValue={setSelectedTime}
                    placeholder={'02:30 PM'}
                    showDeleteIcon={false}
                />
            </div>
        );
    };

    const renderContent = () => {
        if (step === 0) {
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
        } else if (step === 1) {
            return renderOutcomeCreator();
        } else if (step === 2) {
            return (
                <InputBox
                    type={'text'}
                    invitationText={'Put URL or choose for existing'}
                    errorText={error}
                    placeholder={'https://www.twitch.com/user/12345'}
                    value={marketQuestion}
                    setValue={setMarketQuestion}
                />
            );
        } else if (step === 3) {
            return renderDateAndTime();
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
                className={styles.contentContainer}
            >
                {renderContent()}
            </div>
        </StepsContainer>
    );
};

export default BetCreation;
