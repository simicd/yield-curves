/**
 * Declare extra environment variables
 * By default process.env only shows NODE_ENV and PUBLIC_URL - with this type definition, additional variables will pop up in IntelliSense
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_APPINSIGHTS_INSTRUMENTATION_KEY: string;
      REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID: string;
    }
  }
}

export {};
