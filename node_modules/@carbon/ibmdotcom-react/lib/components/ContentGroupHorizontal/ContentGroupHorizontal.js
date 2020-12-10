"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _ContentItemHorizontal = require("../ContentItemHorizontal");

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
 * ContentGroupHorizontal pattern.
 */

var ContentGroupHorizontal = function ContentGroupHorizontal(_ref) {
  var heading = _ref.heading,
      items = _ref.items;
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group-horizontal"),
    className: "".concat(prefix, "--content-group-horizontal")
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    border: true
  }, items.map(function (item, index) {
    return _react.default.createElement(_ContentItemHorizontal.ContentItemHorizontal, {
      eyebrow: item.eyebrow,
      heading: item.heading,
      copy: item.copy,
      cta: item.cta,
      key: index
    });
  })));
};

ContentGroupHorizontal.propTypes = {
  /**
   * Heading of the content group.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Array of content items.
   * See [`<ContentItemHorizontal>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-contentitemhorizontal--default#props) for full usage details.
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    eyebrow: _propTypes.default.string,
    heading: _propTypes.default.string.isRequired,
    copy: _propTypes.default.string.isRequired,
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
  })).isRequired
};
var _default = ContentGroupHorizontal;
exports.default = _default;