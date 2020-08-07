import React, { FC, useState } from "react";
import { Notification, NotificationProps } from "../Notification";
import { useFetch } from "../../utils/useFetch";

/**
 * Subscription section with e-mail field
 */
export const SubscriptionSection: FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NotificationProps["status"]>();
  const { fetchApi } = useFetch<{ email: string }>({ skipFirstRun: true });

  /**
   * Register e-mail address
   * @param email User e-mail
   */
  const submitEmail = async (email: string) => {
    const response = await fetchApi({
      url: "https://api.yield-curves.com/register",
      init: {
        method: "POST",
        body: JSON.stringify({ email: email }),
      },
    });
    console.log(response);
    if (response.status === "success") {
      setStatus("success");
    } else if (response.status === "error") {
      if (response.properties?.statusCode === 500) {
        setStatus("warn");
      } else {
        setStatus("error");
      }
    }
    // const response = await fetch("https://api.yield-curves.com/register", {
    //   method: "POST",
    //   body: JSON.stringify({ email: email }),
    // });
    // if (response.status === 201) {
    //   // const message = await response.json();
    //   setStatus("success");
    // } else if (response.status === 500) {
    //   setStatus("warn");
    // } else {
    //   setStatus("error");
    // }
  };

  return (
    <div className="bg-white" id="subscription">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <div className="px-6 py-6 bg-teal-800 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-bold leading-8 tracking-tight text-white sm:text-3xl sm:leading-9">
              Want to be notified when we go live?
            </h2>
            <p className="max-w-3xl mt-3 text-lg leading-6 text-teal-50" id="newsletter-headline">
              Sign up to stay up to date.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form className="sm:flex" aria-labelledby="newsletter-headline" onSubmit={(e) => e.preventDefault()}>
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
                  className="flex items-center justify-center w-full px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-teal-800 border border-transparent border-white rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal-500"
                  onClick={() => submitEmail(email)}>
                  Notify me
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Notification status={status} onClick={() => setStatus(undefined)}>
        {status === "success" && (
          <>
            <p className="text-sm font-medium leading-5 text-gray-900">Successfully registered!</p>{" "}
            <p className="mt-1 text-sm leading-5 text-gray-500">
              We will notify you on <b className="font-bold">{email}</b> once we go live.
            </p>
          </>
        )}
        {status === "warn" && (
          <>
            <p className="text-sm font-medium leading-5 text-gray-900">E-mail already registered</p>{" "}
            <p className="mt-1 text-sm leading-5 text-gray-500">
              We will notify you on <b className="font-bold">{email}</b> once we go live.
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-sm font-medium leading-5 text-gray-900">Unexpected error</p>{" "}
            <p className="mt-1 text-sm leading-5 text-gray-500">
              We couldn't register your e-mail. Please try again later.
            </p>
          </>
        )}
      </Notification>
    </div>
  );
};
