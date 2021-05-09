import Icon       from '../Icon';
import IconType   from '../Icon/IconType';
import Input      from '../Input';
import PhoneInput from '../PhoneInput';
import React      from 'react';
import style      from './styles.module.scss';

const InputBox = ({
                      type,
                      placeholder,
                      country,
                      setCountry,
                      hasCountry,
                      value,
                      setValue,
                  }) => {
    return (
        <div className={style.inputBox}>
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
                className={style.inputDeleteIconContainer}
                onClick={() => {
                    setValue('');
                }}
            >
                <Icon
                    iconType={IconType.x}
                />
            </div>
        </div>
    );
};

export default InputBox;
