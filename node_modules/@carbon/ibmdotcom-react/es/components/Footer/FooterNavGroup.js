/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import AccordionItem from '../../internal/vendor/carbon-components-react/components/Accordion/AccordionItem';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Footer nav group component.
 */

var FooterNavGroup = function FooterNavGroup(_ref) {
  var title = _ref.title,
      links = _ref.links;

  if (!title || !(links === null || links === void 0 ? void 0 : links.length)) {
    return null;
  }

  return React.createElement(AccordionItem, {
    "data-autoid": "".concat(stablePrefix, "--footer-nav-group"),
    title: title,
    className: "".concat(prefix, "--footer-nav-group")
  }, React.createElement("h2", {
    className: "".concat(prefix, "--footer-nav-group__title")
  }, title), React.createElement("ul", null, renderListItems(links)));
};
/**
 * Loops through and renders a list of links for footer nav group
 *
 * @param {Array} links A list of links to be rendered
 * @returns {object} JSX object
 */


function renderListItems(links) {
  return links.map(function (_ref2, index) {
    var title = _ref2.title,
        url = _ref2.url;

    if (!title || !url) {
      return null;
    }

    return React.createElement("li", {
      className: "".concat(prefix, "--footer-nav-group__item"),
      key: index
    }, React.createElement(Link, {
      className: "".concat(prefix, "--footer-nav-group__link ").concat(prefix, "--footer__link"),
      "data-autoid": "".concat(stablePrefix, "--footer-nav-group__link"),
      href: url
    }, title));
  });
}

FooterNavGroup.propTypes = {
  /**
   * The title.
   */
  title: PropTypes.string,

  /**
   * A list of links to be rendered.
   */
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
  }))
};
FooterNavGroup.defaultProps = {
  title: null,
  links: null
};
export default FooterNavGroup;