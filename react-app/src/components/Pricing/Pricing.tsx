import React, { FC } from "react";

export const Pricing: FC = () => {
  return (
    <>
      <div className="bg-gray-900">
        <div className="px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold leading-6 tracking-wider text-gray-300 uppercase">Pricing</h2>
          </div>
        </div>

        <div className="pb-12 mt-16 bg-white lg:mt-20 lg:pb-20">
          <div className="relative z-0">
            <div className="absolute inset-0 bg-gray-900 h-5/6 lg:h-2/3"></div>
            <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="relative lg:grid lg:grid-cols-7">
                <div className="max-w-md mx-auto lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
                  <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-l-lg">
                    <div className="flex flex-col flex-1">
                      <div className="px-6 py-10 bg-white">
                        <div>
                          <h3 className="text-2xl font-medium leading-8 text-center text-gray-900" id="tier-hobby">
                            Hobby
                          </h3>
                          <div className="flex items-center justify-center mt-4">
                            <span className="flex items-start px-3 text-6xl leading-none tracking-tight text-gray-900">
                              <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                              <span className="font-extrabold">79</span>
                            </span>
                            <span className="text-xl font-medium leading-7 text-gray-500">/month</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-6 border-t-2 border-gray-100 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                        <ul>
                          <li className="flex items-start">
                            <div className="flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-green-500"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                              Pariatur quod similique
                            </p>
                          </li>
                          <li className="flex items-start mt-4">
                            <div className="flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-green-500"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                              Sapiente libero doloribus
                            </p>
                          </li>
                          <li className="flex items-start mt-4">
                            <div className="flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-green-500"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                              Vel ipsa esse repudiandae
                            </p>
                          </li>
                        </ul>
                        <div className="mt-8">
                          <div className="rounded-lg shadow-md">
                            <a
                              href="#"
                              className="block w-full px-6 py-3 text-base font-medium leading-6 text-center text-indigo-600 transition duration-150 ease-in-out bg-white border border-transparent rounded-lg hover:text-indigo-500 focus:outline-none focus:shadow-outline"
                              aria-describedby="tier-hobby">
                              Start your trial
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-lg mx-auto mt-10 lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
                  <div className="relative z-10 rounded-lg shadow-xl">
                    <div className="absolute inset-0 border-2 border-indigo-600 rounded-lg pointer-events-none"></div>
                    <div className="absolute inset-x-0 top-0 transform translate-y-px">
                      <div className="flex justify-center transform -translate-y-1/2">
                        <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wider text-white uppercase bg-indigo-600 rounded-full">
                          Most popular
                        </span>
                      </div>
                    </div>
                    <div className="px-6 pt-12 pb-10 bg-white rounded-t-lg">
                      <div>
                        <h3
                          className="text-3xl font-semibold leading-9 text-center text-gray-900 sm:-mx-6"
                          id="tier-growth">
                          Growth
                        </h3>
                        <div className="flex items-center justify-center mt-4">
                          <span className="flex items-start px-3 text-6xl leading-none tracking-tight text-gray-900 sm:text-6xl">
                            <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                            <span className="font-extrabold">149</span>
                          </span>
                          <span className="text-2xl font-medium leading-8 text-gray-500">/month</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pt-10 pb-8 border-t-2 border-gray-100 rounded-b-lg bg-gray-50 sm:px-10 sm:py-10">
                      <ul>
                        <li className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                            Quia rem est sed impedit magnam
                          </p>
                        </li>
                        <li className="flex items-start mt-4">
                          <div className="flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                            Dolorem vero ratione voluptates
                          </p>
                        </li>
                        <li className="flex items-start mt-4">
                          <div className="flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                            Qui sed ab doloribus voluptatem dolore
                          </p>
                        </li>
                        <li className="flex items-start mt-4">
                          <div className="flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                            Laborum commodi molestiae id et fugiat
                          </p>
                        </li>
                        <li className="flex items-start mt-4">
                          <div className="flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                            Nam ut ipsa nesciunt culpa modi dolor
                          </p>
                        </li>
                      </ul>
                      <div className="mt-10">
                        <div className="rounded-lg shadow-md">
                          <a
                            href="#"
                            className="block w-full px-6 py-4 text-xl font-medium leading-6 text-center text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo"
                            aria-describedby="tier-growth">
                            Start your trial
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-md mx-auto mt-10 lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3">
                  <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-r-lg">
                    <div className="flex flex-col flex-1">
                      <div className="px-6 py-10 bg-white">
                        <div>
                          <h3 className="text-2xl font-medium leading-8 text-center text-gray-900" id="tier-scale">
                            Scale
                          </h3>
                          <div className="flex items-center justify-center mt-4">
                            <span className="flex items-start px-3 text-6xl leading-none tracking-tight text-gray-900">
                              <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                              <span className="font-extrabold">349</span>
                            </span>
                            <span className="text-xl font-medium leading-7 text-gray-500">/month</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-6 border-t-2 border-gray-100 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                        <ul>
                          <li className="flex items-start">
                            <div className="flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-green-500"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                              Pariatur quod similique
                            </p>
                          </li>
                          <li className="flex items-start mt-4">
                            <div className="flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-green-500"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                              Sapiente libero doloribus
                            </p>
                          </li>
                          <li className="flex items-start mt-4">
                            <div className="flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-green-500"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p className="ml-3 text-base font-medium leading-6 text-gray-500">
                              Vel ipsa esse repudiandae
                            </p>
                          </li>
                        </ul>
                        <div className="mt-8">
                          <div className="rounded-lg shadow-md">
                            <a
                              href="#"
                              className="block w-full px-6 py-3 text-base font-medium leading-6 text-center text-indigo-600 transition duration-150 ease-in-out bg-white border border-transparent rounded-lg hover:text-indigo-500 focus:outline-none focus:shadow-outline"
                              aria-describedby="tier-scale">
                              Start your trial
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
