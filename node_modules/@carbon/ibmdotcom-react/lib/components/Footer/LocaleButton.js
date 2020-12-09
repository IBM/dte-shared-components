"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("../../internal/vendor/carbon-components-react/components/Button/Button"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/earth--filled/20"));

var _LocaleModal = _interopRequireDefault(require("../LocaleModal/LocaleModal"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * Renders the locale button.
 */

var LocaleButton = function LocaleButton(_ref) {
  var displayLang = _ref.displayLang,
      aria = _ref.aria;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  return _react.default.createElement("div", {
    className: "".concat(prefix, "--locale-btn__container")
  }, _react.default.createElement(_Button.default, {
    "data-autoid": "".concat(stablePrefix, "--locale-btn"),
    className: "".concat(prefix, "--locale-btn"),
    kind: "secondary",
    onClick: open,
    renderIcon: _.default,
    iconDescription: "Earth Filled Icon",
    "aria-label": aria
  }, displayLang), isOpen && _react.default.createElement(_LocaleModal.default, {
    isOpen: isOpen,
    setIsOpen: setIsOpen
  }));
  /**
   * Sets modal state to open
   *
   * @private
   */

  function open() {
    setIsOpen(true);
  }
};

LocaleButton.propTypes = {
  /**
   * Display language for locale button.
   */
  displayLang: _propTypes.default.string,

  /**
   * `aria-label`` value.
   */
  aria: _propTypes.default.string
};
var _default = LocaleButton;
exports.default = _default;