"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ContentGroup = _interopRequireDefault(require("../../internal/components/ContentGroup/ContentGroup"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _PictogramItem = require("../PictogramItem");

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
 * Content group — with pictograms.
 */

var ContentGroupPictograms = function ContentGroupPictograms(_ref) {
  var heading = _ref.heading,
      items = _ref.items,
      className = _ref.className,
      copy = _ref.copy;
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group-pictograms"),
    className: (0, _classnames.default)(className, "".concat(prefix, "--content-group-pictograms"))
  }, _react.default.createElement(_ContentGroup.default, {
    heading: heading,
    copy: copy
  }, _renderItems(items)));
};
/**
 * Renders the array of items
 *
 * @param {Array} items Array of items for PictogramItem
 * @returns {*} PictogramItem JSX components
 */


var _renderItems = function _renderItems(items) {
  return items.map(function (item, index) {
    return _react.default.createElement(_PictogramItem.PictogramItem, (0, _extends2.default)({
      className: "".concat(prefix, "--content-group-pictograms__item"),
      "data-autoid": "".concat(prefix, "--content-group-pictograms__item")
    }, item, {
      key: index
    }));
  });
};

ContentGroupPictograms.propTypes = {
  /**
   * Main title of Content Group — with Pictograms pattern.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: _propTypes.default.string,

  /**
   * Array of PictogramItems.
   * See [`<PictogramItem>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-pictogramitem--default#props) for full usage details.
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    heading: _propTypes.default.string.isRequired,
    copy: _propTypes.default.string.isRequired,
    cta: _propTypes.default.shape({
      style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
      type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
      copy: _propTypes.default.string,
      href: _propTypes.default.string,
      customClassName: _propTypes.default.string
    }),
    pictogram: _propTypes.default.shape({
      src: _propTypes.default.object.isRequired
    }),
    className: _propTypes.default.string
  })).isRequired,

  /**
   * The CSS class name to apply to the top-level element.
   */
  className: _propTypes.default.string
};
var _default = ContentGroupPictograms;
exports.default = _default;