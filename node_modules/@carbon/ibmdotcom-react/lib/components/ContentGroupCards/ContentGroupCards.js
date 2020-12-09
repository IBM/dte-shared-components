"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/arrow--right/20"));

var _Card = require("../Card");

var _ContentGroup = _interopRequireDefault(require("../../internal/components/ContentGroup/ContentGroup"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _sameHeight = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/sameHeight/sameHeight"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var prefix = _settings2.default.prefix;
var stablePrefix = _settings.default.stablePrefix;
/**
 * Card Array Component.
 */

var ContentGroupCards = function ContentGroupCards(_ref) {
  var heading = _ref.heading,
      items = _ref.items,
      copy = _ref.copy;
  var containerRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    setSameHeight();
    window.addEventListener('resize', setSameHeight);
    return function () {
      return window.removeEventListener('resize', setSameHeight);
    };
  }, []);
  /**
   * Function that activates the sameHeight utility
   */

  var setSameHeight = function setSameHeight() {
    window.requestAnimationFrame(function () {
      var containerNode = containerRef.current;

      if (containerNode) {
        (0, _sameHeight.default)(containerNode.getElementsByClassName("".concat(prefix, "--card__heading")), 'md');
        (0, _sameHeight.default)(containerNode.getElementsByClassName("".concat(prefix, "--card__copy")), 'md');
      }
    });
  };

  return _react.default.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--content-group-cards"),
    className: "".concat(prefix, "--content-group-cards")
  }, _react.default.createElement(_ContentGroup.default, {
    heading: heading,
    copy: copy
  }, _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group-cards-group"),
    ref: containerRef,
    className: "".concat(prefix, "--content-group-cards-group ").concat(prefix, "--grid--condensed")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-group-cards__row")
  }, _renderCards(items)))));
};
/**
 * Renders the cards based on the ContentArray entries
 *
 * @param {Array} items Content object array
 * @returns {*} CardArrayItem JSX objects
 */


var _renderCards = function _renderCards(items) {
  return items.map(function (elem, index) {
    return _react.default.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-group-cards-item"),
      className: "".concat(prefix, "--content-group-cards-item__col"),
      key: index,
      role: "region"
    }, _react.default.createElement(_Card.Card, {
      customClassName: "".concat(prefix, "--content-group-cards-item"),
      heading: elem.heading,
      copy: elem.copy,
      cta: {
        href: elem.cta.href,
        icon: {
          src: _.default
        }
      },
      "aria-label": elem.heading
    }));
  });
};

ContentGroupCards.propTypes = {
  /**
   * Main heading of the pattern.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: _propTypes.default.string,

  /**
   * Array of content group objects. Has the following structure:
   *
   * | Name      | Data Type | Description                                                |
   * | --------- | --------- | ---------------------------------------------------------- |
   * | `heading` | String    | Title for the Card.                                        |
   * | `copy`    | String    | Copy for the Card.                                         |
   * | `cta`     | Object    | Object containing target and href of cta. See `cta` below. |
   *
   * `cta`:
   *
   * | Name   | Data Type | Description                       |
   * | ------ | --------- | --------------------------------- |
   * | `href` | String    | Url of the Content Card item cta. |
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    copy: _propTypes.default.string,
    cta: _propTypes.default.shape({
      href: _propTypes.default.string
    })
  }))
};
var _default = ContentGroupCards;
exports.default = _default;