import React from "react";
import PropTypes from "prop-types";

const Strip = (props) => {
  const node = document.createElement("div");
  node.innerHTML = props.children;
  const textContent = node.textContent;
  return <span className="strip">{textContent}</span>;
};

Strip.propTypes = {
  children: PropTypes.any,
};

export default Strip;
