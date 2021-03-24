import React from "react";
import PropTypes from "prop-types";
import ContentSection from "../ContentSection/ContentSection";

const CardSection = ({ mode, ...rest }) => {
  return <ContentSection {...rest} />;
};

CardSection.defaultProps = {
  heading: "",
};

CardSection.propTypes = {
  mode: PropTypes.any,
};

export default CardSection;
