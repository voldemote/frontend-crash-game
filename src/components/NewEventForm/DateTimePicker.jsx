import MomentUtils from '@date-io/moment';
import { DateTimePicker as MuiDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function DateTimePicker({ value, onChange, ...props }) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MuiDateTimePicker
        label="DateTimePicker"
        inputVariant="outlined"
        value={value}
        onChange={onChange}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateTimePicker;
