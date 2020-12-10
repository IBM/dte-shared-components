"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _Image = require("../Image");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
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

  return _react.default.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--logo-grid"),
    className: (0, _classnames.default)("".concat(prefix, "--logo-grid"), (0, _defineProperty2.default)({}, "".concat(prefix, "--logo-grid__no-border"), hideBorder))
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--logo-grid__container")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--logo-grid__wrapper ").concat(prefix, "--grid ").concat(prefix, "--grid--full-width")
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    cta: cta
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--logo-grid__row")
  }, logosGroup.map(function (placeholder, index) {
    return _react.default.createElement("div", {
      className: "".concat(prefix, "--logo-grid__col"),
      key: index
    }, _react.default.createElement("a", {
      href: placeholder.href,
      className: "".concat(prefix, "--logo-grid__link")
    }, _react.default.createElement("div", {
      className: "".concat(prefix, "--logo-grid__logo"),
      key: placeholder.label
    }, _react.default.createElement(_Image.Image, {
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
  heading: _propTypes.default.string,

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
  logosGroup: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string,
    imgSrc: _propTypes.default.string,
    altText: _propTypes.default.string,
    href: _propTypes.default.string
  })).isRequired,

  /**
   * Optional copy for the CTA
   */
  ctaCopy: _propTypes.default.string,

  /**
   * Link address for the CTA. If omitted, CTA doesn't render.
   */
  ctaHref: _propTypes.default.string,

  /**
   * Set to true to hide the default bottom border.
   */
  hideBorder: _propTypes.default.bool
};
var _default = LogoGrid;
exports.default = _default;