import React, { FC, useState } from "react";
import ReactGA from "react-ga";
import { MonthPicker } from "../MonthPicker/MonthPicker";
import { Notification, NotificationProps } from "../Notification/Notification";
import { defaultCountries } from "../../assets/sampleData";
import { useFetch } from "../../utils/useFetch";

export const DownloadSection: FC = () => {
  // List of countries from the EIOPA curves and its corresponding country code for filtering
  const [countries, setCountries] = useState(defaultCountries);
  type countriesList = typeof defaultCountries;

  useFetch<countriesList>({
    url: "https://api.yield-curves.com/config?id=countries",
    processData: (data: any) => {
      setCountries(data.countries);
      return data.countries;
    },
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).toISOString().split("T")[0];
  const [showNotification, setShowNotification] = useState<NotificationProps["status"]>();

  return (
    <div className="relative">
      <div className="bg-gray-50">
        <div className="left-0 max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-3xl sm:leading-10">
            Download risk free EIOPA rates <br />
            between 2016 and{" "}
            <span
              className="hover:text-gray-500"
              // On mobile devices there is no mouse over - hence the click event
              onClick={() => {
                setShowNotification("info");
              }}
              // Add/remove pop-up notification
              onMouseOver={() => {
                setShowNotification("info");
              }}
              onMouseOut={() => {
                setShowNotification(undefined);
              }}>
              today
            </span>
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
                onChange={(e) => setSelectedCountry(e.target.value)}
                id="currency"
                className="block w-full mt-1 text-sm leading-6 border-gray-300 cursor-pointer form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5">
                {countries.map((c) => (
                  <option key={c.country_code}>{c.country}</option>
                ))}
              </select>
            </div>
            <a
              href={
                // for local testing replace with http://localhost:7071/api
                `https://api.yield-curves.com/yield-curve?date=${lastDay}&filter=country_code eq '${
                  countries.filter((d) => d.country === selectedCountry)[0].country_code
                }'&data_format=csv`
              }
              className="px-6 py-2 text-sm font-normal text-white bg-teal-700 border border-transparent rounded-md md:self-end hover:text-teal-white hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-300"
              onClick={() => GAevent("User", "Download Yield Curves")}>
              <button onClick={() => GAevent("User", "Download Yield Curves")}>Download</button>
            </a>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <Notification status={showNotification} onClick={() => setShowNotification(undefined)}>
        <>
          <p className="text-sm font-medium leading-5 text-gray-900">Data availability</p>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            EIOPA publishes the risk free rates once a month a few days after month end. So the latest curve you can
            find here is the previous month end.
          </p>
        </>
      </Notification>
    </div>
  );
};

export const GAevent = (categoryName: string, eventName: string) => {
  ReactGA.event({
    category: categoryName, // Required
    action: eventName, // Required
    label: "labelName",
    value: 10,
    nonInteraction: false,
  });
};
