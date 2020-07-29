import React, { FC } from "react";

/**
 * List of features displayed as two-column grid (medium screens or larger)
 * or single column (smaller screens)
 * @param props Component children
 */
export const FeatureList: FC = ({ children }) => {
  return (
    <div className="mt-10">
      <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">{children}</ul>
    </div>
  );
};
