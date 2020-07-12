import React, { FC } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ResponsiveLine } from "@nivo/line";

export const Charts: FC = () => {
  return (
    <>
      <div style={{ width: 800, height: 600 }} className="mx-auto">
        <ResponsiveHeatMap
          data={heatMapData}
          keys={["1y", "2y", "3y", "5y", "7y", "10y", "20y", "30y", "50y", "100y"]}
          indexBy="country"
          margin={{ top: 100, right: 60, bottom: 150, left: 60 }}
          forceSquare={true}
          axisTop={{ orient: "top", tickSize: 5, tickPadding: 5, tickRotation: -90, legend: "", legendOffset: 36 }}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Country",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          cellOpacity={1}
          cellBorderWidth={1}
          cellBorderColor="white"
          labelTextColor="white"
          animate={true}
          motionStiffness={80}
          motionDamping={9}
          hoverTarget="cell"
          cellHoverOthersOpacity={0.25}
        />
      </div>
      <div style={{ width: 800, height: 600 }} className="mx-auto">
        <h3 className="mx-6 text-lg font-semibold tracking-wider text-indigo-600 uppercase">Yield curves <span className="text-xs text-gray-400">June 30th, 2020</span></h3>
        <ResponsiveLine
          data={lineData}
          margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
          xScale={{ type: "linear" }}
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          yFormat=".1%"
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
            tickValues: 6
          }}
          enableGridX={false}
          gridYValues={6}
          enableSlices="x"
          colors={{ scheme: "red_blue" }}
          enablePoints={true}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          crosshairType="bottom"
          useMesh={true}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 76,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 88,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

const heatMapData = [
  {
    country: "CH",
    "1y": -0.737,
    "2y": -0.736,
    "3y": -0.724,
    "5y": -0.642,
    "7y": -0.513,
    "10y": -0.408,
    "20y": -0.427,
    "30y": 0.027,
    "50y": 0.982,
    "100y": 1.857,
  },
  {
    country: "CN",
    "1y": 1.792,
    "2y": 1.843,
    "3y": 1.914,
    "5y": 2.083,
    "7y": 2.264,
    "10y": 2.518,
    "20y": 3.133,
    "30y": 3.493,
    "50y": 3.864,
    "100y": 4.179,
  },
  {
    country: "GB",
    "1y": 0.097,
    "2y": 0.047,
    "3y": 0.048,
    "5y": 0.1,
    "7y": 0.153,
    "10y": 0.23,
    "20y": 0.314,
    "30y": 0.295,
    "50y": 0.217,
    "100y": 1.801,
  },
  {
    country: "JP",
    "1y": -0.116,
    "2y": -0.122,
    "3y": -0.127,
    "5y": -0.119,
    "7y": -0.093,
    "10y": -0.03,
    "20y": 0.168,
    "30y": 0.255,
    "50y": 1.263,
    "100y": 2.365,
  },
  {
    country: "US",
    "1y": 0.062,
    "2y": 0.024,
    "3y": 0.032,
    "5y": 0.126,
    "7y": 0.262,
    "10y": 0.443,
    "20y": 0.697,
    "30y": 0.732,
    "50y": 0.616,
    "100y": 2.043,
  },
];

const lineData = [
  {
    id: "CH",
    data: [
      { x: 1, y: -0.00737 },
      { x: 2, y: -0.00736 },
      { x: 3, y: -0.00724 },
      { x: 5, y: -0.00642 },
      { x: 7, y: -0.00513 },
      { x: 10, y: -0.00408 },
      { x: 20, y: -0.00427 },
      { x: 30, y: 0.00027 },
      { x: 50, y: 0.00982 },
      { x: 100, y: 0.01857 },
    ],
  },

  {
    id: "GB",
    data: [
      { x: 1, y: 0.00097 },
      { x: 2, y: 0.00047 },
      { x: 3, y: 0.00048 },
      { x: 5, y: 0.001 },
      { x: 7, y: 0.00153 },
      { x: 10, y: 0.0023 },
      { x: 20, y: 0.00314 },
      { x: 30, y: 0.00295 },
      { x: 50, y: 0.00217 },
      { x: 100, y: 0.01801 },
    ],
  },
  {
    id: "JP",
    data: [
      { x: 1, y: -0.00116 },
      { x: 2, y: -0.00122 },
      { x: 3, y: -0.00127 },
      { x: 5, y: -0.00119 },
      { x: 7, y: -0.00093 },
      { x: 10, y: -0.0003 },
      { x: 20, y: 0.00168 },
      { x: 30, y: 0.00255 },
      { x: 50, y: 0.01263 },
      { x: 100, y: 0.02365 },
    ],
  },
  {
    id: "US",
    data: [
      { x: 1, y: 0.00062 },
      { x: 2, y: 0.00024 },
      { x: 3, y: 0.00032 },
      { x: 5, y: 0.00126 },
      { x: 7, y: 0.00262 },
      { x: 10, y: 0.00443 },
      { x: 20, y: 0.00697 },
      { x: 30, y: 0.00732 },
      { x: 50, y: 0.00616 },
      { x: 100, y: 0.02043 },
    ],
  },
];
