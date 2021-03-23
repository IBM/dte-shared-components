import React from "react";
import PropTypes from "prop-types";
import { FormItem, FormLabel } from "carbon-components-react";

import HelperText from "../../index";

const FieldValue = ({
  helperText,
  helperTextWithHtml,
  hiddenInput,
  id,
  labelText,
  name,
  value,
  ...rest
}) => {
  return (
    <FormItem {...rest}>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      <div>
        {value}
        {hiddenInput ? (
          <input
            type="hidden"
            name={name || id}
            id={id || name}
            value={value}
          />
        ) : null}
      </div>
      {helperText ? (
        <HelperText
          className="bx--label"
          source={helperText}
          withHtml={helperTextWithHtml}
        />
      ) : null}
    </FormItem>
  );
};

FieldValue.defaultProps = {
  id: "fieldvalue",
  name: "fieldvalue",
  labelText: "",
  helperText: "",
  helperTextWithHtml: false,
  value: null,
  hiddenInput: false,
};

FieldValue.propTypes = {
  helperText: PropTypes.string,
  helperTextWithHtml: PropTypes.bool,
  hiddenInput: PropTypes.bool,
  id: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
};

export default FieldValue;
