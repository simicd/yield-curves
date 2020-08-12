import React, { FC, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
// import {lineData} from '../../assets/sampleData'
import clsx from "clsx";
import { TimeSerie } from "../../types";

/**
 * Chart theme customization
 */
const theme = {
  axis: {
    domain: {
      line: {
        stroke: "transparent",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "transparent",
        strokeWidth: 1,
      },
      text: {
        fill: "lightgray",
      },
    },
    legend: {
      text: {
        fontSize: 12,
        fill: "lightgray",
      },
    },
  },
};

interface YieldCurveWidgetProps {
  /** Dataset rows with date as mandatory additional field */
  data: TimeSerie[];
}

/**
 * Widget displaying yield curves with selection button
 * @param YieldCurveWidgetProps Widget properties
 */
export const YieldCurveWidget: FC<YieldCurveWidgetProps> = ({ data }) => {
  // Select first country in the list as default selection
  const [country, setCountry] = useState(data[0].id);

  // Copy the selected data and set always the same ID so that nivo applies animation from one curve to the next
  // The dataset needs to be copied since otherwise the original data is overwritten
  const selectedData = [Object.assign({}, data.filter((d) => d.id === country)[0])];
  selectedData[0].id = "Rate";

  return (
    <figure className="px-4 mx-auto md:w-11/12">
      <div style={{ height: 450 }} className="-mr-6 md:mt-6">
        <ResponsiveLine
          data={selectedData}
          theme={theme}
          margin={{ top: 50, right: 60, bottom: 60, left: 60 }}
          xScale={{ type: "linear" }}
          yScale={{ type: "linear", min: -0.01, max: 0.05 }}
          yFormat=".1%" // Format as percentage with one decimal point
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Time to maturity",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -50,
            legendPosition: "middle",
            format: ".1%",
            tickValues: 6,
          }}
          enableGridX={false}
          gridYValues={6} // Number of grid lines
          enableSlices="x"
          colors={"#4FD1C5"} // Line color: bg-teal-400
          enablePoints={false}
          pointColor={{ from: "color", modifiers: [] }} // Inherit color from line
          pointBorderWidth={2}
          pointBorderColor={{ from: "color", modifiers: [] }}
          pointLabel="y"
          pointLabelYOffset={-12}
          crosshairType="bottom"
          useMesh={true}
          enableArea={true}
          areaOpacity={0.5}
          motionDamping={8}
          motionStiffness={80}
          defs={[
            // Define gradient
            {
              id: "gradient",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "inherit" },
                { offset: 100, color: "#4b5563" },
              ],
            },
          ]}
          fill={[
            // Apply gradient to all lines
            { match: "*", id: "gradient" },
          ]}
        />
      </div>
      <div className="flex flex-wrap ml-4">
        {data
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((d) => (
            <button
              key={d.id}
              className={clsx(
                "ml-1 mt-1 w-10 h-10 text-white rounded-md hover:bg-teal-500 focus:outline-none shadow-inner",
                {
                  "bg-teal-600": country === d.id,
                  "bg-gray-700": country !== d.id,
                }
              )}
              onClick={() => setCountry(d.id)}>
              {d.id}
            </button>
          ))}
      </div>
      <figcaption className="mt-4 ml-6 text-xs text-gray-400">
        Source:{" "}
        <a
          className="underline"
          href="https://www.eiopa.europa.eu/tools-and-data/risk-free-interest-rate-term-structures_en#MonthlyRFRcalculations"
          target="_blank"
          rel="noopener noreferrer">
          EIOPA monthly RFR
        </a>{" "}
        (data: {selectedData[0].date.toISOString().split("T")[0]})
      </figcaption>
    </figure>
  );
};
