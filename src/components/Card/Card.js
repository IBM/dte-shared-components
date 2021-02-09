import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

import { ClickableTile, Tile } from "carbon-components-react";
import { CTA, Image } from "@carbon/ibmdotcom-react";
import {
  settings as ddsSettings,
  markdownToHtml,
} from "@carbon/ibmdotcom-utilities";
import { settings } from "carbon-components";

//import { isExternalUrl, isHex } from "../../lib/utils";

import { Ribbon } from "../Ribbon/Ribbon";
import { Flag } from "../Flag/Flag";

const Styled = styled.div`
  & .bx--card__wrapper {
    cursor: pointer;
  }
  & .bx--card__heading {
    margin-bottom: 1rem;
  }
  & .bx--card__menu {
    position: absolute;
    top: 0;
    right: 0;
  }
  & .bx--card__subcopy,
  & .bx--card__subheading {
    color: #161616;
    margin-bottom: 1rem;
  }
  & .bx--card__subheading {
    margin-top: 0;
  }
  & .bx--card__copy {
    margin-bottom: 1rem;
  }
  & .bx--card__subcopy {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.125rem;
    letter-spacing: 0.16px;
    margin-bottom: 1rem;
    color: #393939;
    & div {
      margin-bottom: 0.5rem;
    }
  }
  & .bx--card__actions {
    margin-right: calc(-1rem + 1px);
    margin-top: calc(-1rem + 1px);
    & .icon-only {
      color: #161616;
    }
    & button:last-of-type {
      margin-right: 0.5em;
    }
  }
`;

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const parseString = (value) => {
  try {
    if (!value) return; // nothing to do
    if (Array.isArray(value)) return value; // already an array
    if (typeof value === "object") return value; // already an object
    return JSON.parse(value); // parse and return object
  } catch (err) {
    return value; // not a parsable object ... return the value
  }
};

const Card = ({
  data,
  type,
  inverse,
  background,
  image,
  eyebrow,
  actions,
  heading,
  subheading,
  customClassName,
  copy,
  subcopy,
  ribbon,
  flags,
  cta,
  raw,
  namespace,
  menu,
  wrapped,
  onClick,
  trackCTA,
  trackNav,
  trackJourney,
  ...props
}) => {
  const CardTile = Tile; //type === "link" ? ClickableTile : Tile;
  let style;
  const isExternalUrl = (url) => {
    if (!url || url === "") return false;
    let pattern = /^((http|https|ftp):\/\/)/;
    url = url.toString();
    return pattern.test(url) ? true : false;
  };
  const isHex = (h) => {
    try {
      return /^#[0-9A-F]{6}$/i.test(h);
    } catch (err) {
      return false;
    }
  };
  if (background) {
    background = parseString(background);
    if (background && isHex(background)) {
      style = {
        margin: "-16px -16px 1rem -16px",
        width: "width: calc(100%+16px)",
        height: "5rem",
        backgroundColor: background,
        backgroundImage: "none",
      };
    } else if (background && typeof background === "object") {
      const {
        height: backgroundHeight = "10rem",
        position: backgroundPosition = "center center",
        size: backgroundSize = "cover",
        repeat: backgroundRepeat = "no-repeat",
        url: backgroundUrl = "",
      } = background;
      style = {
        margin: "-16px -16px 1rem -16px",
        width: "width: calc(100%+16px)",
        height: backgroundHeight,
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: backgroundPosition,
        backgroundSize: backgroundSize,
        backgroundRepeat: backgroundRepeat,
      };
    } else {
      style = {
        margin: "-16px -16px 1rem -16px",
        width: "width: calc(100%+16px)",
        height: "10rem",
        backgroundImage: `url(${background})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    }
  }
  return (
    <CardTile
      data-autoid={`${stablePrefix}--card`}
      data-href={data.url || cta.href}
      className={classNames(
        `${namespace}`,
        `${prefix}--card`,
        {
          [`${prefix}--card--inverse`]: inverse,
          [`${prefix}--card--link`]: type === "link",
        },
        customClassName
      )}
      style={{ borderRight: "1px solid #fff", borderBottom: "1px solid #fff" }}
      onClick={(e) => {
        e.stopPropagation();
        if (data) {
          if (cta.href && !data.url) data.url = cta.href;
          if (type === "journey") trackJourney(data);
          else if (type === "nav") trackNav(data);
          else trackCTA(data);
        }
        if (!cta || !cta.href) {
          if (!onClick || typeof onClick === "undefined") return;
          onClick(e);
        }
        if (e.metaKey || e.ctrlKey) window.open(cta.href);
        else if (onClick) onClick(e);
        else if (!isExternalUrl(cta.href)) Router.push(cta.href);
        else window.open(cta.href);
      }}
      {...props}
    >
      <Styled>
        {image && <Image {...image} classname={`${prefix}--card__img`} />}
        <div className={`${prefix}--card__wrapper`}>
          {menu && <div className={`${prefix}--card__menu`}>{menu}</div>}
          {background && <div style={style} />}
          {renderActions(actions, type)}
          {eyebrow && <p className={`${prefix}--card__eyebrow`}>{eyebrow}</p>}
          {heading && <h3 className={`${prefix}--card__heading`}>{heading}</h3>}
          {subheading && (
            <h5 className={`${prefix}--card__subheading`}>{subheading}</h5>
          )}
          {optionalContent(copy, raw)}
          {optionalContent(subcopy, raw, "subcopy")}
          {flags ? <Flag {...flags} /> : null}
          {renderFooter(cta, type, wrapped)}
        </div>
        {ribbon ? <Ribbon {...ribbon} /> : null}
      </Styled>
    </CardTile>
  );
};

const optionalContent = (copy, raw = false, suffix = "copy") => {
  if (!copy) return null;
  if (raw) return <div className={`${prefix}--card__${suffix}`}>{copy}</div>;
  return (
    <div
      className={`${prefix}--card__${suffix}`}
      dangerouslySetInnerHTML={{
        __html: markdownToHtml(copy, { bold: false }),
      }}
    />
  );
};

const renderActions = (actions, type) => {
  return actions && <div className={`${prefix}--card__actions`}>{actions}</div>;
};

const renderFooter = (data, type, wrapped = false) => {
  if (!data) return;
  let cta = { ...data };
  if (wrapped && cta && cta.href) delete cta.href; // remove the href ... handled in the wrapper
  return (
    <div className={`${prefix}--card__footer`}>
      {type !== "link" ? (
        <CTA style="text" {...cta} customClassName={`${prefix}--card__cta`} />
      ) : (
        cta.icon.src && (
          <cta.icon.src className={`${prefix}--card__cta`} {...cta.icon} />
        )
      )}
    </div>
  );
};

Card.propTypes = {
  namespace: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  eyebrow: PropTypes.string,
  copy: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subcopy: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  actions: PropTypes.object,
  cta: PropTypes.object,
  image: PropTypes.object,
  ribbon: PropTypes.object,
  flags: PropTypes.object,
  inverse: PropTypes.bool,
  customClassName: PropTypes.string,
  type: PropTypes.string,
  raw: PropTypes.bool,
  data: PropTypes.object,
};

Card.defaultProps = {
  data: null,
  namespace: "customcard",
  inverse: false,
  raw: false,
  wrapped: false,
};

export default Card;
