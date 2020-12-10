/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { baseFontSize, breakpoints } from '@carbon/layout';
import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 *  sorts media query min-widths order to ensure the
 * browser returns the proper sources and the specified widths
 *
 * @param {Array} sources image sources and min-widths
 *
 * @returns {Array} sorted array of sources
 */

var sortSources = function sortSources(sources) {
  var images = sources.map(function (elem) {
    if (typeof elem.breakpoint == 'number') {
      return elem;
    } else {
      return {
        breakpoint: parseFloat(breakpoints[elem.breakpoint].width) * baseFontSize,
        src: elem.src
      };
    }
  });
  return images.sort(function (a, b) {
    return a.breakpoint > b.breakpoint ? -1 : 1;
  });
};
/**
 * Picture element.
 */


var Image = function Image(_ref) {
  var classname = _ref.classname,
      sources = _ref.sources,
      defaultSrc = _ref.defaultSrc,
      alt = _ref.alt,
      longDescription = _ref.longDescription,
      Icon = _ref.icon;

  if (!defaultSrc || !alt) {
    return null;
  }

  var sortedImages = sources ? sortSources(sources) : [];
  var id = uniqueid("".concat(prefix, "--image-"));
  return React.createElement("div", {
    className: "".concat(prefix, "--image"),
    "data-autoid": "".concat(stablePrefix, "--image__longdescription")
  }, React.createElement("picture", null, sortedImages.map(function (imgSrc, key) {
    return React.createElement("source", {
      media: "(min-width: ".concat(imgSrc.breakpoint, "px)"),
      key: key,
      srcSet: imgSrc.src
    });
  }), React.createElement("img", {
    className: classnames("".concat(prefix, "--image__img"), classname),
    src: defaultSrc,
    alt: alt,
    "aria-describedby": longDescription ? "".concat(id) : undefined
  })), longDescription ? React.createElement("div", {
    id: id,
    className: "".concat(prefix, "--image__longdescription")
  }, longDescription) : null, Icon && React.createElement(Icon, {
    className: "".concat(prefix, "--image__icon")
  }));
};

Image.propTypes = {
  /**
   * The CSS class names.
   */
  classname: PropTypes.string,

  /**
   * Array of image objects. Use below object structure for each items:
   *
   * | Name         | Data Type     | Description                                  |
   * | ------------ | ------------- | -------------------------------------------- |
   * | `src`        | String        | Url of Image.                                |
   * | `breakpoint` | Num OR String | min-width breakpoint to render the image src |
   */
  sources: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),

  /**
   * Default image (usually image for largest breakpoint).
   */
  defaultSrc: PropTypes.string.isRequired,

  /**
   * Alternate text for image component.
   */
  alt: PropTypes.string.isRequired,

  /**
   * Visible to screen readers, hidden from users.
   */
  longDescription: PropTypes.string,

  /**
   * Icon that overlays the image
   */
  icon: PropTypes.func
};
export default Image;