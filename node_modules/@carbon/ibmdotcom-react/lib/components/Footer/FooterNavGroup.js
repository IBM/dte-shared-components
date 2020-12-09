"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccordionItem = _interopRequireDefault(require("../../internal/vendor/carbon-components-react/components/Accordion/AccordionItem"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _Link = _interopRequireDefault(require("../../internal/vendor/carbon-components-react/components/Link/Link"));

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
 * Footer nav group component.
 */

var FooterNavGroup = function FooterNavGroup(_ref) {
  var title = _ref.title,
      links = _ref.links;

  if (!title || !(links === null || links === void 0 ? void 0 : links.length)) {
    return null;
  }

  return _react.default.createElement(_AccordionItem.default, {
    "data-autoid": "".concat(stablePrefix, "--footer-nav-group"),
    title: title,
    className: "".concat(prefix, "--footer-nav-group")
  }, _react.default.createElement("h2", {
    className: "".concat(prefix, "--footer-nav-group__title")
  }, title), _react.default.createElement("ul", null, renderListItems(links)));
};
/**
 * Loops through and renders a list of links for footer nav group
 *
 * @param {Array} links A list of links to be rendered
 * @returns {object} JSX object
 */


function renderListItems(links) {
  return links.map(function (_ref2, index) {
    var title = _ref2.title,
        url = _ref2.url;

    if (!title || !url) {
      return null;
    }

    return _react.default.createElement("li", {
      className: "".concat(prefix, "--footer-nav-group__item"),
      key: index
    }, _react.default.createElement(_Link.default, {
      className: "".concat(prefix, "--footer-nav-group__link ").concat(prefix, "--footer__link"),
      "data-autoid": "".concat(stablePrefix, "--footer-nav-group__link"),
      href: url
    }, title));
  });
}

FooterNavGroup.propTypes = {
  /**
   * The title.
   */
  title: _propTypes.default.string,

  /**
   * A list of links to be rendered.
   */
  links: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    url: _propTypes.default.string
  }))
};
FooterNavGroup.defaultProps = {
  title: null,
  links: null
};
var _default = FooterNavGroup;
exports.default = _default;