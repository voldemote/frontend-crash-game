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
    const [outcomes, setOutcomes]             = useState([{}, {}]);

    const getButtonContent = () => {
        if (step <= 2) {
            return 'Next Step';
        } else if (step === 3) {
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
                        Quote
                    </div>
                </div>
                {renderOutcomeInputs()}
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
