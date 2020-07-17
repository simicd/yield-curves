import React, { FC } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";

interface LineChartProps {
  data: Serie[];
}

export const LineChart: FC<LineChartProps> = ({ data }) => {
  return (
    <>
      <ResponsiveLine
        data={data}
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
          tickValues: 6,
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
    </>
  );
};
