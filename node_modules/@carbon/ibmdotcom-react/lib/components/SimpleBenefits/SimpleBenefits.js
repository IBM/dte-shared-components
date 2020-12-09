"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FeatureFlags = require("../../internal/FeatureFlags");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _featureflag = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/featureflag/featureflag"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _windowOrGlobal = _interopRequireDefault(require("window-or-global"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _SimpleBenefitsItem = _interopRequireDefault(require("./SimpleBenefitsItem"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * Simple benefits pattern.
 */

var SimpleBenefits = function SimpleBenefits(_ref) {
  var _classNames;

  var content = _ref.content,
      theme = _ref.theme,
      title = _ref.title;
  (0, _react.useEffect)(function () {
    /**
     * Function to be added to eventListener and cleaned later on
     */
    var resizeFunction = function resizeFunction() {
      setSameHeight(".".concat(prefix, "--simplebenefits__content-item__title"));
    };

    resizeFunction();

    _windowOrGlobal.default.addEventListener('resize', resizeFunction);

    return function () {
      return _windowOrGlobal.default.removeEventListener('resize', resizeFunction);
    };
  });
  /**
   * Set same height to elements
   *
   * @param {string} selector css selector of target elements
   */

  var setSameHeight = function setSameHeight(selector) {
    var elements = document.querySelectorAll(selector);
    var biggest = 0;
    elements.forEach(function (element) {
      element.style.height = "auto";
    });
    elements.forEach(function (element) {
      if (element.offsetHeight > biggest) {
        biggest = element.offsetHeight;
      }
    });
    elements.forEach(function (element) {
      element.style.height = "".concat(biggest, "px");
    });
  };

  var simpleBenefits = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefix, "--simplebenefits"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefix, "--simplebenefits--multirow"), content.length > 3), _classNames));
  return (0, _featureflag.default)(_FeatureFlags.DDS_SIMPLEBENEFITS, _react.default.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--simplebenefits"),
    className: "".concat(simpleBenefits, " ").concat(_setTheme(theme))
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__container")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__row")
  }, _react.default.createElement("h2", {
    className: "".concat(prefix, "--simplebenefits__title")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__title-container")
  }, title)), _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--simplebenefits__content"),
    className: "".concat(prefix, "--simplebenefits__content")
  }, _renderArray(content))))));
};
/**
 * Render the content in array list
 *
 * @private
 * @param {Array} content content object array
 * @returns {object} JSX Object
 */


var _renderArray = function _renderArray(content) {
  return content.map(function (contentItem, contentItemIndex) {
    return _react.default.createElement(_SimpleBenefitsItem.default, {
      key: contentItemIndex,
      title: contentItem.title,
      copy: contentItem.copy,
      link: contentItem.link
    });
  });
};
/**
 * sets the class name based on theme type
 *
 * @private
 * @param {string} theme theme type
 * @returns {string} theme css class names
 */


var _setTheme = function _setTheme(theme) {
  return theme && "".concat(prefix, "--simplebenefits--").concat(theme);
};

SimpleBenefits.propTypes = {
  /**
   * Array of content group objects. Has the following structure for each items:
   *
   * | Name    | Data Type | Description                                                  |
   * | ------- | --------- | ------------------------------------------------------------ |
   * | `title` | String    | Title of the Content Card item.                              |
   * | `copy`  | String    | Copy of the Content Card item.                               |
   * | `link`  | Object    | Object containing target and href of link. See `link` below. |
   *
   * `link`:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `href`   | String    | Url of link.                                               |
   * | `text`   | String    | Link text.                                                 |
   * | `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |
   */
  content: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    copy: _propTypes.default.string,
    link: _propTypes.default.shape({
      href: _propTypes.default.string,
      text: _propTypes.default.string,
      target: _propTypes.default.string
    })
  })),

  /**
   * Main title of the pattern.
   */
  title: _propTypes.default.string.isRequired
};
var _default = SimpleBenefits;
exports.default = _default;