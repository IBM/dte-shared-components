import React from "react";
//import PropTypes from "prop-types";
import { SkeletonText } from "carbon-components-react";

const Loading = ({
  heading = false,
  lineCount = 3,
  paragraph = false,
  width = "100%",
}) => {
  return (
    <SkeletonText
      heading={heading}
      lineCount={lineCount}
      paragraph={paragraph}
      width={width}
    />
  );
};

const LoadingCard = ({ className, message }) => {
  return (
    <div className="bx--grid bx--grid--full-width">
      <div className={`bx--card bx--card--link ${className}`}>
        <div className="bx--card__wrapper">
          <div className="bx--card__eyebrow">
            <Loading lineCount={1} width="75%" />
          </div>
          <h3 className="bx--card__heading">{message}</h3>
          <div className="bx--card__copy">
            <div>
              <Loading />
            </div>
          </div>
          <div className="bx--card__footer">
            <Loading lineCount={1} width="50%" />
          </div>
        </div>
      </div>
    </div>
  );
};

LoadingCard.defaultProps = {
  className:
    "bx--col-sm-4 bx--col-md-4 bx--col-lg-33 bx--col-xlg-4 bx--col-max-4 bx--no-gutter overflow-hidden fadein",
  message: "Loading...",
};

// LoadingCard.propTypes = {
//   className: PropTypes.string,
//   message: PropTypes.string,
// };

export default LoadingCard;
