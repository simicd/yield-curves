import React, { FC, useEffect, useState, useRef } from "react";
import { ApplicationInsights, SeverityLevel, IExceptionTelemetry } from "@microsoft/applicationinsights-web";
import {
  ReactPlugin,
  AppInsightsContext,
  useAppInsightsContext,
  useTrackEvent as useTrackEventAI,
  useTrackMetric as useTrackMetricAI,
} from "@microsoft/applicationinsights-react-js";
import { useHistory } from "react-router-dom";

export const reactPlugin = new ReactPlugin();

/**
 * App insights collects logs to Azure Function
 * @see React npm documentation https://www.npmjs.com/package/&#64;microsoft/applicationinsights-react-js
 * @see JS package https://github.com/microsoft/ApplicationInsights-JS
 * @see Blog post https://www.aaron-powell.com/posts/2019-10-04-implementing-monitoring-in-react-using-appinsights/
 */
const AppInsights: FC = () => {
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
const AppInsightsContextProvider: FC = ({ children }) => {
  return <AppInsightsContext.Provider value={reactPlugin}>{children}</AppInsightsContext.Provider>;
};


/**
 * Application Insights exception hook for logging caught exceptions including metadata
 *
 * Note: Uncaught exceptions are automatically logged by the package
 * The hook returns a state setter which will trigger a logging event.
 * This hook sets the severityLevel to Error.
 * @example // Instantiate hook
 *          const logException = useTrackException()
 *          // Use hook
 *          logException({ "exception": new ReferenceError("API not found"), properties: { "target": "https://api.data.com/get" })
 * @param skipFirstRun Optional - skip first log event (hook instantiation)
 * @see https://dev.to/aaronpowell/combining-react-hooks-with-appinsights-5692
 */
const useTrackException = (
  skipFirstRun = true
) => {
  // Define state - the setData will be exposed and trigger a submission to App Insights when used
  const [data, setData] = useState<IExceptionTelemetry>();
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
    // Else submit the event to App Insights - ensure level is always set to Error
    // Submit only if there is some data
    data && reactPlugin.trackException({...data, ...{ severityLevel: SeverityLevel.Error }});
  }, [reactPlugin, data]);

  // Return state setter - when using the setter the entire custom hook will run again
  return setData;
};

/**
 * Application Insights metric hook for logging events including metadata
 *
 * Note: This is a wrapper around the useTrackMetric hook provided by the package which makes the reactPlugin
 *       paramater redundant due to the use of the provided context hook.
 * The hook returns a state setter which will trigger a logging event
 * @example // Instantiate hook
 *          const trackMetric = useTrackMetric("HomeComponent");
 *          // Use hook
 *          trackMetric();
 * @param componentName Display name in Application Insights
 * @see https://dev.to/aaronpowell/combining-react-hooks-with-appinsights-5692
 */
const useTrackMetric = (
  componentName: string,
) => {
  // Get the ReactPlugin via context hook
  const reactPlugin = useAppInsightsContext();

  // Use the hook prvoided by the package, making the reactPlugin
  const setData = useTrackMetricAI(reactPlugin, componentName)

  // Return state setter - when using the setter the hook will run and log the event
  return setData;
};

/**
 * Application Insights event hook for logging events including metadata
 *
 * Note: This is a wrapper around the useTrackEvent hook provided by the package which makes the reactPlugin
 *       paramater redundant due to the use of the provided context hook.
 * The hook returns a state setter which will trigger a logging event
 * @example // Instantiate hook
 *          const downloadEvent = useTrackEvent("Download data", {})
 *          // Use hook
 *          downloadEvent({ "target": "https://api.data.com/get" })
 * @param eventName Display name in Application Insights
 * @param eventData Optional data object with additional information
 * @see https://dev.to/aaronpowell/combining-react-hooks-with-appinsights-5692
 */
const useTrackEvent = <T extends {}>(
  eventName: string,
  eventData: T,
  skipFirstRun = true
) => {
  // Get the ReactPlugin via context hook
  const reactPlugin = useAppInsightsContext();

  // Use the hook prvoided by the package, making the reactPlugin
  const setData = useTrackEventAI(reactPlugin, eventName, eventData, skipFirstRun)

  // Return state setter - when using the setter the hook will run and log the event
  return setData;
};

export { AppInsights, AppInsightsContextProvider, useTrackEvent, useTrackMetric, useTrackException }