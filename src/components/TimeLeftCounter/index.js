import React                 from 'react';
import { useState }          from 'react';
import { calculateTimeLeft } from '../../helper/Time';
import { useEffect }         from 'react';
import styles                from './styles.module.scss';

const TimeLeftCounter = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

    useEffect(() => {
        const timerId = setTimeout(
            () => {
                setTimeLeft(calculateTimeLeft(endDate));
            },
            1000,
        );

        return () => clearTimeout(timerId);
    });

    const renderTimeLeft = (name, value, forceRender = true) => {
        if (value > 0 || forceRender) {
            if (!value) {
                value = 0;
            }

            return (
                <>
                    <span className={styles.timePartContainer}>
                        {value}
                    </span>
                    <span className={styles.timePartName}>
                        {name}
                    </span>
                </>
            );
        }

        return null;
    };

    return (
        <div>
            {renderTimeLeft('d', timeLeft.days, false)}
            {renderTimeLeft('hrs', timeLeft.hours)}
            {renderTimeLeft('min', timeLeft.minutes)}
            {renderTimeLeft('sec', timeLeft.seconds)}
        </div>
    );
};

export default TimeLeftCounter;
