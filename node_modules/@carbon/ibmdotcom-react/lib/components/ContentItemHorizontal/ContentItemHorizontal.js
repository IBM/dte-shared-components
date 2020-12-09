"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _LinkList = require("../LinkList");

var _markdownToHtml = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/markdownToHtml/markdownToHtml"));

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
 * ContentItemHorizontal Pattern
 *
 * @param {object} props props object
 * @param {string} props.eyebrow eyebrow text
 * @param {string} props.heading heading text
 * @param {string} props.copy copy text
 * @param {Array} props.cta cta array
 *
 * @returns {*} JSX ContentItemHorizontal pattern
 */

var ContentItemHorizontal = function ContentItemHorizontal(_ref) {
  var eyebrow = _ref.eyebrow,
      heading = _ref.heading,
      copy = _ref.copy,
      cta = _ref.cta;
  return _react.default.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__item "),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__row")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__col")
  }, eyebrow && _react.default.createElement("p", {
    className: "".concat(prefix, "--content-item-horizontal__item--eyebrow"),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item--eyebrow")
  }, eyebrow), _react.default.createElement("h3", {
    className: "".concat(prefix, "--content-item-horizontal__item--heading"),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item--heading")
  }, heading)), _react.default.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__col")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__item--copy"),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item--copy"),
    dangerouslySetInnerHTML: {
      __html: (0, _markdownToHtml.default)(copy, {
        bold: false
      })
    }
  }), cta && _react.default.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__item--cta"),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item--cta")
  }, _react.default.createElement(_LinkList.LinkList, (0, _extends2.default)({
    style: "vertical"
  }, cta))))));
};

ContentItemHorizontal.propTypes = {
  /**
   * Optional text displayed above the heading.
   */
  eyebrow: _propTypes.default.string,

  /**
   * Heading of the content item.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Copy of the content item. Accepts _italic_ markdown formatting.
   */
  copy: _propTypes.default.string.isRequired,

  /**
   * Optional CTA links displayed below the copy.
   * Each item has the following structure:
   *
   * | Name   | Required | Data Type | Description                                |
   * | ------ | -------- | --------- | ------------------------------------------ |
   * | `type` | YES      | Object    | Link type. Accepts `local` and `external`. |
   * | `copy` | YES      | String    | Link text.                                 |
   * | `href` | YES      | String    | URI for internal or external resource.     |
   */
  cta: _propTypes.default.shape({
    heading: _propTypes.default.string,
    items: _propTypes.default.arrayOf(_propTypes.default.shape({
      type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['local', 'external']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['local', 'external']))]),
      copy: _propTypes.default.string,
      href: _propTypes.default.string,
      customClassName: _propTypes.default.string
    })).isRequired,
    iconPlacement: _propTypes.default.oneOf(['left', 'right'])
  })
};
var _default = ContentItemHorizontal;
exports.default = _default;