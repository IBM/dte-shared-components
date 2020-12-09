"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/arrow--right/20"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _LinkWithIcon = require("../LinkWithIcon");

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
 * Simple benefits item.
 */

var SimpleBenefitsItem = function SimpleBenefitsItem(_ref) {
  var title = _ref.title,
      copy = _ref.copy,
      link = _ref.link;
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--simplebenefits__content-item"),
    className: "".concat(prefix, "--simplebenefits__content-item")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__content-item-container")
  }, _react.default.createElement("h3", {
    className: "".concat(prefix, "--simplebenefits__content-item__title")
  }, title), _react.default.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__content-item__divider")
  }), _react.default.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__content-item__content")
  }, copy), link && _react.default.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__content-item__link")
  }, _react.default.createElement(_LinkWithIcon.LinkWithIcon, {
    href: link.href,
    target: link.target
  }, _react.default.createElement("span", null, link.text), _react.default.createElement(_.default, null)))));
};

SimpleBenefitsItem.propTypes = {
  /**
   * Simple long form title
   */
  title: _propTypes.default.string,

  /**
   * Simple long form copy.
   */
  copy: _propTypes.default.string,

  /**
   * Link object which includes url, link text and target properties.
   */
  link: _propTypes.default.shape({
    href: _propTypes.default.string,
    text: _propTypes.default.string,
    target: _propTypes.default.string
  })
};
var _default = SimpleBenefitsItem;
exports.default = _default;