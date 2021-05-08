import React          from 'react';
import style          from './styles.module.scss';
import ReactCodeInput from 'react-verification-code-input';

const CodeInputFields = ({ fields, required, autoFocus, onComplete }) => {
    return (
        <ReactCodeInput
            type={'number'}
            className={style.codeInput}
            fields={fields}
            required={required}
            autoFocus={autoFocus}
            onComplete={onComplete}
        />
    );
};

export default CodeInputFields;
