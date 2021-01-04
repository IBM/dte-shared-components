import React from "react";

import { TextArea as CarbonTextArea } from "carbon-components-react";
import { HelperText } from "components";

const TextArea = ({ helperText, ...rest }) => {
  return <CarbonTextArea helperText={<HelperText source={helperText} />} {...rest} />;
};

TextArea.defaultProps = {
  className: "text-area",
};

TextArea.propTypes = {
  ...CarbonTextArea.propTypes,
};

export default TextArea;
