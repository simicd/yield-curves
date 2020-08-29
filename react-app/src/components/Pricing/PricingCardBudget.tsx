import React, { FC } from "react";
import { PricingCardProps } from "./PricingCardProps";
import { Price } from "./Price";
import { CheckmarkIcon } from "./CheckMarkIcon";
import { Link } from "react-router-dom";

/**
 * Leftmost pricing card for budget offer
 * @param PricingCardProps Pricing card properties
 */
export const PricingCardBudget: FC<PricingCardProps> = ({ title, price, benefits, buttonText, buttonUrl }) => {
  return (
    <div className="max-w-md mx-auto lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
      <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-l-lg">
        <div className="flex flex-col flex-1">
          <div className="px-6 py-10 bg-white">
            <div>
              <h3 className="text-2xl font-medium leading-8 text-center text-gray-900" id="tier-hobby">
                {title}
              </h3>
              <Price price={price} />
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
                <Link
                  to={buttonUrl}
                  className="block w-full px-6 py-3 text-base font-medium leading-6 text-center text-teal-600 transition duration-150 ease-in-out bg-white border border-transparent rounded-lg hover:text-teal-100 hover:bg-teal-600 focus:outline-none focus:shadow-outline"
                  aria-describedby="tier-hobby">
                  {buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
