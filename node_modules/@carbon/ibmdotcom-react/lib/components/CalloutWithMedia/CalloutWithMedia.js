"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Callout = _interopRequireDefault(require("../../internal/components/Callout/Callout"));

var _ContentBlockSimple = require("../ContentBlockSimple");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

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
 * Callout with media pattern.
 */

var CalloutWithMedia = function CalloutWithMedia(_ref) {
  var ContentBlockSimpleProps = (0, _extends2.default)({}, _ref);
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--callout-with-media"),
    className: "".concat(prefix, "--callout-with-media")
  }, _react.default.createElement(_Callout.default, null, _react.default.createElement(_ContentBlockSimple.ContentBlockSimple, ContentBlockSimpleProps)));
};

CalloutWithMedia.propTypes = _ContentBlockSimple.ContentBlockSimple.propTypes;
var _default = CalloutWithMedia;
exports.default = _default;