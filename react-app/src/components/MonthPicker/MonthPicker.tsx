import React, { FC, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

interface MonthPickerProps {
  onChange: (date: Date) => void;
}

export const MonthPicker: FC<MonthPickerProps> = ({ onChange }) =>  {
  const [selectedDate, setSelectedDate] = useState(new Date(2020, 5));
  const maxMonth = new Date()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        className="ml-5"
        value={selectedDate}
        onChange={(date) => { setSelectedDate(date as Date); onChange(date as Date); }}
        views={["year", "month"]}
        minDate={new Date('2016-01-01')}
        maxDate={maxMonth.setMonth(maxMonth.getMonth() - 1)}
      />
    </MuiPickersUtilsProvider>
  );
}
