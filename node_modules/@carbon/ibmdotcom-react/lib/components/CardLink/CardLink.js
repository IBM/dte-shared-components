"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Card = require("../Card");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var prefix = _settings.default.prefix;
/**
 * CardLink component
 */

var CardLink = function CardLink(_ref) {
  var card = _ref.card,
      customClassName = _ref.customClassName;
  var cardLinkClassname = (0, _classnames.default)("".concat(prefix, "--card__CTA"), customClassName);
  return _react.default.createElement(_Card.Card, (0, _extends2.default)({
    customClassName: cardLinkClassname
  }, card));
};

CardLink.propTypes = {
  /**
   * Card options.
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--link-clickable#props) for full usage details.
   */
  card: _propTypes.default.shape(_Card.Card.propTypes).isRequired,

  /**
   * Custom className
   */
  customClassName: _propTypes.default.string
};
CardLink.defaultProps = {
  disabled: false
};
var _default = CardLink;
exports.default = _default;