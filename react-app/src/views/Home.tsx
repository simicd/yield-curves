import React, { FC, useState } from "react";

import { SubscriptionSection } from "../components/Subscribe/SubscriptionSection";
// import { PricingSection } from "../components/Pricing/PricingSection";
import { DownloadSection } from "../components/DownloadSection/DownloadSection";
import { YieldCurveWidget } from "../components/Widgets/YieldCurveWidget";
import { FeatureSection } from "../components/Feature/FeatureSection";
import { groupBy } from "lodash";
import { Notification, NotificationProps } from "../components/Notification/Notification";
import { defaultData } from "../assets/sampleData";
import { TimeSerie } from "../types/TimeSerie";

import { FeatureList } from "../components/Feature/FeatureList";
import { FeatureListItem } from "../components/Feature/FeatureListItem";
import { HeaderSection } from "../components/Layout/HeaderSection";
import { useFetch } from "../utils/useFetch";

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

const processData = (data: DataRow[]) => {
  // First extract two columns and reshape it so that they can be fed to nivo and then sort by maturity (x-axis)
  const transformedData = data
    .map((row) => {
      return { x: row.Maturity, y: row.Rate, id: row.country_code };
    })
    .sort((a, b) => (a.x > b.x ? 1 : -1));

  // Generate required for nivo charts (Serie[])
  const processedData = groupBy(transformedData, (r) => r.id);
  const dataArray: TimeSerie[] = [];
  for (let key in processedData) {
    dataArray.push({
      id: key,
      date: new Date(Date.UTC(2020, 6 - 1, 30)), // Note that JS/TS months are zero-indexed (e.g. new Date(2020, 5, 30) => June 30th, 2020) TODO@simicd: Use data from API instead of hard-coding
      data: processedData[key],
    });
  }
  return dataArray;
};

export const Home: FC = () => {
  // const [data, setData] = useState<TimeSerie[]>(defaultData);
  const [showNotification, setShowNotification] = useState<NotificationProps["status"]>();

  // Note that JS/TS months are zero-indexed (e.g. new Date(2020, 5, 30) => June 30th, 2020)
  const date = new Date(Date.UTC(2020, 6 - 1, 30));

  // for local testing replace with http://localhost:7071/api
  const result = useFetch<TimeSerie[]>(
    `https://api.yield-curves.com/yield-curve?date=${
      date.toISOString().split("T")[0]
    }&filter=${["US", "GB", "CN", "CH", "JP", "NO", "DE", "RU", "AU", "HK", "SG"].map(c => `country_code eq '${c}'`).join(" or ")}`,
    undefined,
    processData
  );


  console.log(result)
  const data = result.status === "success" ? result.data : defaultData;

  return (
    <>
      <HeaderSection>
        {{
          content: (
            <>
              <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                A <span className="text-teal-500"> time series of EIOPA's risk free rates </span>
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
                    onClick={() => {
                      setShowNotification("info");
                    }}
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-teal-800 transition duration-150 ease-in-out border border-transparent rounded-md bg-cool-gray-100 hover:text-teal-500 hover:bg-cool-gray-100 focus:outline-none focus:shadow-outline-teal focus:border-teal-300 md:py-4 md:text-lg md:px-10">
                    Live demo
                  </button>
                </div>
              </div>
            </>
          ),
          image: (
            <div
              className="py-6 bg-gray-800 md:py-12 lg:pl-32 "
              style={{
                backgroundColor: "#252f3f",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235d526f' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
              }}>
              <YieldCurveWidget data={data} />
            </div>
          ),
        }}
      </HeaderSection>
      <FeatureSection sectionHeader="EIOPA risk-free rates API" title="A better way to get yield curves">
        <div className="lg:text-center">
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
      </FeatureSection>

      {/* <Pricing /> */}

      <DownloadSection />

      <SubscriptionSection />

      <Notification status={showNotification} onClick={() => setShowNotification(undefined)}>
        <>
          <p className="text-sm font-medium leading-5 text-gray-900">Live demo</p>{" "}
          <p className="mt-1 text-sm leading-5 text-gray-500">
            The chart displays the latest yield curves for a selected set of countries. Click on the country code
            buttons to explore the different rates!
          </p>
        </>
      </Notification>
    </>
  );
};
