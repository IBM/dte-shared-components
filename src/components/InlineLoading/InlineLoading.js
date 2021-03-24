import React from "react";
import { InlineLoading as CarbonInlineLoading } from "carbon-components-react";

const InlineLoading = (props) => {
  return <CarbonInlineLoading {...props} />;
};

InlineLoading.defaultProps = {
  description: "",
  iconDescription: "Loading",
  status: "active",
};

InlineLoading.propTypes = {
  ...CarbonInlineLoading.propTypes,
};

export default InlineLoading;
