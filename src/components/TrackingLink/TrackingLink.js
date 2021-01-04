import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";
import Router from "next/router";

import { isExternalUrl } from "lib/utils";
import { trackCTA, trackNav, trackJourney } from "lib/analytics";

const TrackingLink = ({ data, type, href, onClick, ...rest }) => {
  const handleClick = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (data) {
      if (href && !data.url) data.url = href;
      if (type === "journey") trackJourney(data);
      else if (type === "nav") trackNav(data);
      else trackCTA(data);
    }
    if (onClick && typeof onClick === "function") onClick(e);
    else if (href) {
      if (e.metaKey || e.ctrlKey) window.open(href);
      else if (!isExternalUrl(href)) Router.push(href);
      else window.open(href);
    }
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
};

TrackingLink.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default TrackingLink;
