import Icon                        from '../Icon';
import IconType                    from '../Icon/IconType';
import Input                       from '../Input';
import PhoneInput                  from '../PhoneInput';
import React                       from 'react';
import styles                      from './styles.module.scss';
import IconTheme                   from '../Icon/IconTheme';
import InputBoxTheme               from './InputBoxTheme';
import classNames                  from 'classnames';
import SelectionHelper             from '../../helper/SelectionHelper';
import MomentUtils                 from '@date-io/moment';
import { KeyboardDatePicker }      from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardTimePicker }      from '@material-ui/pickers';
import ErrorHint                   from '../ErrorHint';

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
                      min,
                      max,
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

    const renderInput = () => {
        if (type === 'date') {
            return (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant={'inline'}
                        format={'MM/DD/yyyy'}
                        value={value}
                        onChange={setValue}
                    />
                </MuiPickersUtilsProvider>
            );
        } else if (type === 'time') {
            return (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardTimePicker
                        value={value}
                        onChange={setValue}
                    />
                </MuiPickersUtilsProvider>
            );
        }

        return (
            <Input
                placeholder={placeholder}
                type={type}
                value={value}
                min={min}
                max={max}
                onChange={(event) => setValue(event.target.value)}
            />
        );
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
                            [InputBoxTheme.defaultInput]:             styles.defaultInputBox,
                            [InputBoxTheme.coloredBorderMint]:        styles.coloredBorderMint,
                            [InputBoxTheme.coloredBorderLightPurple]: styles.coloredBorderLightPurple,
                        },
                    ),
                )}
            >
                {renderPhoneInput()}
                {renderInput()}
                {renderDeleteIcon()}
            </div>
            <ErrorHint errorText={errorText} />
        </div>
    );
};

export default InputBox;
