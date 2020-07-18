import React, { FC, useState } from "react";
import { MonthPicker } from "../MonthPicker/MonthPicker"

export const SelectMenu: FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  console.log(selectedDate);

  return (
    <div className="bg-gray-50">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Download risk free EIOPA rates for yourself
          <br />
          <span className="text-indigo-600">Pick a date and currency.</span>
        </h2>
        <>
        <MonthPicker onChange={setSelectedDate}/>
        </>
          <div className="inline-flex ml-10 rounded-md shadow">
          <div>
              <label htmlFor="currency" className="block text-sm font-medium leading-5 text-gray-700">
                Currency
              </label>
              <select
                id="currency"
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base leading-6 border-gray-300 form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                <option>USD</option>
                <option selected>GBP</option>
                <option>CNY</option>
              </select>
            </div>
          </div>
        </div>
      </div>
  );}