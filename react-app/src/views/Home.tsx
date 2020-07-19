import React, { FC, useEffect, useState } from "react";

import { Subscription } from "../components/Subscribe/Subscribe";
import { YieldCurveWidget } from "../components/Widgets/YieldCurveWidget";
import { Feature } from "../components/Feature/Feature";
import { Serie } from "@nivo/line";
import { groupBy } from "lodash";

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
  const [data, setData] = useState<Serie[]>([
    {
      id: "US",
      data: [{ x: 0, y: 0.0 }, { x: 150, y: 0.0 }],
    },
  ]);

  useEffect(() => {
    // Define asynchronous function - since useEffect hook can't handle async directly,
    // a nested function needs to be defined first and then called thereafter
    const fetchData = async () => {
      // Fetch data from REST API
      const response = await fetch(
        "http://api.yield-curves.com/api/yield-curve?date=2020-06-30&filter=country_code eq 'US' or country_code eq 'GB' or country_code eq 'CN' or country_code eq 'CH' or country_code eq 'JP' or country_code eq 'NO' or country_code eq 'DE' or country_code eq 'RU' or country_code eq 'AU' or country_code eq 'HK' or country_code eq 'SG'&code=..."
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
    // fetchData();
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
                    <a href="http://api.yield-curves.com/" aria-label="Home">
                      <img className="w-auto h-8 sm:h-10" src="/img/logos/workflow-mark-on-white.svg" alt="Logo" />
                    </a>
                    <div className="flex items-center -mr-2 md:hidden">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                        id="main-menu"
                        aria-label="Main menu"
                        aria-haspopup="true">
                        <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4">
                  <a
                    href="/"
                    className="font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">
                    Product
                  </a>
                  <a
                    href="/"
                    className="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">
                    Features
                  </a>
                  <a
                    href="/"
                    className="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">
                    Marketplace
                  </a>
                  <a
                    href="/"
                    className="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">
                    Company
                  </a>
                  <a
                    href="/"
                    className="ml-8 font-medium text-teal-800 transition duration-150 ease-in-out hover:text-teal-500">
                    Log in
                  </a>
                </div>
              </nav>
            </div>

            <main className="max-w-screen-xl px-4 mx-auto mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                  A time series of yield curves
                  <br className="xl:hidden" />
                  <span className="text-teal-500"> at your fingertips</span>
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Browse the risk free EIOPA rates for Solvency II for any currency, any date, at any maturity.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="http://api.yield-curves.com/"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-teal-700 border border-transparent rounded-md hover:bg-teal-500 focus:outline-none focus:border-teal-800 focus:shadow-outline-teal md:py-4 md:text-lg md:px-10">
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="http://api.yield-curves.com/"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-teal-800 transition duration-150 ease-in-out border border-transparent rounded-md bg-cool-gray-100 hover:text-teal-500 hover:bg-cool-gray-100 focus:outline-none focus:shadow-outline-teal focus:border-teal-300 md:py-4 md:text-lg md:px-10">
                      Live demo
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div
          className="bg-gray-800 lg:pl-32 lg:absolute lg:inset-y-0 lg:left-1/2 lg:w-1/2 lg:max-w-4xl"
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
      <Subscription />
    </>
  );
};
