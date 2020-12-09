"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
 * Callout with child object.
 */

var Callout = function Callout(_ref) {
  var children = _ref.children;
  return _react.default.createElement("section", {
    className: "".concat(prefix, "--callout__container"),
    "data-autoid": "".concat(stablePrefix, "--callout__container")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--callout__column"),
    "data-autoid": "".concat(stablePrefix, "--callout__column")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--callout__content"),
    "data-autoid": "".concat(stablePrefix, "--callout__content")
  }, children)));
};

Callout.propTypes = {
  /**
   * The component being imported into the callout container.
   */
  children: _propTypes.default.object
};
var _default = Callout;
exports.default = _default;