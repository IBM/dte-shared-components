/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Accordion from '../../internal/vendor/carbon-components-react/components/Accordion/Accordion';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import FooterNavGroup from './FooterNavGroup';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Footer nav component.
 */

var FooterNav = function FooterNav(_ref) {
  var groups = _ref.groups;

  if (!(groups === null || groups === void 0 ? void 0 : groups.length)) {
    return null;
  }

  return React.createElement("nav", {
    "data-autoid": "".concat(stablePrefix, "--footer-nav"),
    className: "".concat(prefix, "--footer-nav")
  }, React.createElement(Accordion, {
    className: "".concat(prefix, "--footer-nav__container")
  }, renderGroups(groups)));
};
/**
 * Loops through and renders a list of nav groups for the footer nav
 *
 * @param {Array} groups A list of groups to be rendered
 * @returns {object} JSX object
 */


function renderGroups(groups) {
  return groups.map(function (_ref2, index) {
    var title = _ref2.title,
        links = _ref2.links;
    return React.createElement(FooterNavGroup, {
      title: title,
      links: links,
      key: index
    });
  });
}

FooterNav.propTypes = {
  /**
   * A list of groups to be rendered.
   */
  groups: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string
    }))
  }))
};
FooterNav.defaultProps = {
  groups: null
};
export default FooterNav;