import React from "react";
//import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import { Coronavirus16, Rule16, Badge16 } from "@carbon/icons-react";

const Styled = styled.div`
  margin-bottom: 1rem;
  & > span {
    font-weight: 300;
    margin-right: 1rem;
  }
  & > .orange {
    color: #e38f56;
  }
  & > .green {
    color: #38714d;
  }
  & > .blue {
    color: #294286;
  }
  .flagText {
    padding-left: 0.2rem;
    vertical-align: top;
  }
`;

const Flag = ({ label, color, ...rest }) => {
  const flagClass = classNames(color);
  let governed = (
    <span className="orange">
      <Rule16></Rule16>
      <span className="flagText">Governed</span>
    </span>
  );
  let covid = (
    <span className="blue">
      <Coronavirus16></Coronavirus16>
      <span className="flagText">Covid</span>
    </span>
  );
  let featured = (
    <span className="green">
      <Badge16></Badge16>
      <span className="flagText">Featured</span>
    </span>
  );
  return (
    <Styled className={flagClass} {...rest}>
      {label.includes("Featured") && featured}
      {label.includes("Governed") && governed}
      {label.includes("Covid") && covid}
    </Styled>
  );
};

Flag.defaultProps = {
  label: "",
  color: "black",
};

// Flag.propTypes = {
//   label: PropTypes.string,
//   color: PropTypes.string,
// };

export default Flag;
