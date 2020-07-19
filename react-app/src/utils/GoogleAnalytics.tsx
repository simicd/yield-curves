import React, { Component } from "react";
import ReactGA from "react-ga";
import { Route } from "react-router-dom";

interface GoogleAnalyticsProps {
  location: { pathname: string; search: string };
  options?: object;
}

class GoogleAnalytics extends Component<GoogleAnalyticsProps, {}> {
  componentDidMount() {
    this.logPageChange(this.props.location.pathname, this.props.location.search);
  }

  componentDidUpdate(prevProps: GoogleAnalyticsProps) {
    const {
      location: { pathname, search },
    } = this.props;
    const isDifferentPathname = pathname !== prevProps.location.pathname;
    const isDifferentSearch = search !== prevProps.location.search;

    if (isDifferentPathname || isDifferentSearch) {
      this.logPageChange(pathname, search);
    }
  }

  logPageChange(pathname: string, search = "") {
    const page = pathname + search;
    const { location } = window;
    ReactGA.set({
      page,
      location: `${location.origin}${page}`,
      ...this.props.options,
    });
    ReactGA.pageview(page);
  }

  render() {
    return null;
  }
}

const RouteTracker = () => <Route component={GoogleAnalytics} />;

const init = (options = {}) => {
  const env = process.env || {};
  const isGAEnabled = !!"UA-172782347-1";

  if (isGAEnabled) {
    ReactGA.initialize("UA-172782347-1", {
      debug: env.REACT_APP_GA_DEBUG === "true",
      ...options,
    });
  }

  return isGAEnabled;
};

export default {
  GoogleAnalytics,
  RouteTracker,
  init,
};
