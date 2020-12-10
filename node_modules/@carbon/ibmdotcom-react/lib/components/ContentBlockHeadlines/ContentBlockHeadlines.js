"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _CTA = require("../CTA");

var _FeatureFlags = require("../../internal/FeatureFlags");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _featureflag = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/featureflag/featureflag"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _windowOrGlobal = _interopRequireDefault(require("window-or-global"));

var _sameHeight = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/sameHeight/sameHeight"));

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
 * ContentBlockHeadlines pattern
 */

var ContentBlockHeadlines = function ContentBlockHeadlines(_ref) {
  var heading = _ref.heading,
      copy = _ref.copy,
      items = _ref.items;
  var containerRef = (0, _react.useRef)();
  var contentRows = chunk(items, 2);
  (0, _react.useEffect)(function () {
    setSameHeight();

    _windowOrGlobal.default.addEventListener('resize', setSameHeight);

    return function () {
      return _windowOrGlobal.default.removeEventListener('resize', setSameHeight);
    };
  }, []);
  /**
   * Function that activates the sameHeight utility
   */

  var setSameHeight = function setSameHeight() {
    _windowOrGlobal.default.requestAnimationFrame(function () {
      var containerNode = containerRef.current;

      if (containerNode) {
        (0, _sameHeight.default)(containerNode.getElementsByClassName("".concat(prefix, "--content-block-headlines__copy")), 'md');
      }
    });
  };

  return (0, _featureflag.default)(_FeatureFlags.DDS_CONTENTBLOCK_HEADLINES, _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-headlines"),
    className: "".concat(prefix, "--content-block-headlines"),
    ref: containerRef
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    copy: copy,
    border: true
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-block-headlines__container")
  }, _renderRows(contentRows)))));
};
/**
 * Renders the ContentBlockHeadlines items
 *
 * @param {Array} contentRows array of content rows
 * @private
 * @returns {*} JSX component
 */


var _renderRows = function _renderRows(contentRows) {
  return contentRows.map(function (row, index) {
    return _react.default.createElement("div", {
      className: "".concat(prefix, "--content-block-headlines__row"),
      key: index
    }, _react.default.createElement("div", {
      className: "".concat(prefix, "--content-block-headlines__item-container")
    }, row.map(function (item, index) {
      return _react.default.createElement("div", {
        className: "".concat(prefix, "--content-block-headlines__item"),
        key: index
      }, _react.default.createElement("h4", {
        className: "".concat(prefix, "--content-block-headlines__headline")
      }, item.headline), _react.default.createElement("p", {
        className: "".concat(prefix, "--content-block-headlines__copy")
      }, item.copy), item.cta && _react.default.createElement(_CTA.CTA, item.cta));
    })));
  });
};
/**
 * Break out items per row
 *
 * @param {Array} array of items
 * @param {number} size number of items per row
 * @private
 * @returns {Array} array of rows
 */


function chunk(array, size) {
  return array.reduce(function (chunks, item, i) {
    if (i % size === 0) {
      chunks.push([item]);
    } else {
      chunks[chunks.length - 1].push(item);
    }

    return chunks;
  }, []);
}

ContentBlockHeadlines.propTypes = {
  /**
   * Heading of the content block.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Intro copy of the content block.
   */
  copy: _propTypes.default.string.isRequired,

  /**
   * Array of content items.
   * See [CTA](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#text-link) for full usage details.
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    headline: _propTypes.default.string.isRequired,
    copy: _propTypes.default.string.isRequired,
    cta: _propTypes.default.shape({
      type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['local', 'download', 'jump', 'external', 'video', 'default']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['local', 'download', 'jump', 'external', 'video', 'default']))]),
      copy: _propTypes.default.string,
      href: _propTypes.default.string,
      customClassName: _propTypes.default.string
    })
  })).isRequired
};
var _default = ContentBlockHeadlines;
exports.default = _default;