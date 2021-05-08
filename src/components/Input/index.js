import React from 'react';
import style from './styles.module.scss';

const Input = (props) => {
    return (
        <input
            style={style.input}
            {...props}
        />
    );
};

export default Input;
