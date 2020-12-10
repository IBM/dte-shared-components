import styled from "styled-components";

const ButtonSetLeft = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
  align-items: center;
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
  align-items: center;
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
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: flex-end;
  & .bx--btn {
    margin-left: 1px;
  }
`;

const ButtonSet = ({ align = "right", wrap, ...rest }) =>
  align === "left" ? (
    wrap ? (
      <ButtonSetLeft {...rest} />
    ) : (
      <ButtonSetLeftNoWrap {...rest} />
    )
  ) : wrap ? (
    <ButtonSetRight {...rest} />
  ) : (
    <ButtonSetRightNoWrap {...rest} />
  );

ButtonSet.defaults = {
  align: "right",
  wrap: true,
};

export default ButtonSet;
