import React from "react";
import PropTypes from "prop-types";
import { FormLabel, Tooltip } from "carbon-components-react";

const Label = ({ children, className, tooltipText, ...rest }) => {
  return (
    <FormLabel className={className} {...rest}>
      {tooltipText ? (
        <Tooltip triggerText={children}>{tooltipText}</Tooltip>
      ) : (
        children
      )}
    </FormLabel>
  );
};

Label.defaultProps = {
  className: "label",
  tooltipText: "",
};

Label.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  tooltipText: PropTypes.string,
};

export default Label;
