"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Accordion = _interopRequireDefault(require("../../internal/vendor/carbon-components-react/components/Accordion/Accordion"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _FooterNavGroup = _interopRequireDefault(require("./FooterNavGroup"));

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
 * Footer nav component.
 */

var FooterNav = function FooterNav(_ref) {
  var groups = _ref.groups;

  if (!(groups === null || groups === void 0 ? void 0 : groups.length)) {
    return null;
  }

  return _react.default.createElement("nav", {
    "data-autoid": "".concat(stablePrefix, "--footer-nav"),
    className: "".concat(prefix, "--footer-nav")
  }, _react.default.createElement(_Accordion.default, {
    className: "".concat(prefix, "--footer-nav__container")
  }, renderGroups(groups)));
};
/**
 * Loops through and renders a list of nav groups for the footer nav
 *
 * @param {Array} groups A list of groups to be rendered
 * @returns {object} JSX object
 */


function renderGroups(groups) {
  return groups.map(function (_ref2, index) {
    var title = _ref2.title,
        links = _ref2.links;
    return _react.default.createElement(_FooterNavGroup.default, {
      title: title,
      links: links,
      key: index
    });
  });
}

FooterNav.propTypes = {
  /**
   * A list of groups to be rendered.
   */
  groups: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    links: _propTypes.default.arrayOf(_propTypes.default.shape({
      title: _propTypes.default.string,
      url: _propTypes.default.string
    }))
  }))
};
FooterNav.defaultProps = {
  groups: null
};
var _default = FooterNav;
exports.default = _default;