import React from "react";
import PropTypes from "prop-types";

const InvalidText = ({ id, name, invalid, children, ...rest }) => {
  // if (!children) return null;
  if (!invalid || !children) return null;
  return (
    <div id={`${name || id || "error"}-error-msg`} {...rest}>
      {children}
    </div>
  );
};

InvalidText.defaultProps = {
  className: "bx--form-requirement",
};

InvalidText.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  invalid: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default InvalidText;
