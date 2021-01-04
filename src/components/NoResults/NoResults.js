import React from "react";

const NoResultsCard = ({ error = "", ...rest }) => {
  return (
    <div {...rest}>
      <div className="bx--card__wrapper">
        <p className="bx--card__eyebrow"></p>
        <h3 className="bx--card__heading">{error}</h3>
        <div className="bx--card__copy"></div>
        <div className="bx--card__footer"></div>
      </div>
    </div>
  );
};

const NoResultsList = ({ error = "", ...rest }) => {
  return (
    <div className="bx--structured-list-row" {...rest}>
      <div className="bx--structured-list-td">{error}</div>
    </div>
  );
};

const NoResults = ({ mode = "grid", error = `No results found`, ...rest }) => {
  if (typeof error !== "string" && error.error) error = error.error;
  if (mode === "list") return <NoResultsList error={error} {...rest} />;
  if (mode === "nowrap") return <NoResultsCard error={error} {...rest} />;
  return (
    <div className="bx--grid" {...rest}>
      <NoResultsCard error={error} {...rest} />
    </div>
  );
};

NoResults.defaultProps = {
  className:
    "bx--card bx--card--link bx--col-sm-4 bx--col-md-4 bx--col-lg-33 bx--col-xlg-4 bx--col-max-4 bx--no-gutter overflow-hidden fadein",
};

export default NoResults;
