"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _CTA = require("../CTA");

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
 * LinkList Component, for use with items array
 *
 * @param {object} props props object
 * @param {string} props.heading  Heading string
 * @param {Array} props.items array of item
 * @returns {*} JSX LinkList component
 */

var LinkList = function LinkList(_ref) {
  var heading = _ref.heading,
      iconPlacement = _ref.iconPlacement,
      items = _ref.items,
      style = _ref.style;
  var linkStyle = style === 'card' ? 'card' : 'text';
  return _react.default.createElement("div", {
    className: "".concat(prefix, "--link-list"),
    "data-autoid": "".concat(stablePrefix, "--link-list")
  }, _react.default.createElement("h4", {
    className: "".concat(prefix, "--link-list__heading")
  }, heading), _react.default.createElement("ul", {
    className: "".concat(prefix, "--link-list__list ").concat(prefix, "--link-list__list--").concat(style)
  }, items.map(function (cta, index) {
    return _react.default.createElement("li", {
      className: "".concat(prefix, "--link-list__list__CTA ").concat(prefix, "--link-list__list--").concat(cta.type),
      key: index
    }, _react.default.createElement(_CTA.CTA, (0, _extends2.default)({
      style: linkStyle
    }, cta, {
      disableImage: true
    }, iconPlacement && linkStyle === 'text' && {
      iconPlacement: iconPlacement
    })));
  })));
};

LinkList.propTypes = {
  /**
   * Describes heading of LinkList.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Describes the list of CTA.
   * The summary of the structure of each items are:
   *
   * | Name      | Description                                                                             |
   * | --------- | --------------------------------------------------------------------------------------- |
   * | `heading` | Describing the resource with added detail.                                              |
   * | `type`    | Describes after onClick where to load. It has `external`, `local`, and `video` options. |
   *
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    customClassName: _propTypes.default.string
  })).isRequired,

  /**
   * Icon placement.
   */
  iconPlacement: _propTypes.default.oneOf(['left', 'right']),

  /**
   * Orientation of LinkList.
   */
  style: _propTypes.default.oneOf(['card', 'horizontal', 'vertical', 'vertical-end']).isRequired
};
var _default = LinkList;
exports.default = _default;