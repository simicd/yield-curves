import React, { FC, useState } from "react";
import { Serie, ResponsiveLine } from "@nivo/line";
import clsx from "clsx";

const theme = {
  axis: {
    domain: {
      line: {
        stroke: 'transparent',
        strokeWidth: 1
      }
    },
    ticks: {
      line: {
        stroke: 'transparent',
        strokeWidth: 1
      },
      text: {
        fill: "lightgray"
      }
    },
    legend: {
      text: {
        fontSize: 12,
        fill: "lightgray"
      }
    }
  },
};

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
      <div style={{ height: 450 }} className="w-4/5 mx-auto mt-24">
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
          colors={"#8da2fb"} // Line color: indigo
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
      <div className="flex justify-center ml-6">
          {data.map((d) => (
            <button
              className={clsx("p-2 mx-1 my-2 text-white rounded-md hover:bg-indigo-400 focus:outline-none shadow-inner", {
                "bg-indigo-500": country === d.id,
                "bg-gray-700": country !== d.id,
              })}
              onClick={() => setCountry(d.id)}>
              {d.id}
            </button>
          ))}
        </div>
    </>
  );
};
