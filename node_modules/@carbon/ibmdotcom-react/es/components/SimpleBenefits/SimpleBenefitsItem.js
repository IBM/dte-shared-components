/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Simple benefits item.
 */

var SimpleBenefitsItem = function SimpleBenefitsItem(_ref) {
  var title = _ref.title,
      copy = _ref.copy,
      link = _ref.link;
  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--simplebenefits__content-item"),
    className: "".concat(prefix, "--simplebenefits__content-item")
  }, React.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__content-item-container")
  }, React.createElement("h3", {
    className: "".concat(prefix, "--simplebenefits__content-item__title")
  }, title), React.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__content-item__divider")
  }), React.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__content-item__content")
  }, copy), link && React.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__content-item__link")
  }, React.createElement(LinkWithIcon, {
    href: link.href,
    target: link.target
  }, React.createElement("span", null, link.text), React.createElement(ArrowRight20, null)))));
};

SimpleBenefitsItem.propTypes = {
  /**
   * Simple long form title
   */
  title: PropTypes.string,

  /**
   * Simple long form copy.
   */
  copy: PropTypes.string,

  /**
   * Link object which includes url, link text and target properties.
   */
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string
  })
};
export default SimpleBenefitsItem;