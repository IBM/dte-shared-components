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
 * Right/Main Panel Navigation of MegaMenu
 */

var RightNavigation = function RightNavigation(_ref) {
  var children = _ref.children,
      viewAllLinkHref = _ref.viewAllLinkHref,
      viewAllLinkTitle = _ref.viewAllLinkTitle,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["children", "viewAllLinkHref", "viewAllLinkTitle"]);
  return _react.default.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__categories-section")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__categories")
  }, children), viewAllLinkHref && _react.default.createElement(_LinkWithIcon.default, {
    className: "".concat(prefix, "--masthead__megamenu__view-all-cta"),
    "data-autoid": "".concat(rest.autoid, "-view-all"),
    href: viewAllLinkHref
  }, _react.default.createElement("span", null, viewAllLinkTitle), _react.default.createElement(_.default, null)));
};

RightNavigation.propTypes = {
  /**
   * Category Groups to be rendered in the Left Navigation Section
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Megamenu view all cta url
   */
  viewAllLinkHref: _propTypes.default.string,

  /**
   * Megamenu view all cta title
   */
  viewAllLinkTitle: _propTypes.default.string
};
var _default = RightNavigation;
exports.default = _default;