import React, { FC } from "react";
import clsx from "clsx";
import { Transition } from "../Utils";

export interface NotificationProps {
  /** Notification status */
  status: "info" | "success" | "warn" | "error" | undefined;
  /** Click callback (implementing React's mouse event handler) */
  onClick?: React.MouseEventHandler;
}

/**
 * Notification component displayed in top right corner (info, success, warning or error).
 * @param NotificationProps Props with notification status and onClick callback
 */
export const Notification: FC<NotificationProps> = ({ children, status, onClick }) => {
  return (
    <>
      <div className="fixed inset-0 z-10 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
        <Transition
          show={!!status}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div
            className={clsx("w-full max-w-sm rounded-lg shadow-xl pointer-events-auto", {
              "bg-blue-50": status === "info",
              "bg-green-100": status === "success",
              "bg-red-100": status === "error",
              "bg-yellow-50": status === "warn",
            })}>
            <div className="overflow-hidden rounded-lg shadow-xs">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className={clsx("w-6 h-6", {
                        "text-blue-400": status === "info",
                        "text-green-400": status === "success",
                        "text-red-400": status === "error",
                        "text-yellow-400": status === "warn",
                      })}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2">
                      {status === "info" && <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      {status === "success" && <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      {status === "error" && (
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      )}
                      {status === "warn" && <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>}
                    </svg>
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">{children}</div>
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      className="inline-flex text-gray-400 transition duration-150 ease-in-out focus:outline-none focus:text-gray-500"
                      onClick={onClick}>
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};
