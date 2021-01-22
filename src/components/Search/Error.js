import React from "react";
import { InlineNotification as CarbonInlineNotification } from "carbon-components-react";

const Error = ({ message, ...rest }) => {
  return <CarbonInlineNotification title={message} {...rest} />;
};

Error.defaultProps = {
  hideCloseButton: true,
  notificationType: "inline",
  iconDescription: "Error",
  kind: "error",
  role: "alert",
  message: "",
};

export default Error;
