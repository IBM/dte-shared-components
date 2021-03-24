import React from "react";
import PropTypes from "prop-types";
import { FormItem, FormLabel } from "carbon-components-react";

import { HelperText } from "../../index";
import { toLocaleDateString } from "../../methods";

// eslint-disable-next-line  no-unused-vars
const DateLabel = ({
  labelText,
  helperText,
  disabled,
  value,
  format,
  ...rest
}) => {
  return (
    <FormItem {...rest}>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      <div>{!value ? null : toLocaleDateString(value, format)}</div>
      {helperText ? (
        <HelperText className="bx--label" source={helperText} />
      ) : null}
    </FormItem>
  );
};

DateLabel.defaultProps = {
  id: "datelabel",
  name: "datelabel",
  labelText: "",
  helperText: "",
  value: null,
  format: "llll",
};

DateLabel.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  value: PropTypes.any,
  format: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DateLabel;
