import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import smoothScroll from '@carbon/ibmdotcom-utilities/es/utilities/smoothScroll/smoothScroll';
import TableOfContents20 from '@carbon/icons-react/es/table-of-contents/20';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Mobile Component.
 */

var TOCMobile = function TOCMobile(_ref) {
  var menuItems = _ref.menuItems,
      selectedId = _ref.selectedId,
      menuLabel = _ref.menuLabel,
      updateState = _ref.updateState;

  var _useState = useState('menuLabel'),
      _useState2 = _slicedToArray(_useState, 2),
      selectedOption = _useState2[0],
      setSelectedOption = _useState2[1];

  useEffect(function () {
    setSelectedOption(selectedId);
  }, [selectedId]);
  /**
   * Handle onChange event of select
   *
   * @param {*} e event object
   */

  var handleChange = function handleChange(e) {
    var id = e.target.value;
    var filteredItems = menuItems.filter(function (menu) {
      return menu.id === id;
    });
    var title = filteredItems[0].title;
    updateState(id, title);
    var selector = "a[name=\"".concat(id, "\"]");
    smoothScroll(null, selector, 50);
  };
  /**
   * Handle OnBlur event
   *
   * @returns {null} Returns null for blur events
   */


  var handleOnBlur = function handleOnBlur() {
    return null;
  };

  return React.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__mobile"),
    "data-autoid": "".concat(stablePrefix, "--tableofcontents__mobile")
  }, React.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__mobile__select__wrapper")
  }, React.createElement("select", {
    className: "".concat(prefix, "--tableofcontents__mobile__select"),
    onBlur: handleOnBlur,
    value: selectedOption,
    onChange: function onChange(e) {
      return handleChange(e);
    }
  }, renderOptions(menuItems, menuLabel)), React.createElement(TableOfContents20, {
    className: "".concat(prefix, "--tableofcontents__mobile__select__icon"),
    "aria-label": "menu icon"
  }, React.createElement("title", null, "menu icon"))));
};
/**
 * Render options for select
 *
 * @param {Array} options menu item arrray
 * @param {Array} label menu label
 * @returns {*} JSX Object
 */


var renderOptions = function renderOptions(options, label) {
  var labelObj = {
    title: "".concat(label, " ..."),
    id: 'menuLabel'
  };
  options.findIndex(function (x) {
    return x.id === labelObj.id;
  }) === -1 ? options.unshift(labelObj) : null;
  return options.map(function (option, index) {
    if (option) {
      return React.createElement("option", {
        className: "".concat(prefix, "--tableofcontents__mobile__select__option"),
        "data-autoid": "".concat(stablePrefix, "}--tableofcontents__mobile__select__option-").concat(option.id),
        key: index,
        value: option.id,
        defaultValue: index === 0,
        disabled: index === 0,
        hidden: index === 0
      }, option.title);
    }
  });
};

TOCMobile.propTypes = {
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
  selectedId: PropTypes.string,

  /**
   * Menu label for mobile menu.
   */
  menuLabel: PropTypes.string,

  /**
   * Function to update parent state.
   */
  updateState: PropTypes.func
};
export default TOCMobile;