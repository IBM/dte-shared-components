"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

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
 * ContentSection Component, for use with cardSection.
 */

var ContentSection = function ContentSection(_ref) {
  var heading = _ref.heading,
      theme = _ref.theme,
      children = _ref.children,
      customClassName = _ref.customClassName,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["heading", "theme", "children", "customClassName"]);
  return _react.default.createElement("section", {
    className: (0, _classnames.default)("".concat(prefix, "--content-section"), customClassName, (0, _defineProperty2.default)({}, "".concat(prefix, "--content-section--").concat(theme), theme)),
    "data-autoid": otherProps.autoid ? otherProps.autoid : "".concat(stablePrefix, "--content-section")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-section__grid")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-section__row")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-section__left")
  }, _react.default.createElement("h2", {
    className: "".concat(prefix, "--content-section__heading")
  }, heading)), _react.default.createElement("div", {
    className: "".concat(prefix, "--content-section__children")
  }, children))));
};

ContentSection.propTypes = {
  /**
   * Heading text.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Theme name.
   */
  theme: _propTypes.default.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Container for other components.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),

  /**
   * Optional class to be applied to the containing node.
   */
  customClassName: _propTypes.default.string
};
var _default = ContentSection;
exports.default = _default;