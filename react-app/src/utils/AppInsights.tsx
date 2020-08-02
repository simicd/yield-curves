import React, { FC } from "react";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin, withAITracking } from "@microsoft/applicationinsights-react-js";
import { useHistory } from "react-router-dom";

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

  const reactPlugin = new ReactPlugin();
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
