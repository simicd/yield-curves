import React, { FC } from "react";
import { LineChart } from "../Charts/LineChart";
import { Serie } from "@nivo/line";

interface YieldCurveWidgetProps {
  data: Serie[];
}

export const YieldCurveWidget: FC<YieldCurveWidgetProps> = ({ data }) => {
  return (
    <>
      <div style={{ width: 800, height: 600 }} className="mx-auto mt-8">
        <h3 className="mx-6 text-lg font-semibold tracking-wider text-indigo-600 uppercase">
          Yield curves <span className="text-xs text-gray-400">June 30th, 2020</span>
        </h3>
        <LineChart data={data}></LineChart>
      </div>
    </>
  );
};
