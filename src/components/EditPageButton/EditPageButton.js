import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

import { Edit20 } from "@carbon/icons-react";

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 3rem;
  right: 2rem;
  background-color: #0f62fe;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  transition: all 0.3s ease 0.3s;
  overflow: hidden;
  cursor: pointer;
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
    background-color: #0353e9;
    width: 12rem;
    box-shadow: 2px 2px 3px #333;
  }
  &:hover > .label {
    visibility: visible;
    height: auto;
    width: auto;
    opacity: 1;
    margin-left: 1rem;
  }
`;

const OffsetButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 6.5rem;
  right: 2rem;
  background-color: #0f62fe;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  transition: all 0.3s ease 0.3s;
  overflow: hidden;
  cursor: pointer;
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
    background-color: #0353e9;
    width: 12rem;
    box-shadow: 2px 2px 3px #333;
  }
  &:hover > .label {
    visibility: visible;
    height: auto;
    width: auto;
    opacity: 1;
    margin-left: 1rem;
  }
`;

const EditPageButton = (props) => {
  const [offset, setOffset] = useState(false);
  const listener = () => {
    if (window && window.pageYOffset > 250) setOffset(true);
    else setOffset(false);
  };
  useEffect(() => {
    const debounceWrapper = debounce(listener, 250);
    if (window) {
      window.addEventListener("scroll", debounceWrapper);
      return () => {
        window.removeEventListener("scroll", debounceWrapper);
      };
    }
  }, []);
  return offset ? (
    <OffsetButton {...props}>
      {" "}
      <Edit20 />
      <span className="label">Edit this page</span>
    </OffsetButton>
  ) : (
    <Button {...props}>
      <Edit20 />
      <span className="label">Edit this page</span>
    </Button>
  );
};

EditPageButton.defaultProps = {
  onClick: () => {},
};

export default EditPageButton;
