import React from "react";

import { Button } from "../Button/Button";

const IconButton = (props) => {
  return <Button {...props} />;
};

IconButton.defaultProps = {
  size: "default",
  hasIconOnly: true,
  iconDescription: "",
  tooltipPosition: "top",
  tooltipAlignment: "center",
  kind: "primary",
  className: "icon-only",
};

IconButton.propTypes = {
  ...Button.propTypes,
};

export default IconButton;
