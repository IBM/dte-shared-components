"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _FeatureCard = require("../FeatureCard");

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

var FeatureCardBlockMedium = function FeatureCardBlockMedium(_ref) {
  var heading = _ref.heading,
      card = _ref.card,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["heading", "card"]);
  return heading && card.cta && _react.default.createElement("section", {
    className: "".concat(prefix, "--feature-card-block-medium"),
    "data-autoid": "".concat(stablePrefix, "--feature-card-block-medium")
  }, _react.default.createElement("h3", {
    className: "".concat(prefix, "--feature-card-block-medium__heading")
  }, heading), _react.default.createElement(_FeatureCard.FeatureCard, (0, _extends2.default)({
    card: card
  }, otherProps)));
};

FeatureCardBlockMedium.propTypes = {
  /**
   * Main title of the pattern.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Object containing Feature Card details. Has the following structure in summary:
   *
   * | Name      | Data Type | Description                                                                                                                                                                        |
   * | --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | String    | Title of the Card item.                                                                                                                                                            |
   * | `image`   | Object    | Image object used in the FeatureCard component. See [`<Image>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-image--default#props) for full usage details. |
   * | `cta`     | Object    | Object containing target and href of link. See `cta` below.                                                                                                                        |
   *
   * `cta`:
   *
   * | Name   | Data Type | Description                       |
   * | ------ | --------- | --------------------------------- |
   * | `href` | String    | Url of the FeatureCard component. |
   *
   * See [`<FeatureCard>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-blocks-featurecard--default#props) for full usage details.
   */
  card: _propTypes.default.shape({
    heading: _propTypes.default.string,
    eyebrow: _propTypes.default.string,
    copy: _propTypes.default.string,
    cta: _propTypes.default.shape({
      copy: _propTypes.default.string,
      href: _propTypes.default.string,
      type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))])
    }).isRequired,
    image: _propTypes.default.shape({
      classname: _propTypes.default.string,
      sources: _propTypes.default.arrayOf(_propTypes.default.shape({
        src: _propTypes.default.string,
        breakpoint: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
      })),
      defaultSrc: _propTypes.default.string.isRequired,
      alt: _propTypes.default.string.isRequired,
      longDescription: _propTypes.default.string
    }),
    inverse: _propTypes.default.bool,
    customClassName: _propTypes.default.string,
    type: _propTypes.default.oneOf(['link'])
  }).isRequired
};
var _default = FeatureCardBlockMedium;
exports.default = _default;