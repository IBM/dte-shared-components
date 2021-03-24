import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

const Styled = styled.div`
  &.corner-ribbon {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    font-size: 0.8rem;
    width: 200px;
    background: #0043ce;
    position: absolute;
    top: 25px;
    left: -50px;
    text-align: center;
    min-height: 50px;
    word-wrap: break-word;
    padding-left: 3rem;
    padding-right: 3rem;
    letter-spacing: 1px;
    color: #fff;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  &.sticky {
    position: fixed;
  }

  &.shadow {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  &.top-left {
    top: 25px;
    left: -50px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  &.top-right {
    top: 25px;
    right: -50px;
    left: auto;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  &.bottom-left {
    top: auto;
    bottom: 25px;
    left: -50px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  &.bottom-right {
    top: auto;
    right: -50px;
    bottom: 25px;
    left: auto;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  &.bottom-left-circle {
    top: auto;
    left: 1rem;
    bottom: 1rem;
    transform: rotate(0);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    padding: 0;
  }

  &.bottom-right-circle {
    top: auto;
    right: 1rem;
    bottom: 1rem;
    left: auto;
    transform: rotate(0);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    padding: 0;
  }

  &.white {
    background: #fff;
    color: #333;
  }
  &.black {
    background: #000;
    color: #fff;
  }
  &.gray90 {
    background: #262626;
    color: #fff;
  }
  &.gray100 {
    background: #161616;
    color: #fff;
  }
  &.gray10 {
    background: #f4f4f4;
    color: #000;
  }
  &.primary {
    background: #0043ce;
    color: #fff;
  }
  &.secondary {
    background: #525252;
    color: #fff;
  }
  &.ghost {
    background: #fff;
    color: #333;
  }
  &.danger {
    background: #da1e28;
    color: #fff;
  }
  &.warning {
    background: #ff832b;
    color: #000;
  }
  &.info {
    background: #fdd13a;
    color: #000;
  }
  &.success {
    background: #24a148;
    color: #fff;
  }
`;

const Ribbon = ({ label, color, location, shadow, sticky, ...rest }) => {
  const ribbonClass = classNames(color, location, {
    "corner-ribbon": true,
    shadow: shadow,
    sticky: sticky,
  });

  return (
    <Styled className={ribbonClass} {...rest}>
      {label}
    </Styled>
  );
};

Ribbon.defaultProps = {
  label: "",
  color: "primary",
  location: "bottom-right",
  shadow: true,
  sticky: false,
};

Ribbon.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  location: PropTypes.string,
  shadow: PropTypes.bool,
  sticky: PropTypes.bool,
};

export default Ribbon;
