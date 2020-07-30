import React, { FC } from "react";

interface HeaderSectionProps {
  /** Component children slots
   * @see: https://medium.com/&#64;martin_hotell/react-children-composition-patterns-with-typescript-56dfc8923c64
   */
  children: {
    /** Title/content */
    content: React.ReactNode;
    /** Image section */
    image: React.ReactNode;
  }
}

export const HeaderSection: FC<HeaderSectionProps> = ({ children }) => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto ">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none">
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="pt-6">
              <div className="max-w-screen-xl px-4 mx-auto mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  {children.content}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 bg-gray-800 md:py-12 lg:pl-32 lg:absolute lg:inset-y-0 lg:left-1/2 lg:w-1/2 lg:max-w-4xl">
          {children.image}
        </div>
      </div>
    </>
  );
};
