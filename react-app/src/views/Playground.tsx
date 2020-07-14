import React, { FC } from "react";
import { YieldCurveWidget } from "../components/Widgets/YieldCurveWidget";
import { HeatMapChart } from "../components/Charts/HeatMapChart";
import { lineData, heatMapData } from '../assets/sampleData'

export const Playground: FC = () => {
  return (
    <>
      <YieldCurveWidget data={lineData} />

      <div style={{ width: 800, height: 600 }} className="mx-auto">
        <HeatMapChart data={heatMapData} />
      </div>
    </>
  );
};
