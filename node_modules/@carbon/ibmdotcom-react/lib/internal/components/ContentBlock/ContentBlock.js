"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _CTA = require("../../../components/CTA");

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _HorizontalRule = require("../../../components/HorizontalRule");

var _Layout = require("../../../components/Layout");

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
 * ContentBlock internal component
 */

var ContentBlock = function ContentBlock(_ref) {
  var heading = _ref.heading,
      copy = _ref.copy,
      children = _ref.children,
      customClassName = _ref.customClassName,
      cta = _ref.cta,
      aside = _ref.aside,
      border = _ref.border;
  var classnames = (0, _classnames.default)("".concat(prefix, "--content-block"), customClassName);
  var setborder = aside ? false : border;

  var content = _react.default.createElement(_react.default.Fragment, null, copy && _react.default.createElement("div", {
    className: "".concat(prefix, "--content-block__copy"),
    dangerouslySetInnerHTML: {
      __html: (0, _markdownToHtml.default)(copy, {
        bold: false
      })
    }
  }), _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block__children"),
    className: "".concat(prefix, "--content-block__children")
  }, children), cta && _renderCTA(cta));

  var title = _react.default.createElement("div", null, heading && _react.default.createElement("h2", {
    "data-autoid": "".concat(stablePrefix, "--content-block__heading"),
    className: "".concat(prefix, "--content-block__heading")
  }, heading));

  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block"),
    className: classnames
  }, aside && aside.items ? _layoutWrap(_react.default.createElement(_react.default.Fragment, null, title, _react.default.createElement("div", null))) : title, aside && aside.items ? _layoutWrap(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, content), _react.default.createElement("aside", null, aside.items)), aside.border) : content, setborder ? _react.default.createElement(_HorizontalRule.HorizontalRule, null) : '');
};
/**
 * wraps content in layout component
 *
 * @private
 * @param {Element} content content elements
 * @param {boolean} border set border or not
 * @returns {*} jsx cta component
 */


var _layoutWrap = function _layoutWrap(content, border) {
  return _react.default.createElement(_Layout.Layout, {
    type: "2-1",
    nested: true,
    border: border
  }, content.props.children);
};
/**
 * sets the class name based on theme type
 *
 * @private
 * @param {object} cta a cta object
 * @returns {*} jsx cta component
 */


function _renderCTA(cta) {
  if (cta.style === 'feature') {
    return _react.default.createElement(_CTA.CTA, (0, _extends2.default)({
      customClassName: (0, _classnames.default)("".concat(prefix, "--content-block__cta"))
    }, cta));
  }

  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block__cta"),
    className: "".concat(prefix, "--content-block__cta-row")
  }, _react.default.createElement(_CTA.CTA, (0, _extends2.default)({
    customClassName: "".concat(prefix, "--content-block__cta ").concat(prefix, "--content-block__cta-col")
  }, cta)));
}

ContentBlock.propTypes = {
  /**
   * Heading text.
   */
  heading: _propTypes.default.string,

  /**
   * Copy text.
   */
  copy: _propTypes.default.string,

  /**
   * Children elements passed into `ContentBlock` to be rendered.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),

  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    customClassName: _propTypes.default.string
  }),

  /**
   * Custom className to wrap the `<ContentBlock>` component.
   */
  customClassName: _propTypes.default.string,

  /**
   * Object containing elements to be rendered within `<aside>` html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: _propTypes.default.shape({
    items: _propTypes.default.element,
    border: _propTypes.default.bool
  }),

  /**
   * border for content block.
   */
  border: _propTypes.default.bool
};
ContentBlock.defaultProps = {
  border: false
};
var _default = ContentBlock;
exports.default = _default;