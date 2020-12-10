"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Card = require("../Card");

var _classnames = _interopRequireDefault(require("classnames"));

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
 * Featured Card Component.
 */

var FeatureCardBlockLarge = function FeatureCardBlockLarge(props) {
  return props.eyebrow && props.heading && props.image && props.cta && _react.default.createElement("section", {
    className: (0, _classnames.default)("".concat(prefix, "--feature-card-block-large"), (0, _defineProperty2.default)({}, "".concat(prefix, "--feature-card-block-large_no-copy-text"), !props.copy)),
    "data-autoid": "".concat(stablePrefix, "--feature-card-block-large")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--feature-card-block-large__container")
  }, _react.default.createElement(_Card.Card, (0, _extends2.default)({
    customClassName: "".concat(prefix, "--feature-card-block-large__card")
  }, props, {
    inverse: true
  }))));
};

FeatureCardBlockLarge.propTypes = {
  /**
   * "Eyebrow" text above copy and CTA.
   */
  eyebrow: _propTypes.default.string.isRequired,

  /**
   * Title of the Card item.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Body text for the card.
   */
  copy: _propTypes.default.string,

  /**
   * Object containing target and href of link. Has the following structure in summary:
   *
   * | Name   | Data Type | Description                                 |
   * | ------ | --------- | ------------------------------------------- |
   * | `href` | String    | Url of the FeatureCardBlockLarge component. |
   *
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--static#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))])
  }).isRequired,

  /**
   * Contains source and alt text properties.
   * See [`<Image>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-image--default#props) for full usage details.
   */
  image: _propTypes.default.shape({
    classname: _propTypes.default.string,
    sources: _propTypes.default.arrayOf(_propTypes.default.shape({
      src: _propTypes.default.string,
      breakpoint: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
    })),
    defaultSrc: _propTypes.default.string.isRequired,
    alt: _propTypes.default.string.isRequired,
    longDescription: _propTypes.default.string
  }).isRequired
};
var _default = FeatureCardBlockLarge;
exports.default = _default;