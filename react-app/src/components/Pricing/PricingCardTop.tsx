import React, { FC } from "react";
import { PricingCardProps } from "./PricingCardProps";
import { CheckmarkIcon } from "./CheckMarkIcon";

/**
 * Rightmost pricing card for top offer
 * @param PricingCardProps Pricing card properties
 */
export const PricingCardTop: FC<PricingCardProps> = ({ title, amount, benefits, buttonText, buttonUrl }) => {
  return (
    <div className="max-w-md mx-auto mt-10 lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3">
      <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-r-lg">
        <div className="flex flex-col flex-1">
          <div className="px-6 py-10 bg-white">
            <div>
              <h3 className="text-2xl font-medium leading-8 text-center text-gray-900" id="tier-scale">
                {title}
              </h3>
              <div className="flex items-center justify-center mt-4">
                <span className="flex items-start px-3 text-6xl leading-none tracking-tight text-gray-900">
                  <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                  <span className="font-extrabold">{amount}</span>
                </span>
                <span className="text-xl font-medium leading-7 text-gray-500">/month</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-1 p-6 border-t-2 border-gray-100 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
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
            <div className="mt-8">
              <div className="rounded-lg shadow-md">
                <a
                  href={buttonUrl}
                  className="block w-full px-6 py-3 text-base font-medium leading-6 text-center text-indigo-600 transition duration-150 ease-in-out bg-white border border-transparent rounded-lg hover:text-indigo-100 hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                  aria-describedby="tier-scale">
                  {buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
