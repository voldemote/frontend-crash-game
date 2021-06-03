import React      from 'react';
import style      from './styles.module.scss';
import _          from 'lodash';
import { useRef } from 'react';
import classNames from 'classnames';

const Input = ({ className, onSubmit = _.noop, reference, ...props }) => {
    const checkOnKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <input
            className={classNames(
                style.input,
                className,
            )}
            onKeyPress={checkOnKeyPress}
            ref={reference}
            {...props}
        />
    );
};

export default Input;
