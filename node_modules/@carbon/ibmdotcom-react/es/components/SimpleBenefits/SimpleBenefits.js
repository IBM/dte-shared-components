import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { DDS_SIMPLEBENEFITS } from '../../internal/FeatureFlags';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import featureFlag from '@carbon/ibmdotcom-utilities/es/utilities/featureflag/featureflag';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
import SimpleBenefitsItem from './SimpleBenefitsItem';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Simple benefits pattern.
 */

var SimpleBenefits = function SimpleBenefits(_ref) {
  var _classNames;

  var content = _ref.content,
      theme = _ref.theme,
      title = _ref.title;
  useEffect(function () {
    /**
     * Function to be added to eventListener and cleaned later on
     */
    var resizeFunction = function resizeFunction() {
      setSameHeight(".".concat(prefix, "--simplebenefits__content-item__title"));
    };

    resizeFunction();
    root.addEventListener('resize', resizeFunction);
    return function () {
      return root.removeEventListener('resize', resizeFunction);
    };
  });
  /**
   * Set same height to elements
   *
   * @param {string} selector css selector of target elements
   */

  var setSameHeight = function setSameHeight(selector) {
    var elements = document.querySelectorAll(selector);
    var biggest = 0;
    elements.forEach(function (element) {
      element.style.height = "auto";
    });
    elements.forEach(function (element) {
      if (element.offsetHeight > biggest) {
        biggest = element.offsetHeight;
      }
    });
    elements.forEach(function (element) {
      element.style.height = "".concat(biggest, "px");
    });
  };

  var simpleBenefits = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefix, "--simplebenefits"), true), _defineProperty(_classNames, "".concat(prefix, "--simplebenefits--multirow"), content.length > 3), _classNames));
  return featureFlag(DDS_SIMPLEBENEFITS, React.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--simplebenefits"),
    className: "".concat(simpleBenefits, " ").concat(_setTheme(theme))
  }, React.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__container")
  }, React.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__row")
  }, React.createElement("h2", {
    className: "".concat(prefix, "--simplebenefits__title")
  }, React.createElement("div", {
    className: "".concat(prefix, "--simplebenefits__title-container")
  }, title)), React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--simplebenefits__content"),
    className: "".concat(prefix, "--simplebenefits__content")
  }, _renderArray(content))))));
};
/**
 * Render the content in array list
 *
 * @private
 * @param {Array} content content object array
 * @returns {object} JSX Object
 */


var _renderArray = function _renderArray(content) {
  return content.map(function (contentItem, contentItemIndex) {
    return React.createElement(SimpleBenefitsItem, {
      key: contentItemIndex,
      title: contentItem.title,
      copy: contentItem.copy,
      link: contentItem.link
    });
  });
};
/**
 * sets the class name based on theme type
 *
 * @private
 * @param {string} theme theme type
 * @returns {string} theme css class names
 */


var _setTheme = function _setTheme(theme) {
  return theme && "".concat(prefix, "--simplebenefits--").concat(theme);
};

SimpleBenefits.propTypes = {
  /**
   * Array of content group objects. Has the following structure for each items:
   *
   * | Name    | Data Type | Description                                                  |
   * | ------- | --------- | ------------------------------------------------------------ |
   * | `title` | String    | Title of the Content Card item.                              |
   * | `copy`  | String    | Copy of the Content Card item.                               |
   * | `link`  | Object    | Object containing target and href of link. See `link` below. |
   *
   * `link`:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `href`   | String    | Url of link.                                               |
   * | `text`   | String    | Link text.                                                 |
   * | `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |
   */
  content: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    copy: PropTypes.string,
    link: PropTypes.shape({
      href: PropTypes.string,
      text: PropTypes.string,
      target: PropTypes.string
    })
  })),

  /**
   * Main title of the pattern.
   */
  title: PropTypes.string.isRequired
};
export default SimpleBenefits;