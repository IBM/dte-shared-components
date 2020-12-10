import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * MegaMenu panel
 */

var NavigationGroup = function NavigationGroup(_ref) {
  var hasHighlights = _ref.hasHighlights,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["hasHighlights", "children"]);

  return React.createElement("section", _extends({
    tabIndex: -1,
    className: classnames("".concat(prefix, "--masthead__megamenu"), _defineProperty({}, "".concat(prefix, "--masthead__megamenu__container--hasHighlights"), hasHighlights)),
    "data-autoid": "".concat(stablePrefix, "--masthead__megamenu")
  }, rest), React.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__container")
  }, React.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__container--row")
  }, children)));
};

NavigationGroup.propTypes = {
  /**
   * Determines whether to render the Highlight Section (Left Navigation)
   */
  hasHighlights: PropTypes.bool,

  /**
   * children elements
   */
  children: PropTypes.node
};
export default NavigationGroup;