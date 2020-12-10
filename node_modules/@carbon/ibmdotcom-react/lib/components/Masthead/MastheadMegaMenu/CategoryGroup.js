"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/arrow--right/16"));

var _LinkWithIcon = _interopRequireDefault(require("../../LinkWithIcon/LinkWithIcon"));

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
 * Category Group of the MegaMenu
 * contains the category headline and sublinks
 */

var CategoryGroup = function CategoryGroup(_ref) {
  var href = _ref.href,
      title = _ref.title,
      children = _ref.children,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["href", "title", "children"]);
  return _react.default.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__category-group")
  }, href ? _react.default.createElement(_LinkWithIcon.default, {
    href: href,
    className: "".concat(prefix, "--masthead__megamenu__category-headline"),
    "data-autoid": "".concat(rest.autoid, "-list").concat(rest.index)
  }, _react.default.createElement("span", null, title), _react.default.createElement(_.default, null)) : _react.default.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__category-headline"),
    "data-autoid": "".concat(rest.autoid, "-list").concat(rest.index)
  }, _react.default.createElement("p", null, title)), children);
};

CategoryGroup.propTypes = {
  /**
   * Category Groups sublinks
   */
  children: _propTypes.default.node,

  /**
   * url of the Category Group headline
   */
  href: _propTypes.default.string,

  /**
   * Category Group headline title
   */
  title: _propTypes.default.string.isRequired
};
var _default = CategoryGroup;
exports.default = _default;