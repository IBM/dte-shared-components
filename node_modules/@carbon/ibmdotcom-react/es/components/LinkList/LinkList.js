import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CTA } from '../CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * LinkList Component, for use with items array
 *
 * @param {object} props props object
 * @param {string} props.heading  Heading string
 * @param {Array} props.items array of item
 * @returns {*} JSX LinkList component
 */

var LinkList = function LinkList(_ref) {
  var heading = _ref.heading,
      iconPlacement = _ref.iconPlacement,
      items = _ref.items,
      style = _ref.style;
  var linkStyle = style === 'card' ? 'card' : 'text';
  return React.createElement("div", {
    className: "".concat(prefix, "--link-list"),
    "data-autoid": "".concat(stablePrefix, "--link-list")
  }, React.createElement("h4", {
    className: "".concat(prefix, "--link-list__heading")
  }, heading), React.createElement("ul", {
    className: "".concat(prefix, "--link-list__list ").concat(prefix, "--link-list__list--").concat(style)
  }, items.map(function (cta, index) {
    return React.createElement("li", {
      className: "".concat(prefix, "--link-list__list__CTA ").concat(prefix, "--link-list__list--").concat(cta.type),
      key: index
    }, React.createElement(CTA, _extends({
      style: linkStyle
    }, cta, {
      disableImage: true
    }, iconPlacement && linkStyle === 'text' && {
      iconPlacement: iconPlacement
    })));
  })));
};

LinkList.propTypes = {
  /**
   * Describes heading of LinkList.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Describes the list of CTA.
   * The summary of the structure of each items are:
   *
   * | Name      | Description                                                                             |
   * | --------- | --------------------------------------------------------------------------------------- |
   * | `heading` | Describing the resource with added detail.                                              |
   * | `type`    | Describes after onClick where to load. It has `external`, `local`, and `video` options. |
   *
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
    type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string
  })).isRequired,

  /**
   * Icon placement.
   */
  iconPlacement: PropTypes.oneOf(['left', 'right']),

  /**
   * Orientation of LinkList.
   */
  style: PropTypes.oneOf(['card', 'horizontal', 'vertical', 'vertical-end']).isRequired
};
export default LinkList;