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
 * @param processData Optional callback function to convert json response into target shape
 */
export const useFetch = <T>(url: RequestInfo, init?: RequestInit, processData?: (responseJson: any) => T) => {
  const [responseData, setResponseData] = React.useState<T>();
  const trackError = useTrackException();

  // If no processing function is passed just cast the object to type T
  const processJson = processData || ((responseJson: any) => responseJson as T);

  useEffect(() => {
    // Define asynchronous function - since useEffect hook can't handle async directly,
    // a nested function needs to be defined first and then called thereafter
    const fetchData = async () => {
      try {
        // Fetch data from REST API
        const response = await fetch(url, init);

        // Check response code - 2xx indicate success
        if (response.status >= 200 && response.status < 300) {
          // Extract json and process data
          const data = await response.json();
          const processedData = processJson(data)
          setResponseData(processedData);
        } else {
          // Log to Azure App Insights
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
