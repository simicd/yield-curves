import React, { FC, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

interface MonthPickerProps {
  onChange: (date: Date) => void;
}

export const MonthPicker: FC<MonthPickerProps> = ({ onChange }) =>  {
  const [selectedDate, setSelectedDate] = useState(new Date(2020, 5));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        className="text-100"
        value={selectedDate}
        onChange={(date) => { setSelectedDate(date as Date); onChange(date as Date); }}
        views={["year", "month"]}
      />
    </MuiPickersUtilsProvider>
  );
}
