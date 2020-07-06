import React, { FC } from "react";

export const Home: FC = () => {
  // const displayName = Home.name;
  return (
<div className="relative overflow-hidden bg-white">
  <div className="max-w-screen-xl mx-auto ">
    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
      <svg className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
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
                <button type="button" className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500" id="main-menu" aria-label="Main menu" aria-haspopup="true">
                  <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4">
            <a href="http://api.yield-curves.com/" className="font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">Product</a>
            <a href="http://api.yield-curves.com/" className="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">Features</a>
            <a href="http://api.yield-curves.com/" className="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">Marketplace</a>
            <a href="http://api.yield-curves.com/" className="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">Company</a>
            <a href="http://api.yield-curves.com/" className="ml-8 font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-900">Log in</a>
          </div>
        </nav>
      </div>



      <main className="max-w-screen-xl px-4 mx-auto mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            A time series of yield curves
            <br className="xl:hidden" />
            <span className="text-indigo-600">at your finger tips</span>
          </h2>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Browse the risk free EIOPA rates for Solvency II for any currency, any date, at any maturity.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a href="http://api.yield-curves.com/" className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a href="http://api.yield-curves.com/" className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-indigo-700 transition duration-150 ease-in-out bg-indigo-100 border border-transparent rounded-md hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 md:py-4 md:text-lg md:px-10">
                Live demo
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://source.unsplash.com/PhYq704ffdA/3200 × 4800" alt="" />
  </div>
</div>
  );
}

