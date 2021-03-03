// DTE 2.0 Button
import React from "react";
import PropTypes from "prop-types";
import { Button as CarbonButton } from "carbon-components-react";

const Button = (props) => <CarbonButton {...props} />;

Button.defaultProps = {
  size: "default",
  tooltipPosition: "top",
  tooltipAlignment: "center",
  kind: "primary",
};

Button.propTypes = {
  ...CarbonButton.propTypes,
};

export default Button;
