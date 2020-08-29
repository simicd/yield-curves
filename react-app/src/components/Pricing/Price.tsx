import React, { FC } from "react";

export const Price: FC<{ price: string | number }> = ({ price }) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <span className="flex items-start px-3 text-6xl leading-none tracking-tight text-gray-900">
        {typeof price === "number" ? (
          <>
            <span className="mt-2 mr-2 text-4xl font-medium">$</span>
            <span className="font-extrabold">{price}</span>
          </>
        ) : (
          <span className="text-5xl font-extrabold">{price}</span>
        )}
      </span>
      {typeof price === "number" ? <span className="text-xl font-medium leading-7 text-gray-500">/month</span> : <></>}
    </div>
  );
};
