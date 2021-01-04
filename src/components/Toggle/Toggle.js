import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Toggle as CarbonToggle, ToggleSmall as CarbonToggleSmall } from "carbon-components-react";

// eslint-disable-next-line no-unused-vars
const Toggle = ({ name, value, onChange, onToggle, size, helperText, ...rest }) => {
  const [toggled, setToggled] = useState(value);

  useEffect(() => {
    handleChange();
  }, [toggled]);

  const handleChange = () => {
    // console.log("handleChange", name, toggled);
    if (onChange) onChange(name, toggled ? true : false);
  };

  const handleToggle = () => {
    setToggled(!toggled);
  };

  if (size === "small") {
    return (
      <>
        <CarbonToggleSmall onToggle={handleToggle} toggled={toggled} {...rest} />
        <p className="bx--form__helper-text">{helperText}</p>
      </>
    );
  }
  return (
    <>
      <CarbonToggle onToggle={handleToggle} toggled={toggled} {...rest} />
      <p className="bx--form__helper-text">{helperText}</p>
    </>
  );
};

Toggle.defaultProps = {
  id: "toggle",
  name: "toggle",
  labelText: "",
  helperText: "",
  labelA: "Off",
  labelB: "On",
  value: null,
};

Toggle.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  size: PropTypes.number,
  helperText: PropTypes.string,
};

export default Toggle;
