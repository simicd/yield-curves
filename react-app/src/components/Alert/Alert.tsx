import React, { FC } from "react";

interface AlertProps {
  /** Click callback (implementing React's mouse event handler) */
  onClick?: React.MouseEventHandler;
}

export const Alert: FC<AlertProps> = ({ children, onClick }) => {
  return (
    <div className="absolute z-10 p-4 border-l-4 border-indigo-400 shadow-lg top-10 right-10 bg-indigo-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">{children}</div>
        <div className="pl-3 ml-auto">
          <div className="-mx-1.5 -my-1.5">
            <button
              className="inline-flex rounded-md p-1.5 text-indigo-500 hover:bg-indigo-100 focus:outline-none focus:bg-indigo-100 transition ease-in-out duration-150"
              onClick={onClick}>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
