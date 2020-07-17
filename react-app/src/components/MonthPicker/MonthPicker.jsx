import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function MonthPicker() {
  const [selectedDate, handleDateChange] = useState(new Date());
  var monthEndDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        className="text-100"
        value={monthEndDay.getMonth()}
        onChange={handleDateChange}
        views={["month"]}
      />
    </MuiPickersUtilsProvider>
  );
}

export default MonthPicker