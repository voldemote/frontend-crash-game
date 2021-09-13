import MomentUtils from '@date-io/moment';
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import styles from './styles.module.scss';

function DateTimePicker({ value, onChange, ...props }) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MuiDateTimePicker
        label="DateTimePicker"
        inputVariant="outlined"
        value={value}
        onChange={onChange}
        className={styles.datePicker}
        InputLabelProps={{ shrink: true, className: styles.inputLabel }}
        InputProps={{ className: styles.inputBase }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateTimePicker;
