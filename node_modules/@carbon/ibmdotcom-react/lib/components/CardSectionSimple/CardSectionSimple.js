"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _CardGroup = require("../CardGroup");

var _classnames = _interopRequireDefault(require("classnames"));

var _ContentSection = _interopRequireDefault(require("../../internal/components/ContentSection/ContentSection"));

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
 * CardSectionSimple pattern it is Cards without images.
 */

var CardSectionSimple = function CardSectionSimple(_ref) {
  var cards = _ref.cards,
      cta = _ref.cta,
      theme = _ref.theme,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["cards", "cta", "theme"]);
  var cardsWithoutImages = cards.filter(function (_ref2) {
    var image = _ref2.image,
        heading = _ref2.heading,
        copy = _ref2.copy,
        href = _ref2.cta.href;
    return !image && heading && copy && href;
  });
  return _react.default.createElement(_ContentSection.default, {
    heading: otherProps.heading,
    autoid: "".concat(stablePrefix, "--card-group-simple-group"),
    customClassName: (0, _classnames.default)("".concat(prefix, "--card-group"), (0, _defineProperty2.default)({}, "".concat(prefix, "--card-group--").concat(theme), theme))
  }, _react.default.createElement(_CardGroup.CardGroup, {
    cards: cardsWithoutImages,
    cta: cta
  }));
};

CardSectionSimple.propTypes = {
  /**
   * Color theme for pattern. Choose from:
   *
   * | Name    | Data Type | Description                  |
   * | ------- | --------- | ---------------------------- |
   * | `white` | String    | Carbon White theme           |
   * | `g10`   | String    | Carbon Gray 10 (g10) theme   |
   * | `g90`   | String    | Carbon Gray 90 (g90) theme   |
   * | `g100`  | String    | Carbon Gray 100 (g100) theme |
   */
  theme: _propTypes.default.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Section heading.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Array of card data. Has the following structure for each items:
   *
   * | Name       | Required | Data Type | Description                            |
   * | ---------- | -------- | --------- | -------------------------------------- |
   * | `copy`     | YES      | String    | Copy of the card.                      |
   * | `heading`  | YES      | String    | Heading of the card.                   |
   * | `cta.href` | YES      | String    | URI for internal or external resource. |
   *
   * See example
   * [card data](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/CardGroup/__stories__/data/cards.json).
   */
  cards: _propTypes.default.arrayOf(_propTypes.default.exact({
    heading: _propTypes.default.string,
    copy: _propTypes.default.string,
    cta: _propTypes.default.shape({
      href: _propTypes.default.string
    })
  })).isRequired,

  /**
   * Optional CTA card for group. Always displays as last item.
   * See [`<CardGroup>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cardgroup--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    heading: _propTypes.default.string,
    cta: _propTypes.default.shape({
      href: _propTypes.default.string
    })
  })
};
var _default = CardSectionSimple;
exports.default = _default;