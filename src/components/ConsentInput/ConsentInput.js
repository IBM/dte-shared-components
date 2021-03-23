import { Checkbox } from "carbon-components-react";
import { HelperText } from "../../index";

const ConsentInput = ({ children, labelText, markdown, ...rest }) => {
  return (
    <Checkbox
      labelText={
        markdown ? <HelperText source={labelText} /> : children || labelText
      }
      {...rest}
    />
  );
};

ConsentInput.defaultProps = {
  id: "consent",
  name: "consent",
  labelText:
    "By checking this box you consent to the [Content Contributor guidelines & accountability](https://ibm.box.com/v/contributor-guidelines)",
  markdown: true,
  onChange: () => {},
};

export default ConsentInput;
