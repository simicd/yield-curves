import React, { FC } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";

export const Charts: FC = () => {
  return (
    <div style={{width: 800, height: 600}} className="mx-auto">
      <ResponsiveHeatMap
        data={data}
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
  );
};

const data = [
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
