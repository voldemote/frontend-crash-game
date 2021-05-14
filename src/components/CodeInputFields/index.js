import React          from 'react';
import ReactCodeInput from 'react-verification-code-input';
import style          from './styles.module.scss';

const CodeInputFields = ({ fields, required, autoFocus, onComplete, onChange }) => {
    return (
        <ReactCodeInput
            type={'number'}
            className={style.codeInput}
            fields={fields}
            required={required}
            autoFocus={autoFocus}
            onComplete={onComplete}
            onChange={onChange}
        />
    );
};

export default CodeInputFields;
