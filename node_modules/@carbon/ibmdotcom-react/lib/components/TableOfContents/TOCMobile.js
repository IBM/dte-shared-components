"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _smoothScroll = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/smoothScroll/smoothScroll"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/table-of-contents/20"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * Mobile Component.
 */

var TOCMobile = function TOCMobile(_ref) {
  var menuItems = _ref.menuItems,
      selectedId = _ref.selectedId,
      menuLabel = _ref.menuLabel,
      updateState = _ref.updateState;

  var _useState = (0, _react.useState)('menuLabel'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedOption = _useState2[0],
      setSelectedOption = _useState2[1];

  (0, _react.useEffect)(function () {
    setSelectedOption(selectedId);
  }, [selectedId]);
  /**
   * Handle onChange event of select
   *
   * @param {*} e event object
   */

  var handleChange = function handleChange(e) {
    var id = e.target.value;
    var filteredItems = menuItems.filter(function (menu) {
      return menu.id === id;
    });
    var title = filteredItems[0].title;
    updateState(id, title);
    var selector = "a[name=\"".concat(id, "\"]");
    (0, _smoothScroll.default)(null, selector, 50);
  };
  /**
   * Handle OnBlur event
   *
   * @returns {null} Returns null for blur events
   */


  var handleOnBlur = function handleOnBlur() {
    return null;
  };

  return _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__mobile"),
    "data-autoid": "".concat(stablePrefix, "--tableofcontents__mobile")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__mobile__select__wrapper")
  }, _react.default.createElement("select", {
    className: "".concat(prefix, "--tableofcontents__mobile__select"),
    onBlur: handleOnBlur,
    value: selectedOption,
    onChange: function onChange(e) {
      return handleChange(e);
    }
  }, renderOptions(menuItems, menuLabel)), _react.default.createElement(_.default, {
    className: "".concat(prefix, "--tableofcontents__mobile__select__icon"),
    "aria-label": "menu icon"
  }, _react.default.createElement("title", null, "menu icon"))));
};
/**
 * Render options for select
 *
 * @param {Array} options menu item arrray
 * @param {Array} label menu label
 * @returns {*} JSX Object
 */


var renderOptions = function renderOptions(options, label) {
  var labelObj = {
    title: "".concat(label, " ..."),
    id: 'menuLabel'
  };
  options.findIndex(function (x) {
    return x.id === labelObj.id;
  }) === -1 ? options.unshift(labelObj) : null;
  return options.map(function (option, index) {
    if (option) {
      return _react.default.createElement("option", {
        className: "".concat(prefix, "--tableofcontents__mobile__select__option"),
        "data-autoid": "".concat(stablePrefix, "}--tableofcontents__mobile__select__option-").concat(option.id),
        key: index,
        value: option.id,
        defaultValue: index === 0,
        disabled: index === 0,
        hidden: index === 0
      }, option.title);
    }
  });
};

TOCMobile.propTypes = {
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
  selectedId: _propTypes.default.string,

  /**
   * Menu label for mobile menu.
   */
  menuLabel: _propTypes.default.string,

  /**
   * Function to update parent state.
   */
  updateState: _propTypes.default.func
};
var _default = TOCMobile;
exports.default = _default;