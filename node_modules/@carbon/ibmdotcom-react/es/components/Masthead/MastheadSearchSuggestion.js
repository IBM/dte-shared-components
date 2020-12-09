import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * The rendered suggestion in the suggestion list.
 */

var MastheadSearchSuggestion = function MastheadSearchSuggestion(_ref) {
  var suggestion = _ref.suggestion,
      query = _ref.query,
      isHighlighted = _ref.isHighlighted,
      getSuggestionValue = _ref.getSuggestionValue;
  var suggestionValue = getSuggestionValue(suggestion);
  var matches = match(suggestionValue, query);
  var parts = parse(suggestionValue, matches);
  return React.createElement("div", {
    className: classNames("".concat(prefix, "--container-class"), _defineProperty({}, "".concat(prefix, "--container-highlight-class"), isHighlighted)),
    tabIndex: "-1",
    "data-autoid": "".concat(stablePrefix, "--masthead__searchresults--suggestion")
  }, parts.map(function (part, index) {
    return React.createElement("span", {
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
  suggestion: PropTypes.arrayOf(PropTypes.string),

  /**
   * The query being searched for.
   */
  query: PropTypes.string,

  /**
   * `true` to make the suggestion currently highlighted by the user.
   */
  isHighlighted: PropTypes.bool,

  /**
   * A funciton ot get the suggestion value.
   */
  getSuggestionValue: PropTypes.func
};
MastheadSearchSuggestion.defaultProps = {
  suggestion: [],
  query: '',
  isHighlighted: false,
  getSuggestionValue: function getSuggestionValue() {}
};
export default MastheadSearchSuggestion;