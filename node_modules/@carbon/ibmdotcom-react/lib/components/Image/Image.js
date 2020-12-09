"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layout = require("@carbon/layout");

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _uniqueid = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/uniqueid/uniqueid"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
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
        breakpoint: parseFloat(_layout.breakpoints[elem.breakpoint].width) * _layout.baseFontSize,
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
  var id = (0, _uniqueid.default)("".concat(prefix, "--image-"));
  return _react.default.createElement("div", {
    className: "".concat(prefix, "--image"),
    "data-autoid": "".concat(stablePrefix, "--image__longdescription")
  }, _react.default.createElement("picture", null, sortedImages.map(function (imgSrc, key) {
    return _react.default.createElement("source", {
      media: "(min-width: ".concat(imgSrc.breakpoint, "px)"),
      key: key,
      srcSet: imgSrc.src
    });
  }), _react.default.createElement("img", {
    className: (0, _classnames.default)("".concat(prefix, "--image__img"), classname),
    src: defaultSrc,
    alt: alt,
    "aria-describedby": longDescription ? "".concat(id) : undefined
  })), longDescription ? _react.default.createElement("div", {
    id: id,
    className: "".concat(prefix, "--image__longdescription")
  }, longDescription) : null, Icon && _react.default.createElement(Icon, {
    className: "".concat(prefix, "--image__icon")
  }));
};

Image.propTypes = {
  /**
   * The CSS class names.
   */
  classname: _propTypes.default.string,

  /**
   * Array of image objects. Use below object structure for each items:
   *
   * | Name         | Data Type     | Description                                  |
   * | ------------ | ------------- | -------------------------------------------- |
   * | `src`        | String        | Url of Image.                                |
   * | `breakpoint` | Num OR String | min-width breakpoint to render the image src |
   */
  sources: _propTypes.default.arrayOf(_propTypes.default.shape({
    src: _propTypes.default.string,
    breakpoint: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
  })),

  /**
   * Default image (usually image for largest breakpoint).
   */
  defaultSrc: _propTypes.default.string.isRequired,

  /**
   * Alternate text for image component.
   */
  alt: _propTypes.default.string.isRequired,

  /**
   * Visible to screen readers, hidden from users.
   */
  longDescription: _propTypes.default.string,

  /**
   * Icon that overlays the image
   */
  icon: _propTypes.default.func
};
var _default = Image;
exports.default = _default;