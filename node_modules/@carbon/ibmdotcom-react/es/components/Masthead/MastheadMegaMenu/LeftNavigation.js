import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var prefix = settings.prefix;
/**
 * Left Navigation Section of MegaMenu
 */

var LeftNavigation = function LeftNavigation(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement("div", _extends({
    className: "".concat(prefix, "--masthead__megamenu__highlight-section")
  }, props), children);
};

LeftNavigation.propTypes = {
  /**
   * Category Groups to be rendered in the Left Navigation Section
   */
  children: PropTypes.node.isRequired
};
export default LeftNavigation;