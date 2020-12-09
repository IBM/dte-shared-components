"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Callout = _interopRequireDefault(require("../../internal/components/Callout/Callout"));

var _FeatureFlags = require("../../internal/FeatureFlags");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _featureflag = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/featureflag/featureflag"));

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
 * Callout with Data pattern.
 */

var CalloutData = function CalloutData(_ref) {
  var data = _ref.data,
      copy = _ref.copy,
      source = _ref.source;
  return (0, _featureflag.default)(_FeatureFlags.DDS_CALLOUT_DATA, _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--callout-data"),
    className: "".concat(prefix, "--callout-data")
  }, _react.default.createElement(_Callout.default, null, _react.default.createElement("h4", {
    className: "".concat(prefix, "--callout-data__data")
  }, data), _react.default.createElement("p", {
    className: "".concat(prefix, "--callout-data__copy")
  }, copy)), _react.default.createElement("p", {
    className: "".concat(prefix, "--callout-data__source")
  }, source)));
};

CalloutData.PropTypes = {
  /**
   * Data for CalloutData pattern.
   */
  data: _propTypes.default.string.isRequired,

  /**
   * Copy text
   */
  copy: _propTypes.default.string.isRequired,

  /**
   * Source test
   */
  source: _propTypes.default.string.isRequired
};
var _default = CalloutData;
exports.default = _default;