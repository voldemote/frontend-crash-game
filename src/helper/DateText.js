import _ from 'lodash';

class DateText {
    static getSecondsDateText (date) {
        const sentDate            = new Date(date);
        const currentDate         = new Date();
        const difference          = currentDate.getTime() - sentDate.getTime();
        const differenceInSeconds = _.round(difference / 1000, 0);

        if (differenceInSeconds <= 5) {
            return 'just now';
        } else if (differenceInSeconds < 60) {
            return differenceInSeconds + 's';
        }

        const minutes     = _.floor(differenceInSeconds / 60, 0);
        const secondsRest = (
            differenceInSeconds -
            (
                minutes * 60
            )
        ).toString().padStart(2, '0');

        return minutes + ':' + secondsRest;
    };
}

export default DateText;