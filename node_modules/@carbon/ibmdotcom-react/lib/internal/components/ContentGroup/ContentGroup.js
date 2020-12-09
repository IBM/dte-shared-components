"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CTA = require("../../../components/CTA");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

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
 * ContentArrayGroup Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {*} props.children JSX Components
 * @param {string} props.heading  Heading string
 * @param {string} props.className optional class to be applied to the containing node
 * @param {*} props.cta CTA component props object
 * @returns {*} JSX ContentGroup component
 */

var ContentGroup = function ContentGroup(_ref) {
  var children = _ref.children,
      heading = _ref.heading,
      customClassName = _ref.customClassName,
      cta = _ref.cta,
      copy = _ref.copy;
  var className = (0, _classnames.default)("".concat(prefix, "--content-group"), customClassName);
  return _react.default.createElement("div", {
    className: className,
    "data-autoid": "".concat(stablePrefix, "--content-group")
  }, _react.default.createElement("h3", {
    "data-autoid": "".concat(stablePrefix, "--content-group__title"),
    className: "".concat(prefix, "--content-group__title")
  }, heading), copy && _react.default.createElement("div", {
    className: "".concat(prefix, "--content-group__copy"),
    dangerouslySetInnerHTML: {
      __html: (0, _markdownToHtml.default)(copy, {
        bold: false
      })
    }
  }), _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group__children"),
    className: (0, _classnames.default)("".concat(prefix, "--content-group__col"), "".concat(prefix, "--content-group__children"))
  }, children), cta && _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group__cta"),
    className: "".concat(prefix, "--content-group__cta-row")
  }, _react.default.createElement(_CTA.CTA, (0, _extends2.default)({
    customClassName: "".concat(prefix, "--content-group__cta"),
    style: "card"
  }, cta))));
};

ContentGroup.propTypes = {
  /**
   * Heading text.
   */
  heading: _propTypes.default.string,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: _propTypes.default.string,

  /**
   * Container for other components.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),

  /**
   * Class to be applied to the containing node.
   */
  customClassName: _propTypes.default.string,

  /**
   * CTA. Allowed style is `card` and type is `local`.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    type: _propTypes.default.oneOf(['local']),
    copy: _propTypes.default.string,
    customClassName: _propTypes.default.string
  })
};
var _default = ContentGroup;
exports.default = _default;