import React, { FC, useEffect, useState } from "react";

import { Subscription } from "../components/Subscribe/Subscribe";
// import { Pricing } from "../components/Pricing/Pricing";
import { SelectMenu } from "../components/SelectMenu/SelectMenu";
import { YieldCurveWidget } from "../components/Widgets/YieldCurveWidget";
import { Feature } from "../components/Feature/Feature";
import { Serie } from "@nivo/line";
import { groupBy } from "lodash";
import { Notification, NotificationProps } from "../components/Notification/Notification";
import { defaultData } from "../assets/sampleData";

interface DataRow {
  CRA: number;
  Convergence: number;
  Country: string;
  Coupon_freq: number;
  Date: Date;
  EIOPA_RFR_ID: string;
  LLP: number;
  Maturity: number;
  Rate: number;
  UFR: number;
  VA: number;
  alpha: number;
  country_code: string;
  rate_id: string;
  PartitionKey: string;
  RowKey: string;
}

export const Home: FC = () => {
  const [data, setData] = useState<Serie[]>(defaultData);
  console.log(data)
  const [showNotification, setShowNotification] = useState<NotificationProps["state"]>()

  useEffect(() => {
    // Define asynchronous function - since useEffect hook can't handle async directly,
    // a nested function needs to be defined first and then called thereafter
    const fetchData = async () => {
      // Fetch data from REST API
      // for local testing replace with http://localhost:7071/api
      const response = await fetch(
        "https://yield-curve-functions.azurewebsites.net/api/yield-curve?date=2020-06-30&filter=country_code eq 'US' or country_code eq 'GB' or country_code eq 'CN' or country_code eq 'CH' or country_code eq 'JP' or country_code eq 'NO' or country_code eq 'DE' or country_code eq 'RU' or country_code eq 'AU' or country_code eq 'HK' or country_code eq 'SG'"
      );

      // Extract json
      const rawData: DataRow[] = await response.json();

      // First extract two columns and reshape it so that they can be fed to nivo and then sort by maturity (x-axis)
      const transformedData = rawData
        .map((row) => {
          return { x: row.Maturity, y: row.Rate, id: row.country_code };
        })
        .sort((a, b) => (a.x > b.x ? 1 : -1));

      // Generate required for nivo charts (Serie[])
      const processedData = groupBy(transformedData, (r) => r.id);
      const dataArray = [];
      for (let key in processedData) {
        dataArray.push({
          id: key,
          data: processedData[key],
        });
      }
      setData(dataArray);
    };
    // Call async function
    fetchData();
  }, []);

  // const displayName = Home.name;
  return (
    <>
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-screen-xl mx-auto ">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none">
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">

                    <div className="flex items-center -mr-2 md:hidden">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                        id="main-menu"
                        aria-label="Main menu"
                        aria-haspopup="true">
                        <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4">
                  {/* <a
                    href="/"
                    className="font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">
                    Product
                  </a>
                  <a
                    href="/"
                    className="ml-8 font-medium text-teal-800 transition duration-150 ease-in-out hover:text-teal-500">
                    Log in
                  </a> */}
                </div>
              </nav>
            </div>

            <main className="max-w-screen-xl px-4 mx-auto mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                  A <span className="text-teal-500"> time series of yield curves </span>
                  <br className="xl:hidden" />
                  at your fingertips
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Browse EIOPA's Solvency II risk free rates for any currency, any maturity, at any date.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#subscription"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-teal-700 border border-transparent rounded-md hover:bg-teal-500 focus:outline-none focus:border-teal-800 focus:shadow-outline-teal md:py-4 md:text-lg md:px-10">
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => {setShowNotification("info")}}
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-teal-800 transition duration-150 ease-in-out border border-transparent rounded-md bg-cool-gray-100 hover:text-teal-500 hover:bg-cool-gray-100 focus:outline-none focus:shadow-outline-teal focus:border-teal-300 md:py-4 md:text-lg md:px-10">
                      Live demo
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div
          className="py-6 bg-gray-800 md:py-12 lg:pl-32 lg:absolute lg:inset-y-0 lg:left-1/2 lg:w-1/2 lg:max-w-4xl"
          style={{
            backgroundColor: "#252f3f",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235d526f' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}>
          <YieldCurveWidget data={data} />
        </div>
      </div>
      <Feature />
      {/* <Pricing /> */}
      <Notification state={showNotification} onClick={() => setShowNotification(undefined)}>
          <>
            <p className="text-sm font-medium leading-5 text-gray-900">Live demo</p>{" "}
            <p className="mt-1 text-sm leading-5 text-gray-500">
            The chart displays the latest yield curves for a selected set of countries. Click on the country code buttons to explore the different rates!
            </p>
          </>
      </Notification>
      <SelectMenu/>
      <Subscription />
    </>
  );
};
