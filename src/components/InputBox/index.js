import Icon       from '../Icon';
import IconType   from '../Icon/IconType';
import Input      from '../Input';
import PhoneInput from '../PhoneInput';
import React      from 'react';
import styles     from './styles.module.scss';
import IconTheme  from '../Icon/IconTheme';

const InputBox = ({
                      type,
                      placeholder,
                      invitationText,
                      errorText,
                      country,
                      setCountry,
                      hasCountry,
                      value,
                      setValue,
                  }) => {
    const renderInvitationText = () => {
        if (invitationText) {
            return (
                <span>
                    {invitationText}
                </span>
            );
        }

        return null;
    };

    const renderErrorText = () => {
        if (errorText && errorText.length) {
            return (
                <div className={styles.errorTextContainer}>
                    <Icon
                        className={styles.errorTextIcon}
                        iconType={IconType.error}
                    />
                    <span>
                        {errorText}
                    </span>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={styles.inputBoxContainer}>
            {renderInvitationText()}
            <div className={styles.inputBox}>
                {
                    hasCountry && (
                        <PhoneInput
                            value={country}
                            inputProps={{ name: 'phoneNumber' }}
                            onChange={(country) => setCountry(country)}
                            enableClickOutside={true}
                            enableSearch={true}
                        />
                    )
                }
                <Input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    min={0}
                    onChange={(event) => setValue(event.target.value)}
                />
                <div
                    className={styles.inputDeleteIconContainer}
                    onClick={() => {
                        setValue('');
                    }}
                >
                    <Icon
                        iconTheme={IconTheme.primaryLightTransparent}
                        iconType={IconType.deleteInput}
                    />
                </div>
            </div>
            {renderErrorText()}
        </div>
    );
};

export default InputBox;
