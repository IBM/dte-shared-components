import React from "react";
import PropTypes from "prop-types";

import { Markdown } from "../../index";

const HelperText = ({ withHtml, ...rest }) => {
  return withHtml ? (
    <Markdown {...rest} escapeHtml={false} />
  ) : (
    <Markdown {...rest} />
  );
};

HelperText.defaultProps = {
  source: "",
  className: "",
  disallowedTypes: ["paragraph"],
  unwrapDisallowed: true,
  linkTarget: "_blank",
  withHtml: false,
};

HelperText.propTypes = {
  // ...Markdown.propTypes,
  withHtml: PropTypes.bool,
};

export default HelperText;
