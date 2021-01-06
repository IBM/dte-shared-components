import { useEffect, useContext } from "react";

import { Context } from "context/Store";

const Site = ({ user, breakpoint, router, history, children }) => {
  const [state, dispatch] = useContext(Context); // get a handle to context state

  // when changes occur set user in context mirrored as state.user
  useEffect(() => {
    dispatch({ type: "SET_USER", payload: user });
  }, [user]);

  // when changes occur set breakpoint in context mirrored as state.breakpoint
  useEffect(() => {
    dispatch({ type: "SET_BREAKPOINT", payload: breakpoint });
  }, [breakpoint]);

  // push router change events to history
  useEffect(() => {
    if (router && router.events) {
      router.events.on("routeChangeComplete", (url) => {
        let h = [...state.history]; // clone history
        let l = h.pop(); // get the last element
        // if we have a url and the histry is blank or the last element isnt this url
        // ... add to the history
        if (url && (!h || h.length === 0 || (l && l !== url)))
          dispatch({ type: "ADD_HISTORY", payload: url });
      });
    }
  }, []);

  // if history changes reflect the change in state.histoyr
  useEffect(() => {
    dispatch({ type: "SET_HISTORY", payload: history });
  }, [history]);

  // console.log("state", state);
  return children;
};

export default Site;
