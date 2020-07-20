import React, { FC } from "react";

export const Feature: FC = () => {
  return (
    <div className="py-32 bg-white">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base font-semibold leading-6 tracking-wide text-teal-500 uppercase">EIOPA risk-free rates API</p>
          <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            A better way to get yield curves
          </h3>
          <p className="max-w-2xl mt-4 text-xl leading-7 text-gray-500 lg:mx-auto">
          Tired of <a href="https://www.eiopa.europa.eu/tools-and-data/risk-free-interest-rate-term-structures_en" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">downloading Excel files</a> and spending hours normalizing the data? Our service provides this to you - cleaned data delivered through an API. Fast & efficient.
          </p>
        </div>

        <div className="mt-10">
          <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
            <li>
              <div className="flex lg:ml-1/4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-teal-600 rounded-md">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">Complete time series</h4>
                  <p className="mt-2 text-base leading-6 text-gray-500">All current & historic rates are available.</p>
                </div>
              </div>
            </li>
            <li className="mt-10 md:mt-0">
              <div className="flex lg:ml-1/4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-teal-600 rounded-md">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">Customize your data output</h4>
                  <p className="mt-2 text-base leading-6 text-gray-500">Get rates for your chosen portfolios.</p>
                </div>
              </div>
            </li>
            <li className="mt-10 md:mt-0">
              <div className="flex lg:ml-1/4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-teal-600 rounded-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">Speedy data transfer</h4>
                  <p className="mt-2 text-base leading-6 text-gray-500">Use our API to fetch data instantly.</p>
                </div>
              </div>
            </li>
            <li className="mt-10 md:mt-0">
              <div className="flex lg:ml-1/4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-teal-600 rounded-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">Flat fees</h4>
                  <p className="mt-2 text-base leading-6 text-gray-500">Monthly payment gives you unlimited access.</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
