import React, { FC, useState } from "react";
import { LineChart } from "../Charts/LineChart";
import { Serie } from "@nivo/line";
import clsx from "clsx";

interface YieldCurveWidgetProps {
  data: Serie[];
}

export const YieldCurveWidget: FC<YieldCurveWidgetProps> = ({ data }) => {
  const [country, setCountry] = useState(data[0].id);

  return (
    <>
      <div style={{ width: 800, height: 600 }} className="mx-auto mt-8">
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
        <LineChart data={data.filter((d) => d.id === country)}></LineChart>
      </div>
    </>
  );
};
