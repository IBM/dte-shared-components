"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Callout = _interopRequireDefault(require("../../internal/components/Callout/Callout"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Quote = require("../Quote");

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
 * CalloutQuote component.
 */

var CalloutQuote = function CalloutQuote(_ref) {
  var quote = _ref.quote;
  return _react.default.createElement("div", {
    className: "".concat(prefix, "--callout-quote"),
    "data-autoid": "".concat(stablePrefix, "--callout-quote")
  }, _react.default.createElement(_Callout.default, null, _react.default.createElement(_Quote.Quote, (0, _extends2.default)({}, quote, {
    inverse: true
  }))));
};

CalloutQuote.propTypes = {
  /**
   * Quote object.
   * See [`<Quote>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-quote--default#props) for full usage details.
   */
  quote: _propTypes.default.shape({
    markType: _propTypes.default.oneOf(['doubleCurved', 'singleCurved', 'doubleAngle', 'singleAngle', 'lowHighReversedDoubleCurved']),
    copy: _propTypes.default.string.isRequired,
    source: _propTypes.default.shape({
      heading: _propTypes.default.string,
      copy: _propTypes.default.string
    }),
    cta: _propTypes.default.shape({
      copy: _propTypes.default.string,
      type: _propTypes.default.oneOf(['local', 'external']),
      href: _propTypes.default.string
    }),
    inverse: _propTypes.default.bool
  })
};
var _default = CalloutQuote;
exports.default = _default;