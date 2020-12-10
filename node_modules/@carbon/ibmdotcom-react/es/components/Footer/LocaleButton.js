import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import EarthFilled20 from '@carbon/icons-react/es/earth--filled/20';
import LocaleModal from '../LocaleModal/LocaleModal';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Renders the locale button.
 */

var LocaleButton = function LocaleButton(_ref) {
  var displayLang = _ref.displayLang,
      aria = _ref.aria;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  return React.createElement("div", {
    className: "".concat(prefix, "--locale-btn__container")
  }, React.createElement(Button, {
    "data-autoid": "".concat(stablePrefix, "--locale-btn"),
    className: "".concat(prefix, "--locale-btn"),
    kind: "secondary",
    onClick: open,
    renderIcon: EarthFilled20,
    iconDescription: "Earth Filled Icon",
    "aria-label": aria
  }, displayLang), isOpen && React.createElement(LocaleModal, {
    isOpen: isOpen,
    setIsOpen: setIsOpen
  }));
  /**
   * Sets modal state to open
   *
   * @private
   */

  function open() {
    setIsOpen(true);
  }
};

LocaleButton.propTypes = {
  /**
   * Display language for locale button.
   */
  displayLang: PropTypes.string,

  /**
   * `aria-label`` value.
   */
  aria: PropTypes.string
};
export default LocaleButton;