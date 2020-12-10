"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames3 = _interopRequireDefault(require("classnames"));

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
 * Layout types
 *
 * @type {{'1-3': string[]}}
 * @private
 */

var _types = {
  '1-3': ["".concat(prefix, "--col-lg-4"), "".concat(prefix, "--col-lg-12")],
  // 1/4 - 3/4
  '2-1': ["".concat(prefix, "--layout-2-3"), "".concat(prefix, "--layout-1-3")] // 2/3 - 1/3

};
/**
 * Returns the child classes with the proper column class names
 *
 * @param {string} type layout type
 * @param {number} stickyOffset Sticky offset amount (in pixels)
 * @param {object} children child nodes
 * @returns {*} modified child content
 * @private
 */

function _updateChild(type, stickyOffset, children) {
  var final = [];
  children.map(function (child, i) {
    if (child.props['data-sticky'] === 'true') {
      final.push(_react.default.createElement("div", {
        className: (0, _classnames3.default)(_types[type] && _types[type][i] ? "".concat(_types[type][i], " ").concat(prefix, "--layout--sticky-mobile") : "".concat(prefix, "--col")),
        key: i,
        style: {
          top: stickyOffset ? "".concat(stickyOffset, "px") : 0
        }
      }, _react.default.cloneElement(child, {
        className: (0, _classnames3.default)(child.props.className, "".concat(prefix, "--layout--sticky-desktop")),
        style: {
          top: stickyOffset ? "".concat(stickyOffset, "px") : 0
        }
      })));
    } else {
      final.push(_react.default.cloneElement(child, {
        className: (0, _classnames3.default)(child.props.className, _types[type] && _types[type][i] ? _types[type][i] : "".concat(prefix, "--col")),
        key: i
      }));
    }
  });
  return final;
}
/**
 * Returns the spacing modifier class
 *
 * @param {string} position top or bottom position of the layout
 * @param {string} modifier layout modifier from the layout scale
 * @returns {*|string} spacing class
 * @private
 */


function _spacingClass(position, modifier) {
  return modifier && "".concat(prefix, "--layout--").concat(position, "-").concat(modifier);
}
/**
 * Layout component
 * This is an abstract layout component that can be reutilized for multiple
 * patterns. This autocreates the proper grid classes, along with the optional
 * sticky attribute to the child elements (columns).
 */


var Layout = function Layout(_ref) {
  var _classnames;

  var type = _ref.type,
      marginTop = _ref.marginTop,
      marginBottom = _ref.marginBottom,
      stickyOffset = _ref.stickyOffset,
      border = _ref.border,
      nested = _ref.nested,
      children = _ref.children;
  return _react.default.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--layout"),
    className: (0, _classnames3.default)(nested ? "" : "".concat(prefix, "--grid"), (_classnames = {}, (0, _defineProperty2.default)(_classnames, _spacingClass('top', marginTop), marginTop), (0, _defineProperty2.default)(_classnames, _spacingClass('bottom', marginBottom), marginBottom), _classnames))
  }, _react.default.createElement("div", {
    className: (0, _classnames3.default)("".concat(prefix, "--row"), (0, _defineProperty2.default)({}, "".concat(prefix, "--layout--border"), border))
  }, _updateChild(type, stickyOffset, children)));
};

Layout.propTypes = {
  /**
   * Layout type. Choose from:
   *
   * | Name  | Description             |
   * | ----- | ----------------------- |
   * | `1-3` | 1/4 - 3/4 column layout |
   * | `2-1` | 2/3 - 1/3 column layout |
   */
  type: _propTypes.default.oneOf(['1-3', '2-1']).isRequired,

  /**
   * Top Margin value for Layout. Choose from:
   *
   * | Name                    | Description                            |
   * | ----------------------- | -------------------------------------- |
   * | `layout-01 - layout-07` | Layout token values for the top margin |
   */
  marginTop: _propTypes.default.oneOf(['layout-01', 'layout-02', 'layout-03', 'layout-04', 'layout-05', 'layout-06', 'layout-07']),

  /**
   * Bottom Margin value for Layout. Choose from:
   *
   * | Name                    | Description                               |
   * | ----------------------- | ----------------------------------------- |
   * | `layout-01 - layout-07` | Layout token values for the bottom margin |
   */
  marginBottom: _propTypes.default.oneOf(['layout-01', 'layout-02', 'layout-03', 'layout-04', 'layout-05', 'layout-06', 'layout-07']),

  /**
   * Component/Element to render within `<Layout>`.
   */
  children: _propTypes.default.node,

  /**
   * Defines the offset for the sticky column(s).
   */
  stickyOffset: _propTypes.default.number,

  /**
   * `true` to use the optional border at the bottom of pattern.
   */
  border: _propTypes.default.bool,

  /**
   * `true` to make the pattern fits inside a grid.
   */
  nested: _propTypes.default.bool
};
Layout.defaultProps = {
  marginTop: null,
  marginBottom: null,
  stickyOffset: null,
  border: false,
  nested: false
};
var _default = Layout;
exports.default = _default;