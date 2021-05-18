import Icon            from '../Icon';
import IconType        from '../Icon/IconType';
import Input           from '../Input';
import PhoneInput      from '../PhoneInput';
import React           from 'react';
import styles          from './styles.module.scss';
import IconTheme       from '../Icon/IconTheme';
import InputBoxTheme   from './InputBoxTheme';
import classNames      from 'classnames';
import SelectionHelper from '../../helper/SelectionHelper';

const InputBox = ({
                      type = 'text',
                      placeholder,
                      invitationText,
                      errorText,
                      country,
                      setCountry,
                      hasCountry,
                      value,
                      setValue,
                      theme = InputBoxTheme.defaultInput,
                      className,
                      showDeleteIcon = true,
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

    const renderPhoneInput = () => {
        if (hasCountry) {
            return (
                <PhoneInput
                    value={country}
                    inputProps={{ name: 'phoneNumber' }}
                    onChange={(country) => setCountry(country)}
                    enableClickOutside={true}
                    enableSearch={true}
                />
            );
        }

        return null;
    };

    const renderDeleteIcon = () => {
        if (showDeleteIcon) {
            return (
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
            );
        }

        return null;
    };

    return (
        <div className={styles.inputBoxContainer}>
            {renderInvitationText()}
            <div
                className={classNames(
                    styles.inputBox,
                    className,
                    SelectionHelper.get(
                        theme,
                        {
                            [InputBoxTheme.defaultInput]:  styles.defaultInputBox,
                            [InputBoxTheme.coloredBorder]: styles.coloredBorder,
                        },
                    ),
                )}
            >
                {renderPhoneInput()}
                <Input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    min={0}
                    onChange={(event) => setValue(event.target.value)}
                />
                {renderDeleteIcon()}
            </div>
            {renderErrorText()}
        </div>
    );
};

export default InputBox;
