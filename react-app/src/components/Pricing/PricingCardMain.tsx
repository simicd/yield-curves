import React, { FC } from "react";
import { PricingCardProps } from "./PricingCardProps";
import { CheckmarkIcon } from "./CheckMarkIcon";
import { Link } from "react-router-dom";

/**
 * Central pricing card for main offer
 * @param PricingCardProps Pricing card properties
 */
export const PricingCardMain: FC<PricingCardProps> = ({ title, amount, benefits, buttonText, buttonUrl }) => {
  return (
    <div className="max-w-lg mx-auto mt-10 lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
      <div className="relative z-10 rounded-lg shadow-xl">
        <div className="absolute inset-0 border-2 border-teal-600 rounded-lg pointer-events-none"></div>
        <div className="absolute inset-x-0 top-0 transform translate-y-px">
          <div className="flex justify-center transform -translate-y-1/2">
            {/* <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wider text-white uppercase bg-teal-600 rounded-full">
              Most popular
            </span> */}
          </div>
        </div>
        <div className="px-6 pt-12 pb-10 bg-white rounded-t-lg">
          <div>
            <h3 className="text-3xl font-semibold leading-9 text-center text-gray-900 sm:-mx-6" id="tier-growth">
              {title}
            </h3>
            <div className="flex items-center justify-center mt-4">
              <span className="flex items-start px-3 text-6xl leading-none tracking-tight text-gray-900 sm:text-6xl">
                <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                <span className="font-extrabold">{amount}</span>
              </span>
              <span className="text-2xl font-medium leading-8 text-gray-500">/month</span>
            </div>
          </div>
        </div>
        <div className="px-6 pt-10 pb-8 border-t-2 border-gray-100 rounded-b-lg bg-gray-50 sm:px-10 sm:py-10">
          <ul>
            {benefits.map((benefit) => (
              <li className="flex items-start mt-4">
                <div className="flex-shrink-0">
                  <CheckmarkIcon />
                </div>
                <p className="ml-3 text-base font-medium leading-6 text-gray-500">{benefit}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <div className="rounded-lg shadow-md">
              <Link
                to={buttonUrl}
                className="block w-full px-6 py-4 text-xl font-medium leading-6 text-center text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-lg hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal"
                aria-describedby="tier-growth">
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
