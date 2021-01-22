import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { shuffle } from "lodash";

import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { Loading } from "../Loading/Loading";
import Aux from "../../hoc/Aux";

const LOADING_TIMEOUT = 750;
const ALERT_TIMEOUT = 90000;
const MESSAGES_TIMEOUT = 1500;

const MESSAGES_CORE = [
  "Loading...",
  "Loading...",
  "Getting data...",
  "Building page...",
  "Caching results...",
  "Please standby...",
  "Please standby...",
];
const MESSAGES_FUNNY = [
  "Adjusting flux capacitor...",
  "Dividing by zero...",
  "Ordering 1s and 0s...",
  "Keeping all the 1's and removing all the 0's...",
  "Putting the icing on the cake...",
  "Swapping time and space...",
  "Entangling superstrings...",
  "Spinning violently around the y-axis...",
  "Bending the spoon...",
  "Load it and they will come...",
  "Filtering morale...",
  "Initializing the initializer...",
  "Installing dependencies...",
  "Optimizing the optimizer...",
  "Reticulating splines...",
  "Checking the specs on the end line, for the rotary girder...",
  "Computing chance of success...",
  "Granting wishes...",
  "Spinning the hamster...",
  "Kindly hold on as we convert this bug to a feature...",
  "You are number 2147483647 in the queue...",
  "Still faster than a system update...",
  "Feel free to spin in your chair...",
  "Are we there yet???",
  "Just count to 10...",
  "Convincing AI not to turn evil...",
  "Should have used a compiled language...",
];
const MESSAGES_LAST = [
  "I swear it's almost done...",
  "Maybe you should reload the page...",
];
const MESSAGES = MESSAGES_CORE.concat(shuffle(MESSAGES_FUNNY), MESSAGES_LAST);

const Loader = ({
  children,
  initial = false,
  messages = MESSAGES,
  router,
  history = [],
  ...rest
}) => {
  const [alert, setAlert] = useState();
  const [count, setCount] = useState(-1);
  const [loading, setLoading] = useState(initial);

  const totalMessages = (messages && messages.length) || 0;

  let loadingTimeout, alertTimeout, messageTimeout;

  // get the current page from the router
  const currentPage = () => {
    return router && router.asPath;
  };

  const updateMessage = useCallback((idx) => {
    messageTimeout = setTimeout(() => {
      if (idx < totalMessages) {
        // console.log("setCount", idx);
        setCount(idx);
        updateMessage(idx + 1);
      }
    }, MESSAGES_TIMEOUT);
  });

  const setAlertTimeout = useCallback((url) => {
    alertTimeout = setTimeout(() => {
      setLoading(false); // set loading to false
      setCount(-1); // set the count back to -1
      setAlert(
        `This page ${url} is taking a while to load.  Please standby or try again later.`
      );
      clearTimeout(loadingTimeout); // clear the timeout
      clearTimeout(alertTimeout);
      clearTimeout(messageTimeout);
    }, ALERT_TIMEOUT);
  });

  const isLoading = useCallback((url) => {
    // setup a timeout for the loader
    loadingTimeout = setTimeout(() => {
      setLoading(url); // we are loading url
      setAlert(false); // disable any alerts
      setCount(0); // set the count to 0
      setAlertTimeout(url); // setup a timeout to display an alert about it taking too long
      updateMessage(count + 1); // set the message to the current count pointer plus one
    }, LOADING_TIMEOUT); // delay loader
  });

  const isNotLoading = useCallback(() => {
    clearTimeout(loadingTimeout); // clear the timeout
    clearTimeout(alertTimeout);
    clearTimeout(messageTimeout);
    setLoading(false); // set loading to false
    setAlert(false); // clear the alert timeout
    setCount(-1); // set the count back to -1
  });

  useEffect(() => {
    // handle the start
    const handleRouteChangeStart = (url) => {
      const curr = currentPage(); // current page asPath
      if ((!history || history.length === 0 || url !== curr) && url)
        history.push(url); // empty or not equal push on current
      // if url === curr then we are not loading
      if (url === curr) isNotLoading();
      else isLoading(url); // loading
    };
    // handle the stop
    const handleRouteChangeComplete = (url) => {
      // console.log("routeChangeComplete", url, new Date());
      isNotLoading(url); // not loading
      setCount(-1);
    };
    // handle the errors
    const handleRouteChangeError = (err, url) => {
      // console.log("routeChangeError", url, err.cancelled, err.message || err, new Date());
      if (err && !err.cancelled) {
        setAlert(
          `An error occurred while loading ${url}.  Error: ${
            err.message || err
          }`
        );
      }
      isNotLoading(url); // not loading
      setCount(-1);
    };
    // bind on mount
    if (router && router.events) {
      router.events.on("routeChangeStart", handleRouteChangeStart);
      router.events.on("routeChangeComplete", handleRouteChangeComplete);
      router.events.on("routeChangeError", handleRouteChangeError);
    }
    // unbind on unmount
    return () => {
      if (router && router.events) {
        router.events.off("routeChangeStart", handleRouteChangeStart);
        router.events.off("routeChangeComplete", handleRouteChangeComplete);
        router.events.off("routeChangeError", handleRouteChangeError);
      }
    };
  }, []);

  // if we have messages and a count then lets display them
  if (loading && messages && count > -1 && messages[count]) {
    let { style, ...subrest } = rest;
    return (
      <div style={style}>
        <Loading {...subrest} />
        <h4 style={{ margin: "0 auto", padding: "0", textAlign: "center" }}>
          {messages[count]}
        </h4>
      </div>
    );
  } else if (loading) {
    // simple loading spinner
    return <Loading {...rest} />;
  }

  // uh oh ... alert?
  return (
    <Aux>
      {alert ? (
        <ConfirmModal
          alert={true}
          size="sm"
          namespace="alert"
          message={alert}
          modalLabel=""
          modalHeading="Alert"
          primaryButtonText="Ok"
          secondaryButtonText="Close"
          onSubmit={() => {
            setAlert(false);
          }}
          onClose={() => {
            setAlert(false);
          }}
        />
      ) : null}
      {children}
    </Aux>
  );
};

Loader.defaultProps = {
  initial: false,
  children: null,
  description: "Loading...",
  style: { margin: "25vh auto 0" },
};

Loader.propTypes = {
  initial: PropTypes.bool,
  children: PropTypes.any,
  router: PropTypes.any,
  history: PropTypes.any,
  messages: PropTypes.string,
  description: PropTypes.string,
  style: PropTypes.object,
};

export default Loader;
