import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ArrowRight16 from '@carbon/icons-react/es/arrow--right/16';
import LinkWithIcon from '../../LinkWithIcon/LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var prefix = settings.prefix;
/**
 * Right/Main Panel Navigation of MegaMenu
 */

var RightNavigation = function RightNavigation(_ref) {
  var children = _ref.children,
      viewAllLinkHref = _ref.viewAllLinkHref,
      viewAllLinkTitle = _ref.viewAllLinkTitle,
      rest = _objectWithoutProperties(_ref, ["children", "viewAllLinkHref", "viewAllLinkTitle"]);

  return React.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__categories-section")
  }, React.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__categories")
  }, children), viewAllLinkHref && React.createElement(LinkWithIcon, {
    className: "".concat(prefix, "--masthead__megamenu__view-all-cta"),
    "data-autoid": "".concat(rest.autoid, "-view-all"),
    href: viewAllLinkHref
  }, React.createElement("span", null, viewAllLinkTitle), React.createElement(ArrowRight16, null)));
};

RightNavigation.propTypes = {
  /**
   * Category Groups to be rendered in the Left Navigation Section
   */
  children: PropTypes.node.isRequired,

  /**
   * Megamenu view all cta url
   */
  viewAllLinkHref: PropTypes.string,

  /**
   * Megamenu view all cta title
   */
  viewAllLinkTitle: PropTypes.string
};
export default RightNavigation;