"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var prefix = _settings.default.prefix;
/**
 * Category sublink
 */

var CategoryLink = function CategoryLink(_ref) {
  var href = _ref.href,
      title = _ref.title,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["href", "title"]);
  return _react.default.createElement("a", {
    tabIndex: 0,
    href: href,
    className: "".concat(prefix, "--masthead__megamenu__category-sublink"),
    "data-autoid": "".concat(rest.autoid, "-item").concat(rest.index)
  }, title);
};

CategoryLink.propTypes = {
  /**
   * Category sublink href
   */
  href: _propTypes.default.string.isRequired,

  /**
   * Category sublink text
   */
  title: _propTypes.default.string.isRequired
};
var _default = CategoryLink;
exports.default = _default;