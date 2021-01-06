import React from "react";
import IframeResizer from "iframe-resizer-react";

const FullheightIframe = ({ src, ...rest }) => {
  if (!src) return null;
  return <IframeResizer src={src} {...rest} />;
};

FullheightIframe.defaultProps = {
  src: "",
  heightCalculationMethod: "max",
  inPageLinks: true,
  checkOrigin: true,
  log: false,
  autoResize: true,
  scrolling: "auto",
  frameBorder: 0,
  minHeight: 500,
  style: {
    minWidth: "100%",
    minHeight: "15rem",
  },
};

FullheightIframe.propTypes = {
  ...IframeResizer.propTypes,
};

export default FullheightIframe;
