import React, { FC } from "react";
import clsx from "clsx";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  theme?: "primary" | "light" | "transparent";
  onClick?: React.MouseEventHandler;
}

export const Button: FC<ButtonProps> = ({ size = "md", theme = "primary", onClick, children }) => {
  return (
    <>
      <button
        className={clsx(
          "flex items-center justify-center w-full transition duration-150 ease-in-out border border-transparent rounded-md focus:outline-none focus:shadow-outline-teal",
          {
            "px-4 py-2 text-sm leading-5": size === "sm",
            "px-6 py-3 text-base leading-6": size === "md",
            "px-10 py-4 text-lg font-medium leading-7": size === "lg",
            "text-white bg-teal-600 bg-gradient-to-tr from-teal-500 to-blue-800 hover:from-teal-400 hover:to-blue-700 focus:from-teal-400 focus:to-blue-700": theme === "primary",
            "text-teal-800 bg-cool-gray-100 hover:text-teal-500 hover:bg-cool-gray-100 focus:bg-cool-gray-100":
              theme === "light",
            "text-white bg-transparent hover:text-white hover:bg-teal-500 focus:bg-teal-500 border-white":
              theme === "transparent",
          }
        )}
        onClick={onClick}>
        {children}
      </button>
    </>
  );
};
