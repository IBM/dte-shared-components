// DTE 2.0 Button
import React from "react";
// import { Button as CarbonButton } from "carbon-components-react";

const Button = ({ title }) => (
  //   return <CarbonButton {...props} />;
  <button className="testingBTN">{title}</button>
);

Button.defaultProps = {
  size: "default",
  tooltipPosition: "top",
  tooltipAlignment: "center",
  kind: "primary",
};

export default Button;
