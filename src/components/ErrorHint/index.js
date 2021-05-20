import Icon     from '../Icon';
import IconType from '../Icon/IconType';
import React    from 'react';
import styles   from './styles.module.scss';

const ErrorHint = ({ errorText }) => {
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

export default ErrorHint;
