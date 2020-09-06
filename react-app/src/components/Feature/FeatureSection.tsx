import React, { FC } from "react";

interface FeatureSectionProps {
  sectionHeader: string;
  title: string;
  // description: string;
}

/**
 * Feature section
 */
export const FeatureSection: FC<FeatureSectionProps> = ({sectionHeader, title, children}) => {
  return (
    <div className="py-32 bg-white">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base font-semibold leading-6 tracking-wide text-transparent uppercase bg-clip-text bg-gradient-to-r from-teal-500 to-blue-800">
            {sectionHeader}
          </p>
          <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            {title}
          </h3>
        </div>
        {children}
      </div>
    </div>
  );
};
