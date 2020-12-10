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
 * Category sublink
 */

var CategoryLink = function CategoryLink(_ref) {
  var href = _ref.href,
      title = _ref.title,
      rest = _objectWithoutProperties(_ref, ["href", "title"]);

  return React.createElement("a", {
    tabIndex: 0,
    href: href,
    className: "".concat(prefix, "--masthead__megamenu__category-sublink"),
    "data-autoid": "".concat(rest.autoid, "-item").concat(rest.index)
  }, title);
};

CategoryLink.propTypes = {
  /**
   * Category sublink href
   */
  href: PropTypes.string.isRequired,

  /**
   * Category sublink text
   */
  title: PropTypes.string.isRequired
};
export default CategoryLink;