import React, { useEffect } from "react";
import { useTrackException } from "./AppInsights";

/**
 * Hook for fetching API data
 *
 * The hook calls the fetch() function, catches potential errors and logs results on Azure App Insights.
 * Note that this is a generic function and will return unknown if no datatype is specified
 * @example type DogImage = { message: string, status: string };
 *          const dogImage = useFetch<DogImage>("https://dog.ceo/api/breeds/image/random");
 * @param url String or Request object passed to fetch() function
 * @param init Optional additional fetch parameter such as header, authentication, etc.
 */
export const useFetch = <T>(url: RequestInfo, init?: RequestInit) => {
  const [responseData, setResponseData] = React.useState<T>();
  const trackError = useTrackException();

  useEffect(() => {
    // Define asynchronous function - since useEffect hook can't handle async directly,
    // a nested function needs to be defined first and then called thereafter
    const fetchData = async () => {
      try {
        // Fetch data from REST API
        const response = await fetch(url, init);

        // Check response code - 2xx indicate success
        if (response.status >= 200 && response.status < 300) {
          // Extract json
          const data: T = await response.json();
          setResponseData(data);
        } else {
          trackError({
            exception: new ReferenceError("Couldn't reach server"),
            properties: { statusCode: response.status, status: response.statusText },
          });
        }
      } catch (error) {
        trackError({ exception: new TypeError(error) });
      }
    };
    // Call async function
    fetchData();
  }, [trackError]);

  return responseData;
};
