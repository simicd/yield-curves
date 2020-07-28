import React, { FC, useState } from "react";
import ReactGA from "react-ga";
import { MonthPicker } from "../MonthPicker/MonthPicker";


export const SelectMenu: FC = () => {
  // Extract a dictionary of countries from the EIOPA curves and its corresponding country code for filtering
  const options = {
    Australia: "AU",
    Austria: "AT",
    Belgium: "BE",
    Brazil: "BR",
    Bulgaria: "BG",
    Canada: "CA",
    Chile: "CL",
    China: "CN",
    Colombia: "CO",
    Croatia: "HR",
    Cyprus: "CY",
    "Czech Republic": "CZ",
    Denmark: "DK",
    Estonia: "EE",
    Euro: "EUR",
    Finland: "FI",
    France: "FR",
    Germany: "DE",
    Greece: "GR",
    "Hong Kong": "HK",
    Hungary: "HU",
    Iceland: "IS",
    India: "IN",
    Ireland: "IE",
    Italy: "IT",
    Japan: "JP",
    Latvia: "LV",
    Liechtenstein: "LI",
    Lithuania: "LT",
    Luxembourg: "LU",
    Malaysia: "MY",
    Malta: "MT",
    Mexico: "MX",
    Netherlands: "NL",
    "New Zealand": "NZ",
    Norway: "NO",
    Poland: "PL",
    Portugal: "PT",
    Romania: "RO",
    Russia: "RU",
    Singapore: "SG",
    Slovakia: "SK",
    Slovenia: "SI",
    "South Africa": "ZA",
    "South Korea": "KR",
    Spain: "ES",
    Sweden: "SE",
    Switzerland: "CH",
    Taiwan: "TW",
    Thailand: "TH",
    Turkey: "TR",
    "United Kingdom": "GB",
    "United States": "US",
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState<keyof typeof options>("United Kingdom");
  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).toISOString().split('T')[0];

  // console.log(lastDay);
  // console.log(options[selectedCountry]);

  return (
    <div className="bg-gray-50">
      <div className="left-0 max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-3xl sm:leading-10">
          Download risk free EIOPA rates <br/>between 2016 and the most recent month
          <br />
          <span className="text-teal-500">Pick a month and currency</span>
        </h2>
        <div className="flex flex-col flex-wrap h-48 align-bottom md:h-auto md:flex-row lg:w-2/5 justify-evenly">
          <div style={{ maxWidth: 100 }} className="mb-1 md:self-end">
            <MonthPicker onChange={setSelectedDate} />
          </div>
          <div className="md:self-end">
            <label htmlFor="country" className="text-sm font-normal leading-5 text-black align-center">
              Country
            </label>
            <select
              defaultValue={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value as keyof typeof options)}
              id="currency"
              className="block w-full mt-1 text-sm leading-6 border-gray-300 cursor-pointer form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5">
              {Object.keys(options).map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </div>
          <a
            href={ // for local testing replace with http://localhost:7071/api
              "https://api.yield-curves.com/yield-curve?date=" +
              lastDay +
              "&filter=country_code eq '" +
              options[selectedCountry] +
              "'&data_format=csv"
            }
            className="px-6 py-2 text-sm font-normal text-white bg-teal-700 border border-transparent rounded-md md:self-end hover:text-teal-white hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-300"
            onClick={() => GAevent("User", "Download Yield Curves")}>
            <button onClick={() => GAevent("User", "Download Yield Curves")}>Download</button>
          </a>
        </div>
      </div>
    </div>
  );
};


export const GAevent = (categoryName: string, eventName: string) => {
  ReactGA.event({
      category: categoryName,  // Required
      action: eventName,       // Required
      label: 'labelName',
      value: 10,
      nonInteraction: false
  });
}

