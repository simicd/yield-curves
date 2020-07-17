import React, { FC } from "react";
import { ResponsiveHeatMap, HeatMapDatum } from "@nivo/heatmap";

interface HeatMapChartProps {
  data: HeatMapDatum[];
}

export const HeatMapChart: FC<HeatMapChartProps> = ({ data }) => {
  return (
    <>
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
    </>
  );
};
