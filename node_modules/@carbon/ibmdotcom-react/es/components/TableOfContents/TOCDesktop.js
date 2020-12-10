import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import smoothScroll from '@carbon/ibmdotcom-utilities/es/utilities/smoothScroll/smoothScroll';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * DesktopMenu Component.
 */

var TOCDesktop = function TOCDesktop(_ref) {
  var menuItems = _ref.menuItems,
      selectedId = _ref.selectedId;

  /**
   * Render menu items
   *
   * @param {Array} items menu items array
   * @param {string} activeId selected item id
   * @returns {*} JSX Object
   */
  var renderMenuItems = function renderMenuItems(items, activeId) {
    return items.map(function (item, index) {
      if ((item === null || item === void 0 ? void 0 : item.id) !== 'menuLabel') {
        var isActive = activeId === item.id;
        return React.createElement("li", {
          key: index,
          "data-autoid": "".concat(stablePrefix, "--tableofcontents__desktop__item-").concat(item.id),
          className: classNames("".concat(prefix, "--tableofcontents__desktop__item"), _defineProperty({}, "".concat(prefix, "--tableofcontents__desktop__item--active"), isActive))
        }, React.createElement("a", _extends({}, isActive ? {
          'aria-current': 'location'
        } : {}, {
          onClick: function onClick(e) {
            return handleOnClick(e, item.id);
          },
          href: "#".concat(item.id)
        }), item.title));
      }
    });
  };
  /**
   * Handle OnClick
   *
   * @param {*} e event object
   * @param {*} id menu item id
   */


  var handleOnClick = function handleOnClick(e, id) {
    e.preventDefault();
    var selector = "a[name=\"".concat(id, "\"]");
    smoothScroll(null, selector);
    triggerFocus(selector);
  };
  /**
   * Trigger the focus on screen readers, so they can read the target paragraph
   *
   * @param {*} elem Selector to find the item
   */


  function triggerFocus(elem) {
    var element = document.querySelector(elem);
    element.setAttribute('tabindex', '0');
    element.focus({
      preventScroll: true
    });
    element.removeAttribute('tabindex');
  }

  return React.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__desktop"),
    "data-autoid": "".concat(stablePrefix, "--tableofcontents__desktop")
  }, React.createElement("ul", null, renderMenuItems(menuItems, selectedId)));
};

TOCDesktop.propTypes = {
  /**
   * Array of menu item objects to render within the side nav.
   * Each items has the following structure:
   *
   * | Properties Name | Data Type | Description     |
   * | --------------- | --------- | --------------- |
   * | title           | String    | Menu title text |
   * | id              | String    | Menu id         |
   */
  menuItems: PropTypes.array,

  /**
   * Id of a menu item.
   */
  selectedId: PropTypes.string
};
export default TOCDesktop;