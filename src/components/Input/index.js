import React from 'react';
import style from './styles.module.scss';
import _     from 'lodash';

const Input = ({ onSubmit = _.noop, ...props }) => {
    const checkOnKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <input
            className={style.input}
            onKeyPress={checkOnKeyPress}
            {...props}
        />
    );
};

export default Input;
