import React, { FC, useState } from "react";
import { MonthPicker } from "../MonthPicker/MonthPicker"

export const SelectMenu: FC = () => {
  // Extract a dictionary of countries from the EIOPA curves and its corresponding country code for filtering

  const options= {'Euro': 'EUR', 'Austria': 'AT', 'Belgium': 'BE', 'Bulgaria': 'BG', 'Croatia': 'HR', 'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Estonia': 'EE', 'Finland': 'FI', 'France': 'FR', 'Germany': 'DE', 'Greece': 'GR', 'Hungary': 'HU', 'Iceland': 'IS', 'Ireland': 'IE', 'Italy': 'IT', 'Latvia': 'LV', 'Liechtenstein': 'LI', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Malta': 'MT', 'Netherlands': 'NL', 'Norway': 'NO', 'Poland': 'PL', 'Portugal': 'PT', 'Romania': 'RO', 'Russia': 'RU', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Spain': 'ES', 'Sweden': 'SE', 'Switzerland': 'CH', 'United Kingdom': 'GB', 'Australia': 'AU', 'Brazil': 'BR', 'Canada': 'CA', 'Chile': 'CL', 'China': 'CN', 'Colombia': 'CO', 'Hong Kong': 'HK', 'India': 'IN', 'Japan': 'JP', 'Malaysia': 'MY', 'Mexico': 'MX', 'New Zealand': 'NZ', 'Singapore': 'SG', 'South Africa': 'ZA', 'South Korea': 'KR', 'Taiwan': 'TW', 'Thailand': 'TH', 'Turkey': 'TR', 'United States': 'US'}

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedCountry, setSelectedCountry] = useState<keyof typeof options>("United Kingdom")
  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

  console.log(selectedDate);
  console.log(lastDay);

  return (
    <div className="bg-gray-50">
      <div className="left-0 max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-3xl sm:leading-10">
          Download cleaned risk free EIOPA rates here:
          <br />
          <span className="text-teal-500">Pick a month and currency</span>
        </h2>
          <div className="flex-wrap align-right sm:flex sm:align-bottom sm:justify-evenly">
          <div className="left-0 mt-10 mr-5 max-w-screen-xs">
            <MonthPicker onChange={setSelectedDate} />
          </div>
            <div className="mt-5">
              <label htmlFor="country" className="text-sm font-normal leading-5 text-black align-center">
                Country
              </label>
              <select
                defaultValue={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as keyof typeof options)}
                id="currency"
                className="block w-full py-2 pl-3 pr-10 mt-1 text-sm leading-6 border-gray-300 cursor-pointer form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5">
                {Object.keys(options).map((country) => (
                  <option> {country} </option>
                ))}
              </select>
            </div>
            <button className="pt-10 ml-5 text-sm sm:mt-0">
              <a
                href={"http://localhost:7071/api/yield-curve?date="+lastDay+"&filter=country_code eq '"+options[selectedCountry]+"'&data_format=csv"}
                className="w-full px-6 py-3 font-normal text-white bg-teal-700 border border-transparent rounded-md text-md h-/2 hover:text-teal-white hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-300">
                Download
              </a>
            </button>
          </div>
        </div>
      </div>
  );}
