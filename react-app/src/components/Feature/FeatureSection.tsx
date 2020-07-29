import React, { FC } from "react";
import { FeatureList } from "./FeatureList";
import { FeatureListItem } from "./FeatureListItem";

/**
 * Feature section
 */
export const FeatureSection: FC = () => {
  return (
    <div className="py-32 bg-white">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base font-semibold leading-6 tracking-wide text-teal-500 uppercase">
            EIOPA risk-free rates API
          </p>
          <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            A better way to get yield curves
          </h3>
          <p className="max-w-2xl mt-4 text-xl leading-7 text-gray-500 lg:mx-auto">
            Tired of{" "}
            <a
              href="https://www.eiopa.europa.eu/tools-and-data/risk-free-interest-rate-term-structures_en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline">
              downloading Excel files
            </a>{" "}
            and spending hours normalizing the data? Our service provides this to you - cleaned data delivered through
            an API. Fast & efficient.
          </p>
        </div>

        <FeatureList>
          <FeatureListItem
            title="Complete time series"
            description="All current & historic rates are available."
            svgPath={<path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />}
          />
          <FeatureListItem
            title="Customize your data output"
            description="Get rates for your chosen portfolios."
            svgPath={<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
          />
          <FeatureListItem
            title="Speedy data transfer"
            description="Use our API to fetch data instantly."
            svgPath={<path d="M13 10V3L4 14h7v7l9-11h-7z" />}
          />
          <FeatureListItem
            title="Flat fees"
            description="Monthly payment gives you unlimited access."
            svgPath={
              <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            }
          />
        </FeatureList>
      </div>
    </div>
  );
};
