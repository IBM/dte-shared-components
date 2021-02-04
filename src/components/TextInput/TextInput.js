import React from "react";

import { TextInput as CarbonTextInput } from "carbon-components-react";
import { HelperText } from "../HelperText/HelperText";

const TextInput = ({ helperText, ...rest }) => {
  return (
    <CarbonTextInput
      helperText={<HelperText source={helperText} />}
      {...rest}
    />
  );
};

TextInput.defaultProps = {
  type: "text",
  size: undefined,
  className: "text-input",
};

TextInput.propTypes = {
  ...CarbonTextInput.propTypes,
};

export default TextInput;
