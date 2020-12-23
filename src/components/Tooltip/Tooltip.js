import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styled from "styled-components";
import { Markdown } from "";

const prefix = "bx";

const StyledLink = styled.a`
  font: inherit;
  color: rgb(22, 22, 22);
  text-decoration: none;
`;

const StyledToolTip = styled.span`
  & .bx--tooltip-plain {
    font: inherit;
  }
  & .bx--tooltip-plain .bx--tooltip__trigger:not(.bx--btn--icon-only) {
    font: inherit;
  }
  & .bx--tooltip--large {
    width: auto;
    min-width: 15rem;
    max-width: 80rem;
    & .bx--tooltip__content__large {
      display: flex;
      flex-grow: 1;
    }
    & img {
      max-width: 65rem;
    }
  }
`;

const StyledToolTipContent = styled.div`
  width: auto;
  min-width: 15rem;
  max-width: 80rem;
  & .bx--tooltip__caret {
    margin-left: 1rem;
  }
  & .bx--tooltip__content__large {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  & img {
    max-width: 65rem;
  }
`;

const Tooltip = ({
  align,
  className,
  children,
  direction,
  tooltipText,
  markdown,
  ...rest
}) => {
  const [show, setShow] = useState(false);
  const tooltipClassName = cx({
    [className]: !!className,
    [`${prefix}--tooltip-icon`]: true,
  });
  const triggerClassName = cx({
    [`${prefix}--tooltip__trigger`]: !markdown,
    [`${prefix}--tooltip--align-start`]: align === "start",
    [`${prefix}--tooltip--align-end`]: align === "end",
    [`${prefix}--tooltip--align-center`]: align === "center",
    [`${prefix}--tooltip--left`]: direction === "left",
    [`${prefix}--tooltip--right`]: direction === "right",
    [`${prefix}--tooltip--icon__bottom`]: direction === "bottom",
    [`${prefix}--tooltip--icon__top`]: direction === "top",
  });
  // if (markdown) {
  //   return (
  //     <CarbonTooltip direction={direction} align={align} triggerText={children} {...rest}>
  //       <Markdown source={tooltipText} />
  //     </CarbonTooltip>
  //   );
  // }
  if (markdown) {
    return (
      <>
        <StyledLink
          className={`${tooltipClassName}`}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          role="tooltip"
        >
          {children}
        </StyledLink>
        {show ? (
          <StyledToolTipContent
            className={`${prefix}--tooltip ${prefix}--tooltip--shown ${prefix}--tooltip--large `}
            aria-hidden={!show}
          >
            <span className={`${prefix}--tooltip__caret`} />
            <div
              className={`${prefix}--tooltip__content ${prefix}--tooltip__content__large`}
              role="dialog"
            >
              <Markdown source={tooltipText} />
            </div>
          </StyledToolTipContent>
        ) : null}
      </>
    );
  }

  return (
    <StyledToolTip {...rest} className={tooltipClassName}>
      <span className={triggerClassName} aria-label={tooltipText}>
        {children}
      </span>
    </StyledToolTip>
  );
};

Tooltip.defaultProps = {
  className: `${prefix}--tooltip-plain`,
  direction: "left",
  align: "end",
  tooltipText: "",
  markdown: false,
};

Tooltip.propTypes = {
  align: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  direction: PropTypes.string,
  tooltipText: PropTypes.string,
  markdown: PropTypes.bool,
};

export default Tooltip;
