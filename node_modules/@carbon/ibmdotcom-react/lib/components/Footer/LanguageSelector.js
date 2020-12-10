"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ComboBox = _interopRequireDefault(require("../../internal/vendor/carbon-components-react/components/ComboBox/ComboBox"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _windowOrGlobal = _interopRequireDefault(require("window-or-global"));

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
 * Footer language selector component.
 */

var LanguageSelector = function LanguageSelector(_ref) {
  var items = _ref.items,
      initialSelectedItem = _ref.initialSelectedItem,
      callback = _ref.callback;

  var _useClickOutside = useClickOutside(),
      ref = _useClickOutside.ref;

  var _useState = (0, _react.useState)(initialSelectedItem || items[0]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedItem = _useState2[0],
      setSelectedItem = _useState2[1];

  var _useState3 = (0, _react.useState)(initialSelectedItem || items[0]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      lastSelectedItem = _useState4[0],
      setLastSelectedItem = _useState4[1];
  /**
   * Sets the selected item and then runs the callback function
   *
   * @param {object} selectedItem Selected item object
   * @private
   */


  function _setSelectedItem(selectedItem) {
    setSelectedItem(selectedItem);
    callback(selectedItem);

    if (selectedItem !== null) {
      setLastSelectedItem(selectedItem);
    }
  }
  /**
   * Identifies the click outisde the language selector and resets its value to the previously selected
   */


  function useClickOutside() {
    var ref = (0, _react.useRef)(null);

    var handleClickOutside = function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelectedItem(lastSelectedItem);
      }
    };

    (0, _react.useEffect)(function () {
      _windowOrGlobal.default.document.addEventListener('click', handleClickOutside, true);

      return function () {
        _windowOrGlobal.default.document.removeEventListener('click', handleClickOutside, true);
      };
    });
    return {
      ref: ref
    };
  }

  return _react.default.createElement("div", {
    className: "".concat(prefix, "--language-selector__container"),
    ref: ref
  }, _react.default.createElement(_ComboBox.default, {
    id: "dds-language-selector",
    "data-autoid": "".concat(stablePrefix, "--language-selector"),
    className: "".concat(prefix, "--language-selector"),
    onChange: function onChange(_ref2) {
      var selectedItem = _ref2.selectedItem;
      return _setSelectedItem(selectedItem);
    },
    items: items,
    itemToString: function itemToString(item) {
      return item ? item.text : '';
    },
    initialSelectedItem: initialSelectedItem,
    selectedItem: selectedItem,
    direction: "top",
    placeholder: ""
  }));
};

LanguageSelector.propTypes = {
  /**
   * Array of items to pass into ComboBox.
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string,
    text: _propTypes.default.string
  })),

  /**
   * Initial selected item for the ComboBox.
   */
  initialSelectedItem: _propTypes.default.shape({
    id: _propTypes.default.string,
    text: _propTypes.default.string
  }),

  /**
   * Callback function when an item is selected.
   */
  callback: _propTypes.default.func
};
LanguageSelector.defaultProps = {
  items: null,
  initialSelectedItem: null,
  callback: function callback() {}
};
var _default = LanguageSelector;
exports.default = _default;