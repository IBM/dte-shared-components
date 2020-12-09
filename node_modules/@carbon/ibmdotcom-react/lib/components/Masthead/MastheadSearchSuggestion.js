"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _match = _interopRequireDefault(require("autosuggest-highlight/match"));

var _parse = _interopRequireDefault(require("autosuggest-highlight/parse"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * The rendered suggestion in the suggestion list.
 */

var MastheadSearchSuggestion = function MastheadSearchSuggestion(_ref) {
  var suggestion = _ref.suggestion,
      query = _ref.query,
      isHighlighted = _ref.isHighlighted,
      getSuggestionValue = _ref.getSuggestionValue;
  var suggestionValue = getSuggestionValue(suggestion);
  var matches = (0, _match.default)(suggestionValue, query);
  var parts = (0, _parse.default)(suggestionValue, matches);
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefix, "--container-class"), (0, _defineProperty2.default)({}, "".concat(prefix, "--container-highlight-class"), isHighlighted)),
    tabIndex: "-1",
    "data-autoid": "".concat(stablePrefix, "--masthead__searchresults--suggestion")
  }, parts.map(function (part, index) {
    return _react.default.createElement("span", {
      key: index,
      style: {
        fontWeight: part.highlight ? 600 : 400 // TODO: switch to final styles

      }
    }, part.text.replace(' ', "\xA0"));
  }));
};

MastheadSearchSuggestion.propTypes = {
  /**
   * The individual object from the data.
   */
  suggestion: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * The query being searched for.
   */
  query: _propTypes.default.string,

  /**
   * `true` to make the suggestion currently highlighted by the user.
   */
  isHighlighted: _propTypes.default.bool,

  /**
   * A funciton ot get the suggestion value.
   */
  getSuggestionValue: _propTypes.default.func
};
MastheadSearchSuggestion.defaultProps = {
  suggestion: [],
  query: '',
  isHighlighted: false,
  getSuggestionValue: function getSuggestionValue() {}
};
var _default = MastheadSearchSuggestion;
exports.default = _default;