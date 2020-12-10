"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _smoothScroll = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/smoothScroll/smoothScroll"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * DesktopMenu Component.
 */

var TOCDesktop = function TOCDesktop(_ref) {
  var menuItems = _ref.menuItems,
      selectedId = _ref.selectedId;

  /**
   * Render menu items
   *
   * @param {Array} items menu items array
   * @param {string} activeId selected item id
   * @returns {*} JSX Object
   */
  var renderMenuItems = function renderMenuItems(items, activeId) {
    return items.map(function (item, index) {
      if ((item === null || item === void 0 ? void 0 : item.id) !== 'menuLabel') {
        var isActive = activeId === item.id;
        return _react.default.createElement("li", {
          key: index,
          "data-autoid": "".concat(stablePrefix, "--tableofcontents__desktop__item-").concat(item.id),
          className: (0, _classnames.default)("".concat(prefix, "--tableofcontents__desktop__item"), (0, _defineProperty2.default)({}, "".concat(prefix, "--tableofcontents__desktop__item--active"), isActive))
        }, _react.default.createElement("a", (0, _extends2.default)({}, isActive ? {
          'aria-current': 'location'
        } : {}, {
          onClick: function onClick(e) {
            return handleOnClick(e, item.id);
          },
          href: "#".concat(item.id)
        }), item.title));
      }
    });
  };
  /**
   * Handle OnClick
   *
   * @param {*} e event object
   * @param {*} id menu item id
   */


  var handleOnClick = function handleOnClick(e, id) {
    e.preventDefault();
    var selector = "a[name=\"".concat(id, "\"]");
    (0, _smoothScroll.default)(null, selector);
    triggerFocus(selector);
  };
  /**
   * Trigger the focus on screen readers, so they can read the target paragraph
   *
   * @param {*} elem Selector to find the item
   */


  function triggerFocus(elem) {
    var element = document.querySelector(elem);
    element.setAttribute('tabindex', '0');
    element.focus({
      preventScroll: true
    });
    element.removeAttribute('tabindex');
  }

  return _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__desktop"),
    "data-autoid": "".concat(stablePrefix, "--tableofcontents__desktop")
  }, _react.default.createElement("ul", null, renderMenuItems(menuItems, selectedId)));
};

TOCDesktop.propTypes = {
  /**
   * Array of menu item objects to render within the side nav.
   * Each items has the following structure:
   *
   * | Properties Name | Data Type | Description     |
   * | --------------- | --------- | --------------- |
   * | title           | String    | Menu title text |
   * | id              | String    | Menu id         |
   */
  menuItems: _propTypes.default.array,

  /**
   * Id of a menu item.
   */
  selectedId: _propTypes.default.string
};
var _default = TOCDesktop;
exports.default = _default;