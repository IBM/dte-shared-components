import React, { useState, useEffect } from "react";
import { Checkbox as CarbonCheckbox } from "carbon-components-react";
import { Tooltip } from "../../index";

const Checkbox = ({
  id,
  name,
  checked,
  defaultChecked,
  value,
  labelText,
  helperText,
  onChange,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(checked || defaultChecked);

  useEffect(() => {
    handleChange();
  }, [isChecked]);

  const handleChange = () => {
    const target = name || id;
    const result = isChecked ? value || true : false;
    // console.log("Checkbox handleChange", target, result);
    if (onChange) onChange(target, result);
  };

  let label = helperText ? (
    <Tooltip
      tooltipText={helperText}
      markdown={true}
      direction="top"
      align="start"
    >
      {labelText}
    </Tooltip>
  ) : (
    labelText
  );
  //      labelText={label || ""}
  // console.log("here is console checkbox: ", rest);

  return (
    <CarbonCheckbox
      id={id || name}
      name={name || id}
      value={value}
      labelText={label}
      checked={isChecked}
      onChange={(v, i, e) => {
        setIsChecked(!isChecked);
      }}
      {...rest}
    />
  );
};

Checkbox.defaultProps = {
  helperText: "",
  labelText: "",
  onChange: () => {},
};

export default Checkbox;
