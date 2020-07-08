import React, { FC, useState } from "react";
import { Alert } from "../Alert/Alert";

export const Subscription: FC = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(false);

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <div className="px-6 py-6 bg-indigo-900 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-bold leading-8 tracking-tight text-white sm:text-3xl sm:leading-9">
              Want to be notified when we go live?
            </h2>
            <p className="max-w-3xl mt-3 text-lg leading-6 text-indigo-200" id="newsletter-headline">
              Sign up to stay up to date.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form className="sm:flex" aria-labelledby="newsletter-headline">
              <input
                aria-label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 text-base leading-6 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md appearance-none focus:outline-none focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  className="flex items-center justify-center w-full px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-900 border border-transparent border-white rounded-md hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400"
                  onClick={() => setNotification(true)}>
                  Notify me
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {notification && (
        <Alert onClick={() => setNotification(false)}>
          This is a demo - the e-mail address you entered is <b className="font-bold text-indigo-700">{email}</b>
        </Alert>
      )}
    </div>
  );
};
