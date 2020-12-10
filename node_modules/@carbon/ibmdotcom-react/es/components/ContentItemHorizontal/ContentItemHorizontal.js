import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { LinkList } from '../LinkList';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * ContentItemHorizontal Pattern
 *
 * @param {object} props props object
 * @param {string} props.eyebrow eyebrow text
 * @param {string} props.heading heading text
 * @param {string} props.copy copy text
 * @param {Array} props.cta cta array
 *
 * @returns {*} JSX ContentItemHorizontal pattern
 */

var ContentItemHorizontal = function ContentItemHorizontal(_ref) {
  var eyebrow = _ref.eyebrow,
      heading = _ref.heading,
      copy = _ref.copy,
      cta = _ref.cta;
  return React.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__item "),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item")
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__row")
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__col")
  }, eyebrow && React.createElement("p", {
    className: "".concat(prefix, "--content-item-horizontal__item--eyebrow"),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item--eyebrow")
  }, eyebrow), React.createElement("h3", {
    className: "".concat(prefix, "--content-item-horizontal__item--heading"),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item--heading")
  }, heading)), React.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__col")
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__item--copy"),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item--copy"),
    dangerouslySetInnerHTML: {
      __html: markdownToHtml(copy, {
        bold: false
      })
    }
  }), cta && React.createElement("div", {
    className: "".concat(prefix, "--content-item-horizontal__item--cta"),
    "data-autoid": "".concat(stablePrefix, "--content-item-horizontal__item--cta")
  }, React.createElement(LinkList, _extends({
    style: "vertical"
  }, cta))))));
};

ContentItemHorizontal.propTypes = {
  /**
   * Optional text displayed above the heading.
   */
  eyebrow: PropTypes.string,

  /**
   * Heading of the content item.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Copy of the content item. Accepts _italic_ markdown formatting.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Optional CTA links displayed below the copy.
   * Each item has the following structure:
   *
   * | Name   | Required | Data Type | Description                                |
   * | ------ | -------- | --------- | ------------------------------------------ |
   * | `type` | YES      | Object    | Link type. Accepts `local` and `external`. |
   * | `copy` | YES      | String    | Link text.                                 |
   * | `href` | YES      | String    | URI for internal or external resource.     |
   */
  cta: PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOfType([PropTypes.oneOf(['local', 'external']), PropTypes.arrayOf(PropTypes.oneOf(['local', 'external']))]),
      copy: PropTypes.string,
      href: PropTypes.string,
      customClassName: PropTypes.string
    })).isRequired,
    iconPlacement: PropTypes.oneOf(['left', 'right'])
  })
};
export default ContentItemHorizontal;