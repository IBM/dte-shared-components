import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { Image } from '../Image';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Logo Grid component.
 */

var LogoGrid = function LogoGrid(_ref) {
  var heading = _ref.heading,
      logosGroup = _ref.logosGroup,
      ctaCopy = _ref.ctaCopy,
      ctaHref = _ref.ctaHref,
      hideBorder = _ref.hideBorder;

  /**
   * sets the class name based on theme type
   *
   * @param {string} theme theme type ( g10 | white/default )
   * @returns {string} theme css class names
   */
  var cta = null;

  if (ctaHref) {
    cta = {
      style: 'card',
      type: 'local',
      copy: ctaCopy,
      cta: {
        href: ctaHref
      }
    };
  }

  return React.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--logo-grid"),
    className: classNames("".concat(prefix, "--logo-grid"), _defineProperty({}, "".concat(prefix, "--logo-grid__no-border"), hideBorder))
  }, React.createElement("div", {
    className: "".concat(prefix, "--logo-grid__container")
  }, React.createElement("div", {
    className: "".concat(prefix, "--logo-grid__wrapper ").concat(prefix, "--grid ").concat(prefix, "--grid--full-width")
  }, React.createElement(ContentBlock, {
    heading: heading,
    cta: cta
  }, React.createElement("div", {
    className: "".concat(prefix, "--logo-grid__row")
  }, logosGroup.map(function (placeholder, index) {
    return React.createElement("div", {
      className: "".concat(prefix, "--logo-grid__col"),
      key: index
    }, React.createElement("a", {
      href: placeholder.href,
      className: "".concat(prefix, "--logo-grid__link")
    }, React.createElement("div", {
      className: "".concat(prefix, "--logo-grid__logo"),
      key: placeholder.label
    }, React.createElement(Image, {
      defaultSrc: placeholder.imgSrc,
      classname: "".concat(prefix, "--logo-grid_img"),
      alt: placeholder.altText,
      longDescription: placeholder.label
    }))));
  }))))));
};

LogoGrid.propTypes = {
  /**
   * Heading text.
   */
  heading: PropTypes.string,

  /**
   * An array of logo objects to be rendered as Image components surrounded by hypertext links:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `label`  | String    | Visible to screen readers, hidden from users.              |
   * | `imgSrc` | String    | Image source for logo placeholder.                         |
   * | `altText`| String    | Alternate text for logo placeholder.                       |
   * | `href`   | String    | Url of that the logo will link to.                         |
   */
  logosGroup: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    imgSrc: PropTypes.string,
    altText: PropTypes.string,
    href: PropTypes.string
  })).isRequired,

  /**
   * Optional copy for the CTA
   */
  ctaCopy: PropTypes.string,

  /**
   * Link address for the CTA. If omitted, CTA doesn't render.
   */
  ctaHref: PropTypes.string,

  /**
   * Set to true to hide the default bottom border.
   */
  hideBorder: PropTypes.bool
};
export default LogoGrid;