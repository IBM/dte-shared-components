"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ComposedModal = _interopRequireDefault(require("../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _ExpressiveModalCloseBtn = _interopRequireDefault(require("./ExpressiveModalCloseBtn"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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
 * Expressive Modal.
 */

var ExpressiveModal = function ExpressiveModal(_ref) {
  var open = _ref.open,
      className = _ref.className,
      children = _ref.children,
      fullwidth = _ref.fullwidth,
      onClose = _ref.onClose,
      props = (0, _objectWithoutProperties2.default)(_ref, ["open", "className", "children", "fullwidth", "onClose"]);

  var _useState = (0, _react.useState)(open),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  (0, _react.useEffect)(manageOpenState, [open]);
  return _react.default.createElement(_ComposedModal.default, (0, _extends2.default)({
    onClose: onClose,
    open: isOpen,
    "data-autoid": "".concat(stablePrefix, "--expressive-modal"),
    className: (0, _classnames.default)("".concat(prefix, "--modal--expressive"), className, (0, _defineProperty2.default)({}, "".concat(prefix, "--modal--expressive--fullwidth"), fullwidth))
  }, props), _react.default.createElement(_ExpressiveModalCloseBtn.default, {
    onClick: closeModal
  }), children);
  /**
   * Close modal
   */

  function closeModal() {
    if ((onClose === null || onClose === void 0 ? void 0 : onClose()) !== false) {
      setIsOpen(false);
    }
  }
  /**
   * Manage open prop and isOpen state
   */


  function manageOpenState() {
    setIsOpen(open);
  }
};

ExpressiveModal.propTypes = {
  /**
   * Sets whether the Modal is fullwidth or not.
   */
  fullwidth: _propTypes.default.bool,

  /**
   * Sets whether the Modal is open/close.
   */
  open: _propTypes.default.bool,

  /**
   * Custom classname(s) for the Modal.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),

  /**
   * Components/Elements to be rendered within the Modal.
   */
  children: _propTypes.default.node,

  /**
   * Function to be triggered on close of Modal.
   */
  onClose: _propTypes.default.func
};
ExpressiveModal.defaultProps = {
  open: false
};
var _default = ExpressiveModal;
exports.default = _default;