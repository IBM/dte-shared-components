import React, { useState } from "react";
import PropTypes from "prop-types";
import { truncate } from "lodash";
import styled from "styled-components";

import { ChevronUp32, ChevronDown32 } from "@carbon/icons-react";
import { Button, Markdown } from "../../index";

const Styled = styled.span`
  & .readmore {
    font-size: 0.9rem;
    padding-top: calc(0.375rem - 3px);
    padding-bottom: calc(0.375rem - 3px);
    padding-left: 1rem;
    padding-right: calc(40px);
  }
  & .markdown {
    & h1,
    & h2,
    & h3 {
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 2rem;
    }
  }
  // .list {
  //   & .readmore {
  //     font-size: 0.8rem;
  //     margin-top: 0.5rem;
  //     padding-top: calc(0.25rem - 3px);
  //     padding-bottom: calc(0.25rem - 3px);
  //     padding-left: 1rem;
  //     padding-right: calc(40px);
  //   }
  // }
`;

const Readmore = ({
  length,
  lessLabel,
  markdown,
  moreLabel,
  showToggle = true,
  source,
  toggle,
  tolerance,
  ...rest
}) => {
  const [readMore, setReadMore] = useState(toggle);

  const max = length + tolerance;
  const len = (source && source.length) || 0;

  const handleToggle = () => {
    let text =
      readMore && len > max ? truncate(source, { length: length }) : source;
    if (markdown) return <Markdown source={text} {...rest} />;
    return text;
  };

  return (
    <Styled>
      {handleToggle()}
      {len > max && showToggle ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setReadMore(!readMore);
          }}
          kind="tertiary"
          size="small"
          className="readmore"
          renderIcon={readMore ? ChevronDown32 : ChevronUp32}
        >
          {readMore ? moreLabel : lessLabel}
        </Button>
      ) : null}
    </Styled>
  );
};

Readmore.defaultProps = {
  className: "markdown",
  length: 255, // default length before readmore
  tolerance: 25, // allow +25 char by readmore kicks in
  lessLabel: "Show less", // read less label
  linkTarget: "_blank", // default link target
  markdown: true, // allow markdown
  moreLabel: "Show more", // read more label
  source: "", // source
  toggle: false, // default state?
  showToggle: true, /// do we just want to truncate with no toggle?
  unwrapDisallowed: true,
};

Readmore.propTypes = {
  length: PropTypes.number,
  lessLabel: PropTypes.string,
  markdown: PropTypes.any,
  moreLabel: PropTypes.string,
  showToggle: PropTypes.bool,
  source: PropTypes.string,
  toggle: PropTypes.bool,
  tolerance: PropTypes.number,
};

export default Readmore;
