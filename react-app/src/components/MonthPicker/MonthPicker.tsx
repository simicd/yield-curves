import React, { FC, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export const MonthPicker: FC = () =>  {
  const [selectedDate, handleDateChange] = useState(new Date(2020, 5));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        className="text-100"
        value={selectedDate}
        onChange={(e) => handleDateChange(e ? e as Date :  new Date(2020, 5))}
        views={["year", "month"]}
      />
    </MuiPickersUtilsProvider>
  );
}
