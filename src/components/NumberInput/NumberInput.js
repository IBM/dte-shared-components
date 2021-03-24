import React from "react";
import { TextInput } from "carbon-components-react";

const NumberInput = (props) => {
  return <TextInput {...props} />;
};

NumberInput.defaultProps = {
  id: "numberinput",
  labelText: "",
  helpText: "",
  onChange: () => {},
  pattern: "[0-9]*",
  type: "number",
  value: undefined,
};

export default NumberInput;
