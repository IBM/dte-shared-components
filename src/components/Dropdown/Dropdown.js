import React from "react";
import PropTypes from "prop-types";
import { FormItem, FormLabel, Dropdown as CarbonDropdown } from "carbon-components-react";

const Dropdown = ({ label, labelText, titleText, helperText, ...rest }) => {
  return (
    <FormItem>
      {label || labelText ? <FormLabel>{label || labelText}</FormLabel> : null}
      <CarbonDropdown
        helperText={helperText}
        titleText={titleText || labelText || label}
        {...rest}
      />
    </FormItem>
  );
};

Dropdown.defaultProps = {
  id: "dropdown",
  helperText: "",
  labelText: "",
  titleText: "",
};

Dropdown.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  labelText: PropTypes.string,
  titleText: PropTypes.string,
};

export default Dropdown;
