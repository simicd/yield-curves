import React, { FC } from "react";

interface FeatureListItemProps {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** SVG icon */
  svgPath: React.ReactNode;
}

/**
 * List items with svg icon, a bold title plus light description - works well with FeatureList component
 * @param FeatureListItemProps Title, description and svgPath
 */
export const FeatureListItem: FC<FeatureListItemProps> = ({ title, description, svgPath }) => {
  return (
    <>
      <li className="mt-10 md:mt-0">
        <div className="flex lg:ml-1/4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 text-white bg-teal-600 rounded-md bg-gradient-to-tr from-teal-500 to-blue-800">
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {svgPath}
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium leading-6 text-gray-900">{title}</h4>
            <p className="mt-2 text-base leading-6 text-gray-500">{description}</p>
          </div>
        </div>
      </li>
    </>
  );
};
