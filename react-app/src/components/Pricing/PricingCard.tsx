import React, { FC } from "react";
import { PricingCardProps } from "./PricingCardProps";
import { CheckmarkIcon } from "./CheckMarkIcon";
import { Price } from "./Price";
import { Link } from "react-router-dom";

export const PricingCard: FC<PricingCardProps> = ({ benefits, buttonText, buttonUrl, price, title }) => {
  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6 h-44">
          <div className="flex items-center justify-center">
            <h3
              className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide text-teal-600 uppercase rounded-full bg-teal-50"
              id="tier-standard">
              {title}
            </h3>
          </div>
          <Price price={price} />
        </div>
        <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 space-y-6 bg-gray-50 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li className="flex items-start">
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
                className="block w-full px-4 py-2 leading-6 text-center text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-lg text-md hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal"
                aria-describedby="tier-growth">
                {buttonText}
              </a>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};
