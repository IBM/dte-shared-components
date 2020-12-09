"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/close/20"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

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
 * Close button for Expressive Modal.
 */

var ExpressiveModalCloseBtn = function ExpressiveModalCloseBtn(_ref) {
  var btnClassName = _ref.btnClassName,
      iconDescription = _ref.iconDescription,
      iconClassName = _ref.iconClassName,
      props = (0, _objectWithoutProperties2.default)(_ref, ["btnClassName", "iconDescription", "iconClassName"]);
  return _react.default.createElement("button", (0, _extends2.default)({
    "data-autoid": "".concat(stablePrefix, "--expressive-modal__close"),
    className: (0, _classnames.default)("".concat(prefix, "--modal-close"), btnClassName),
    title: iconDescription,
    type: "button"
  }, props), _react.default.createElement(_.default, {
    "aria-label": iconDescription,
    className: (0, _classnames.default)("".concat(prefix, "--modal-close__icon"), iconClassName)
  }));
};

ExpressiveModalCloseBtn.propTypes = {
  /**
   * A custom class name to the button.
   */
  btnClassName: _propTypes.default.string,

  /**
   * A custom class name to the icon.
   */
  iconClassName: _propTypes.default.string,

  /**
   * Accessible description that describes icon action.
   */
  iconDescription: _propTypes.default.string
};
ExpressiveModalCloseBtn.defaultProps = {
  iconDescription: 'Close'
};
var _default = ExpressiveModalCloseBtn;
exports.default = _default;