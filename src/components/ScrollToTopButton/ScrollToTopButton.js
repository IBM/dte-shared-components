import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { debounce } from "lodash";

import { UpToTop32 } from "@carbon/icons-react";

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 3rem;
  right: 2rem;
  background-color: rgba(128, 128, 128, 0.75);
  color: #fff;
  border-radius: 50px;
  text-align: center;
  transition: all 0.3s ease 0.3s;
  overflow: hidden;
  cursor: pointer;
  z-index: 1001;
  & > svg {
    fill: #fff;
  }
  & > .label {
    visibility: hidden;
    height: 0;
    width: 0;
    opacity: 0;
    font-size: 1rem;
    transition: opacity ease 0.3s 0.3s;
  }
  &:hover {
    background-color: #000;
    width: 10rem;
    box-shadow: 2px 2px 3px #333;
  }
  &:hover > svg {
    fill: #fff;
  }
  &:hover > .label {
    visibility: visible;
    height: auto;
    width: auto;
    opacity: 1;
    margin-left: 1rem;
    color: #fff;
  }
`;

const ScrollToTopButton = ({ labelText, force, ...rest }) => {
  const [show, setShow] = useState(force);
  const listener = () => {
    if (window.pageYOffset > 250) setShow(true);
    else setShow(false);
  };

  useEffect(() => {
    const debounceWrapper = debounce(listener, 250);
    window.addEventListener("scroll", debounceWrapper);
    return () => {
      window.removeEventListener("scroll", debounceWrapper);
    };
  }, []);
  // console.log("this hsoew value ::: ", show, force);
  return show || force ? (
    <Button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      {...rest}
    >
      <UpToTop32 />
      <span className="label">{labelText}</span>
    </Button>
  ) : (
    false
  );
};

ScrollToTopButton.defaultProps = {
  force: false,
  labelText: "Up to top",
};

ScrollToTopButton.propTypes = {
  force: PropTypes.bool,
  labelText: PropTypes.string,
};

export default ScrollToTopButton;
