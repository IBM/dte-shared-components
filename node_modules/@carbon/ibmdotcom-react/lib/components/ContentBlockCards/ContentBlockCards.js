"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CardGroup = require("../CardGroup");

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

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
 * Content Block - Cards pattern.
 */

var ContentBlockCards = function ContentBlockCards(_ref) {
  var heading = _ref.heading,
      cards = _ref.cards,
      cta = _ref.cta;
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-cards"),
    className: "".concat(prefix, "--content-block-cards")
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    cta: cta
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-block-cards__content")
  }, _react.default.createElement(_CardGroup.CardGroup, {
    cards: cards
  }))));
};

ContentBlockCards.propTypes = {
  /**
   * Main title of ContentBlockCards pattern.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Array of card objects.
   * Uses a sub-scheme of `<Card>`'s props for each items, like below, depending on what type of card is used:
   *
   * Simple:
   *
   * | Name       | Required | Data Type | Description                            |
   * | ---------- | -------- | --------- | -------------------------------------- |
   * | `copy`     | YES      | String    | Copy of the card.                      |
   * | `heading`  | YES      | String    | Heading of the card.                   |
   * | `cta.href` | YES      | String    | URI for internal or external resource. |
   *
   * Image:
   *
   * | Name       | Required | Data Type | Description                              |
   * | ---------- | -------- | --------- | ---------------------------------------- |
   * | `image`    | YES      | Object    | Contains source and alt text properties. |
   * | `eyebrow`  | YES      | String    | Eyebrow of the card.                     |
   * | `heading`  | YES      | String    | Heading of the card.                     |
   * | `cta.href` | YES      | String    | URI for internal or external resource.   |
   *
   * See [`<CardGroup>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cardgroup--default#props) for full usage details.
   */
  cards: _propTypes.default.arrayOf(_propTypes.default.shape({
    heading: _propTypes.default.string,
    eyebrow: _propTypes.default.string,
    copy: _propTypes.default.string,
    image: _propTypes.default.shape({
      classname: _propTypes.default.string,
      sources: _propTypes.default.arrayOf(_propTypes.default.shape({
        src: _propTypes.default.string,
        breakpoint: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
      })),
      media: _propTypes.default.arrayOf(_propTypes.default.shape({
        src: _propTypes.default.string,
        type: _propTypes.default.string
      })),
      defaultSrc: _propTypes.default.string.isRequired,
      alt: _propTypes.default.string.isRequired,
      longDescription: _propTypes.default.string
    }),
    cta: _propTypes.default.shape({
      href: _propTypes.default.string
    })
  })).isRequired,

  /**
   * CTA used at the end of content body. `Card` style supported.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    style: _propTypes.default.oneOf(['card']),
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: _propTypes.default.string,
    customClassName: _propTypes.default.string
  })
};
var _default = ContentBlockCards;
exports.default = _default;