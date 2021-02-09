import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormItem, CopyButton } from "carbon-components-react";
import { HelperText, Label } from "../../index";

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: flex-start;
  & > .bx--text-input {
    width: 100%;
  }
  & > .text {
    padding-right: 1rem;
  }
  & > .label {
    font-size: 0.875rem;
    font-weight: bold;
    margin-bottom: 0;
    padding-right: 1rem;
  }
`;

const Copy = ({
  labelText,
  helperText,
  feedback,
  feedbackTimeout,
  iconDescription,
  onClick,
  size,
  target,
  type,
  value,
  wrap,
  ...rest
}) => {
  let button, content, label, help;
  if (["input", "textinput"].includes(type))
    content = <input value={value} readOnly {...rest} />;
  else if (type === "textarea")
    content = (
      <textarea row="2" cols="80" readOnly {...rest}>
        {value}
      </textarea>
    );
  else content = <span className="text">{value}</span>;
  if (labelText) label = <Label>{labelText}</Label>;
  if (helperText) help = <HelperText source={helperText} />;
  button = (
    <CopyButton
      size={size}
      feedback={feedback}
      feedbackTimeout={feedbackTimeout}
      iconDescription={iconDescription}
      onClick={(e) => handleCopy(e)}
    />
  );

  const copyToClipboard = (v, el) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(v);
      } else if (typeof window !== "undefined" && window.clipboardData) {
        window.clipboardData.setData("text", v);
      } else if (typeof el !== "undefined" && typeof document !== "undefined") {
        el.focus();
        el.select();
        document.execCommand("copy");
      } else {
        alert(`Unable to copy: ${v}`);
      }
    } catch (err) {
      console.log("copyToClipboard error", err.message || err);
    }
  };

  const handleCopy = (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (target && onClick && typeof onClick === "function")
        onClick(target, value, e);
      else if (onClick && typeof onClick === "function") onClick(value, e);
      else copyToClipboard(value);
    } catch (err) {
      console.log("error", err.message || err);
    }
  };

  if (wrap) {
    return (
      <FormItem>
        {type !== "text" && label ? label : null}
        <StyledDiv>
          {type === "text" && label ? label : null}
          {content}
          {button}
        </StyledDiv>
        {help}
      </FormItem>
    );
  }

  return (
    <StyledDiv>
      {label}
      {content}
      {button}
      {help}
    </StyledDiv>
  );
};

Copy.defaultProps = {
  size: "small",
  type: "text",
  value: "",
  feedback: "Copied!",
  feedbackTimeout: 3000,
  iconDescription: "",
  labelText: "",
  helperText: "",
  target: null,
  onClick: null,
  readOnly: true,
  className: "bx--text-input bx--text__input",
  wrap: false,
};

Copy.propTypes = {
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  feedback: PropTypes.string,
  feedbackTimeout: PropTypes.number,
  iconDescription: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  target: PropTypes.any,
  type: PropTypes.string,
  value: PropTypes.any,
  wrap: PropTypes.bool,
};

export default Copy;
