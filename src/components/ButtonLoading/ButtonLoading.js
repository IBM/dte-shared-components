import React from "react";
import { Button as CarbonButton, InlineLoading } from "carbon-components-react";
import styled from "styled-components";

const Button = styled(CarbonButton)`
  padding-top: 0;
  padding-bottom: 0;
`;

const ButtonLoading = ({ kind, disabled, ...rest }) => {
  return (
    <Button kind={kind} disabled={disabled}>
      <InlineLoading {...rest} />
    </Button>
  );
};

ButtonLoading.defaultProps = {
  kind: "primary",
  disabled: true,
  description: "Loading",
  iconDescription: "Loading",
  status: "active",
};

export default ButtonLoading;
