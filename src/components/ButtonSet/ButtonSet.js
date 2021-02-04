import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonSetLeft = styled.div`
  width: 100%;
  display: flex;
  // align-items: center;
  align-items: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  & .bx--btn {
    margin-right: 1px;
  }
`;

const ButtonSetRight = styled.div`
  width: 100%;
  display: flex;
  // align-items: center;
  align-items: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  justify-content: flex-end;
  & .bx--btn {
    margin-left: 1px;
  }
`;

const ButtonSetLeftNoWrap = styled.div`
  width: 100%;
  display: flex;
  // align-items: center;
  align-items: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: flex-start;
  & .bx--btn {
    margin-right: 1px;
  }
`;

const ButtonSetRightNoWrap = styled.div`
  width: 100%;
  display: flex;
  // align-items: center;
  align-items: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: flex-end;
  & .bx--btn {
    margin-left: 1px;
  }
`;

const ButtonSet = ({ align = "right", wrap, ...rest }) => {
  if (!rest || !rest.children) return null;
  if (align === "left")
    return wrap ? (
      <ButtonSetLeft {...rest} />
    ) : (
      <ButtonSetLeftNoWrap {...rest} />
    );
  return wrap ? (
    <ButtonSetRight {...rest} />
  ) : (
    <ButtonSetRightNoWrap {...rest} />
  );
};

ButtonSet.defaultProps = {
  align: "right",
  wrap: false,
};

ButtonSet.propTypes = {
  align: PropTypes.string,
  wrap: PropTypes.bool,
};

export default ButtonSet;
