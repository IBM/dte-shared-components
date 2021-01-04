import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { TextArea } from "carbon-components-react";

const TEXTAREALINEHEIGHT = 40;

const AutoGrowTextArea = ({
  value = "",
  rows = 2,
  minRows = 1,
  maxRows = 25,
  onChange,
  ...rest
}) => {
  const [text, setText] = useState(value);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  const textAreaRef = useRef();
  const minRowHeight = minRows * TEXTAREALINEHEIGHT;
  const maxRowHeight = maxRows * TEXTAREALINEHEIGHT;

  useEffect(() => {
    const h = textAreaRef?.current?.scrollHeight || TEXTAREALINEHEIGHT;
    setTextAreaHeight(`${h}px`);
  }, [text]);

  const handleChange = (e) => {
    setTextAreaHeight("auto");
    setText(e?.target?.value || "");
    if (onChange && typeof onChange === "function") onChange(e);
  };

  return (
    <TextArea
      ref={textAreaRef}
      rows={rows}
      value={value}
      style={{
        resize: "vertical",
        height: textAreaHeight,
        minHeight: minRowHeight,
        maxHeight: maxRowHeight,
      }}
      onChange={handleChange}
      {...rest}
    />
  );
};

AutoGrowTextArea.defaultProps = {
  value: undefined,
  rows: 2,
  minRows: 1,
  maxRows: 25,
};

AutoGrowTextArea.propTypes = {
  value: PropTypes.string,
  rows: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  onChange: PropTypes.func,
};

export default AutoGrowTextArea;
