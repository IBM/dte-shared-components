import React, { useState } from "react";
import Router from "next/router";

import { Button, SkeletonText } from "carbon-components-react";
import { Login32 } from "@carbon/icons-react";

import { ButtonLoading, InlineLoading } from "components";
import { trackNav } from "lib/analytics";

const ROOT = "";

const Login = ({ label, user, type, ...rest }) => {
  const { asPath } = Router;
  const [loading, setLoading] = useState(false);

  const clickHandler = () => {
    setLoading(true);
    trackNav({
      type: "Button",
      milestone: "Login",
      name: "Login",
    });
    Router.push(`${ROOT}/login?originalUrl=${asPath}`);
  };

  // normalize the type
  type = (type && type.toString().toLowerCase()) || "button";

  // if validating go and
  if (user && user.isValidating) return <SkeletonText lineCount={1} width="50%" />;

  // determin the type of login action
  let login =
    type === "button" ? (
      <Button {...rest} onClick={clickHandler} data-href={`${ROOT}/login?originalUrl=${asPath}`}>
        {label}
      </Button>
    ) : (
      <a href="#" onClick={clickHandler} data-href={`${ROOT}/login?originalUrl=${asPath}`}>
        {label}
      </a>
    );

  return loading ? type === "button" ? <ButtonLoading {...rest} /> : <InlineLoading /> : login;
};

Login.defaultProps = {
  type: "button",
  label: "Login",
  kind: "primary",
  renderIcon: Login32,
};

export const LoginButton = (props) => {
  return <Login {...props} type="button" />;
};

export const LoginLink = (props) => {
  return <Login {...props} type="link" />;
};

export default Login;
