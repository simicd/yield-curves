import React, { FC, useState } from "react";
import { Serie, ResponsiveLine } from "@nivo/line";
import clsx from "clsx";

interface YieldCurveWidgetProps {
  /** Dataset */
  data: Serie[];
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
  const selectedData = [Object.assign({}, data.filter((d) => d.id === country)[0])]
  selectedData[0].id = "Rate"

  return (
    <>
      <div style={{ width: 800, height: 500 }} className="mx-auto mt-8">
        <h3 className="mx-6 text-lg font-semibold tracking-wider text-indigo-600 uppercase">
          Yield curves <span className="text-xs text-gray-400">June 30th, 2020</span>
        </h3>
        <div className="ml-6">
          {data.map((d) => (
            <button
              className={clsx("p-2 mx-1 my-2 text-white rounded-md hover:bg-indigo-400", {
                "bg-indigo-400": country === d.id,
                "bg-indigo-700": country !== d.id,
              })}
              onClick={() => setCountry(d.id)}>
              {d.id}
            </button>
          ))}
        </div>

        <ResponsiveLine
          data={selectedData}
          margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
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
            legend: "Interest rate",
            legendOffset: -50,
            legendPosition: "middle",
            format: ".1%",
            tickValues: 6,
          }}
          enableGridX={false}
          gridYValues={6} // Number of grid lines
          enableSlices="x"
          colors={"#5145cd"} // Line color: indigo
          enablePoints={true}
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
                { offset: 100, color: "white" },
              ],
            },
          ]}
          fill={[
            // Apply gradient to all lines
            { match: "*", id: "gradient" },
          ]}
        />
      </div>
    </>
  );
};
