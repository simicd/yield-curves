import React, { FC, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

interface MonthPickerProps {
  /** Callback function */
  onChange: (date: Date) => void;
}

/**
 * Date picker for year and month selections
 * @param MonthPickerProps Props with onChange callback function
 */
export const MonthPicker: FC<MonthPickerProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2020, 5));
  const maxMonth = new Date();

  // Label style override
  const styles = {
    lineHeight: "1.25rem",
    fontSize: "1.15rem",
    fontWeight: 400,
    color: "#000000",
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        id="datePicker"
        InputProps={{style: {marginTop: 25}}}
        InputLabelProps={{ style: styles }}
        label="Date"
        className="ml-5"
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date as Date);
          onChange(date as Date);
        }}
        views={["year", "month"]}
        minDate={new Date("2016-01-01")}
        maxDate={maxMonth.setMonth(maxMonth.getMonth() - 1)}
      />
    </MuiPickersUtilsProvider>
  );
};
