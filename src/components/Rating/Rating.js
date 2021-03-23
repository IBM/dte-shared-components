import React, { useState } from "react";
import PropTypes from "prop-types";
import { Star32, StarFilled32 } from "@carbon/icons-react";
import ReactRating from "react-rating";
import styled from "styled-components";

import { Tooltip, TooltipIcon } from "carbon-components-react";

const RatingTooltipIcon = styled(TooltipIcon)`
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ReactRatingReadonly = styled(ReactRating)`
  cursor: default;
`;

const RatingValue = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 1rem;
  color: #fff;
`;

const RatingLink = styled.div`
  color: #c6dbff;
  padding-left: 0.25rem;
  cursor: pointer;
  font-size: 1.2rem;
`;

const RatingTooltip = styled.div`
  padding-bottom: 1.2rem;
  line-height: 1.2rem;
`;

const Rating = ({
  buttonSetAlign,
  buttonSetStyle,
  // eslint-disable-next-line no-unused-vars
  dimension,
  // eslint-disable-next-line no-unused-vars
  namespace,
  initialRating,
  labelText,
  helperText,
  totalRating,
  placeholderRating,
  readonly,
  wrap,
  onChange,
  ...rest
}) => {
  const [rating, setRating] = useState(initialRating || placeholderRating || 0);
  const [changed, setChanged] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const handleChange = async (v) => {
    if (onChange && typeof onChange === "function") {
      try {
        await onChange(v);
      } catch (err) {
        console.log("Error", err.message || err);
      }
    }
    setRating(v);
    setChanged(true);
    setTooltip(false);
  };

  if (!wrap)
    return (
      <ReactRating initialRating={rating} onClick={handleChange} {...rest} />
    );

  return (
    <span align={buttonSetAlign} style={buttonSetStyle}>
      <RatingTooltipIcon
        tooltipText={`${rating} stars out of ${totalRating} total ratings`}
      >
        <ReactRatingReadonly
          initialRating={rating}
          readonly={true}
          quiet={true}
          {...rest}
        />
        <RatingValue>
          ({totalRating ? totalRating : rating ? 1 : totalRating})
        </RatingValue>
        {!changed && !readonly && (
          <Tooltip
            triggerText={
              <RatingLink
                onClick={() => {
                  setTooltip(!tooltip);
                }}
              >
                {labelText}
              </RatingLink>
            }
            open={tooltip}
            showIcon={false}
          >
            <RatingTooltip>{helperText}</RatingTooltip>
            <ReactRating
              onClick={handleChange}
              placeholderRating={0}
              {...rest}
            />
          </Tooltip>
        )}
      </RatingTooltipIcon>
    </span>
  );
};

Rating.defaultProps = {
  namespace: "rating",
  wrap: true,
  start: 0,
  stop: 5,
  step: 1,
  fractions: 2,
  initialRating: 0,
  totalRating: 0,
  placeholderRating: 0,
  dimension: "default",
  labelText: "Rate this asset",
  helperText:
    "How likely are you to use this asset to progress an opportunity or to generate content?",
  emptySymbol: <Star32 style={{ fill: "#fff" }} />,
  fullSymbol: <StarFilled32 style={{ fill: "#fff" }} />,
  readonly: false,
  buttonSetAlign: "left",
  buttonSetStyle: { whiteSpace: "nowrap" },
  onChange: () => {},
};

Rating.propTypes = {
  buttonSetAlign: PropTypes.string,
  buttonSetStyle: PropTypes.object,
  dimension: PropTypes.string,
  initialRating: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  totalRating: PropTypes.number,
  placeholderRating: PropTypes.string,
  readonly: PropTypes.bool,
  wrap: PropTypes.bool,
  namespace: PropTypes.string,
  onChange: PropTypes.func,
};

export default Rating;
