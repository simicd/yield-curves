import React, { FC, useEffect, useState, useRef } from "react";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin, AppInsightsContext, useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { useHistory } from "react-router-dom";

export const reactPlugin = new ReactPlugin();

/**
 * App insights collects logs to Azure Function
 * @see React npm documentation https://www.npmjs.com/package/&#64;microsoft/applicationinsights-react-js
 * @see JS package https://github.com/microsoft/ApplicationInsights-JS
 * @see Blog post https://www.aaron-powell.com/posts/2019-10-04-implementing-monitoring-in-react-using-appinsights/
 */
export const AppInsights: FC = () => {
  // Note: the only reason why App Insights is defined as React component is because of the history parameter.
  // It is required to track on which URL the log occured. However, since useHistory() is a hook, it can only be
  // called from within a React component.

  const appInsights = new ApplicationInsights({
    config: {
      // For more configurations visit: https://github.com/microsoft/ApplicationInsights-JS#configuration
      instrumentationKey: "1ed20de5-33b5-4b2a-a90f-c48a8071c6a6",
      extensions: [reactPlugin],
      extensionConfig: {
        [reactPlugin.identifier]: { history: useHistory() },
      },
    },
  });
  appInsights.loadAppInsights();

  return <></>;
};

/**
 * Context provider for Application Insights
 * @param Props Children
 */
export const AppInsightsContextProvider: FC = ({ children }) => {
  return <AppInsightsContext.Provider value={reactPlugin}>{children}</AppInsightsContext.Provider>;
};

/**
 * Application Insights event hook to log an event including metadata
 *
 * The hook returns a state setter which will trigger a logging event
 * @example // Instantiate hook
 *          const setError = useAppInsightsEvent("Download error", {})
 *          // Use hook
 *          setError({ "target": "https://api.data.com/get" })
 * @param eventName Display name in Application Insights
 * @param eventData Optional data object with additional information
 * @see https://dev.to/aaronpowell/combining-react-hooks-with-appinsights-5692
 */
export const useAppInsightsEvent = (
  eventName: string,
  eventData: Record<string, string | number>,
  skipFirstRun = true
) => {
  // Define state - the setData will be exposed and trigger a submission to App Insights when used
  const [data, setData] = useState(eventData);
  // Get the ReactPlugin via context hook
  const reactPlugin = useAppInsightsContext();
  // Use ref to prevent logging on first run
  const firstRun = useRef(skipFirstRun);

  useEffect(() => {
    // Check if this is the first run, if yes set to false and end the function
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    // Else submit the event to App Insights
    reactPlugin.trackEvent({ name: eventName }, data);
  }, [reactPlugin, data, eventName]);

  // Return state setter - when using the setter the entire custom hook will run again
  return setData;
};
