import React, { useEffect, useCallback, useRef } from "react";
import { useTrackException } from "./AppInsights";

/**
 * Define return types as tagged unions where all states are a separate interface. This TypeScript feature allows
 * later on to distinguish by a common property (here: status) - if status === "success" then it'll be clear to VS Code
 * that object has a data type and if status === "error" then it has message, exception and properties but no data field.
 * @see Vanderkam, Dan (2019). Effective Typescript (p. 119 - Chapter 4: Type Design)
 */
interface RequestSuccess<T> {
  status: "success";
  data: T;
}

interface RequestPending {
  status: "pending";
}

interface RequestError {
  status: "error";
  message: string;
  exception: Error;
  properties?: any;
}

/** Hook return type - tagged union can be distinguished by checking status field */
type RequestState<T> = RequestPending | RequestSuccess<T> | RequestError;

interface FetchProps {
  url?: RequestInfo;
  init?: RequestInit;
}

interface ProcessingProps<T> {
  processData?: (responseJson: any) => T;
  skipFirstRun?: boolean;
}

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
export const useFetch = <T>({ url, init, processData, skipFirstRun = false }: FetchProps & ProcessingProps<T>) => {
  const [responseData, setResponseData] = React.useState<RequestState<T>>({ status: "pending" });
  const trackError = useTrackException();

  // If no processing function is passed just cast the object to type T
  const processJson = processData || ((responseJson: any) => responseJson as T);
  // Function must be memoized with useCallback as otherwise fetch will run repeatedly
  // This step ensures that the function is only created once and not on every re-render
  const memoizedProcessJson = useCallback(processJson, []);
  // Turn objects into strings for useCallback & useEffect dependencies - both variables
  // can be objects which creates an infinite loop since an object seems to always be recognized as "new"
  // hence causing a re-run
  const [stringifiedUrl, stringifiedInit] = [JSON.stringify(url), JSON.stringify(init)];

  // Define asynchronous function - since useEffect hook can't handle async directly,
  // a nested function needs to be defined first and then called thereafter
  const fetchData = useCallback(
    async (props?: Partial<FetchProps>) => {
      let responseObj: RequestState<T>;
      try {
        // Fetch data from REST API
        const response = await fetch(props?.url || url || "", props?.init || init);

        // Check response code - 2xx indicate success
        if (response.status >= 200 && response.status < 300) {
          // Extract json and process data
          const data = await response.json();
          responseObj = { status: "success", data: memoizedProcessJson(data) };
          setResponseData(responseObj);
        } else {
          const result = {
            exception: new ReferenceError("Couldn't reach server"),
            properties: { statusCode: response.status, status: response.statusText },
          };
          responseObj = { status: "error", message: "Couldn't reach server", ...result };

          // Log to Azure App Insights
          trackError(result);
          setResponseData(responseObj);
        }
        return responseObj;
      } catch (error) {
        responseObj = { status: "error", message: "Operation failed", exception: new TypeError(error) };
        trackError({ exception: new TypeError(error) });
        setResponseData(responseObj);
        return responseObj;
      }
    },
    // Disable warning (url and init missing) - they are checked as string to avoid infinite loop
    // since objects are recognized as "new" on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trackError, stringifiedUrl, stringifiedInit, memoizedProcessJson]
  );

  const firstRun = useRef(skipFirstRun);

  useEffect(() => {
    // Check if this is the first run, if yes set to false and end the function
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    // Call async function
    fetchData({ url: url, init: init });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, stringifiedUrl, stringifiedInit]);

  return [responseData, fetchData] as const;
};
