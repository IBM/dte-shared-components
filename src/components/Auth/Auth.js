import React from "react";
import { useRouter } from "next/router";
import { Loading } from "components";

import { hasAuthority, hasVisibility } from "lib/auth";
import redirect from "lib/redirect";
import useUser from "lib/user";
import { isEmpty } from "lib/utils";

const LOGIN_URL = "/login"; // default login path

// HOC to wrap component with auth
export const Auth = (opts = {}) => (Component) => (props) => {
  const { acl, visibility = ["ibmer", "partner"], ...options } = opts; // deconstruct the opts
  const { asPath = "/" } = useRouter(); // get the current path from the router
  const { user = {}, userIsValidating = false } = useUser({ ...options }); // grab the user
  // if (user) user.isValidating = userIsValidating; // attach userIsValidating to user
  // if we dont have a user then return loading
  // if (!user || isEmpty(user) || (user && user.isValidating)) {
  if (!user || isEmpty(user)) {
    user.isValidating = userIsValidating; // set the state of validating
    return <Loading description="Loading..." style={{ margin: "25vh auto 0" }} />;
  } else {
    user.isValidating = userIsValidating; // set the state of validating
    if (user && user.isLoggedIn === false) {
      // not logged in ... get the current path and redirect
      redirect(`${LOGIN_URL}?originalUrl=${asPath}`); // send to login
      return null; // send null
    }
  }
  // if user and has a persona check if they have the proper visibility
  if (user && user.persona && visibility && !hasVisibility(visibility, user.persona)) {
    redirect("/403"); // redirect 403
    return null; // send null
  }
  // if  user and roles  check if they have the proper authority
  if (user && user.roles && acl && !hasAuthority(acl, user.roles)) {
    redirect("/403"); // redirect 403
    return null; // send null
  }
  // return the component hydrated with the user
  return <Component {...props} user={user} />;
};

// HOC to inject user information into components
export const withUser = (Component) => (props) => {
  const { user = {}, userIsValidating = false } = useUser(); // get the user
  user.isValidating = userIsValidating; // attach userIsValidating to user
  return <Component {...props} user={user} />; // return the component hydrated with the user
};
