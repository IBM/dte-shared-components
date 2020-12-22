import React from "react";
import { Loading as CarbonLoading } from "carbon-components-react";

const Loading = (props) => {
  return <CarbonLoading {...props} />;
};

Loading.defaultProps = {
  withOverlay: false,
  style: {
    margin: "2rem auto",
  },
};

Loading.propTypes = {
  ...CarbonLoading.propTypes,
};

export default Loading;
