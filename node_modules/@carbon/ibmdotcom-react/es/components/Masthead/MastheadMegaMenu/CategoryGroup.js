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
 * Category Group of the MegaMenu
 * contains the category headline and sublinks
 */

var CategoryGroup = function CategoryGroup(_ref) {
  var href = _ref.href,
      title = _ref.title,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["href", "title", "children"]);

  return React.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__category-group")
  }, href ? React.createElement(LinkWithIcon, {
    href: href,
    className: "".concat(prefix, "--masthead__megamenu__category-headline"),
    "data-autoid": "".concat(rest.autoid, "-list").concat(rest.index)
  }, React.createElement("span", null, title), React.createElement(ArrowRight16, null)) : React.createElement("div", {
    className: "".concat(prefix, "--masthead__megamenu__category-headline"),
    "data-autoid": "".concat(rest.autoid, "-list").concat(rest.index)
  }, React.createElement("p", null, title)), children);
};

CategoryGroup.propTypes = {
  /**
   * Category Groups sublinks
   */
  children: PropTypes.node,

  /**
   * url of the Category Group headline
   */
  href: PropTypes.string,

  /**
   * Category Group headline title
   */
  title: PropTypes.string.isRequired
};
export default CategoryGroup;