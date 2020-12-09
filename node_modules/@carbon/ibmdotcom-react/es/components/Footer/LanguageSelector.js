import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect, useRef } from 'react';
import ComboBox from '../../internal/vendor/carbon-components-react/components/ComboBox/ComboBox';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Footer language selector component.
 */

var LanguageSelector = function LanguageSelector(_ref) {
  var items = _ref.items,
      initialSelectedItem = _ref.initialSelectedItem,
      callback = _ref.callback;

  var _useClickOutside = useClickOutside(),
      ref = _useClickOutside.ref;

  var _useState = useState(initialSelectedItem || items[0]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedItem = _useState2[0],
      setSelectedItem = _useState2[1];

  var _useState3 = useState(initialSelectedItem || items[0]),
      _useState4 = _slicedToArray(_useState3, 2),
      lastSelectedItem = _useState4[0],
      setLastSelectedItem = _useState4[1];
  /**
   * Sets the selected item and then runs the callback function
   *
   * @param {object} selectedItem Selected item object
   * @private
   */


  function _setSelectedItem(selectedItem) {
    setSelectedItem(selectedItem);
    callback(selectedItem);

    if (selectedItem !== null) {
      setLastSelectedItem(selectedItem);
    }
  }
  /**
   * Identifies the click outisde the language selector and resets its value to the previously selected
   */


  function useClickOutside() {
    var ref = useRef(null);

    var handleClickOutside = function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelectedItem(lastSelectedItem);
      }
    };

    useEffect(function () {
      root.document.addEventListener('click', handleClickOutside, true);
      return function () {
        root.document.removeEventListener('click', handleClickOutside, true);
      };
    });
    return {
      ref: ref
    };
  }

  return React.createElement("div", {
    className: "".concat(prefix, "--language-selector__container"),
    ref: ref
  }, React.createElement(ComboBox, {
    id: "dds-language-selector",
    "data-autoid": "".concat(stablePrefix, "--language-selector"),
    className: "".concat(prefix, "--language-selector"),
    onChange: function onChange(_ref2) {
      var selectedItem = _ref2.selectedItem;
      return _setSelectedItem(selectedItem);
    },
    items: items,
    itemToString: function itemToString(item) {
      return item ? item.text : '';
    },
    initialSelectedItem: initialSelectedItem,
    selectedItem: selectedItem,
    direction: "top",
    placeholder: ""
  }));
};

LanguageSelector.propTypes = {
  /**
   * Array of items to pass into ComboBox.
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  })),

  /**
   * Initial selected item for the ComboBox.
   */
  initialSelectedItem: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  }),

  /**
   * Callback function when an item is selected.
   */
  callback: PropTypes.func
};
LanguageSelector.defaultProps = {
  items: null,
  initialSelectedItem: null,
  callback: function callback() {}
};
export default LanguageSelector;