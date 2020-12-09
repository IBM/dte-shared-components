import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ComposedModal from '../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ExpressiveModalCloseBtn from './ExpressiveModalCloseBtn';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Expressive Modal.
 */

var ExpressiveModal = function ExpressiveModal(_ref) {
  var open = _ref.open,
      className = _ref.className,
      children = _ref.children,
      fullwidth = _ref.fullwidth,
      onClose = _ref.onClose,
      props = _objectWithoutProperties(_ref, ["open", "className", "children", "fullwidth", "onClose"]);

  var _useState = useState(open),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  useEffect(manageOpenState, [open]);
  return React.createElement(ComposedModal, _extends({
    onClose: onClose,
    open: isOpen,
    "data-autoid": "".concat(stablePrefix, "--expressive-modal"),
    className: classNames("".concat(prefix, "--modal--expressive"), className, _defineProperty({}, "".concat(prefix, "--modal--expressive--fullwidth"), fullwidth))
  }, props), React.createElement(ExpressiveModalCloseBtn, {
    onClick: closeModal
  }), children);
  /**
   * Close modal
   */

  function closeModal() {
    if ((onClose === null || onClose === void 0 ? void 0 : onClose()) !== false) {
      setIsOpen(false);
    }
  }
  /**
   * Manage open prop and isOpen state
   */


  function manageOpenState() {
    setIsOpen(open);
  }
};

ExpressiveModal.propTypes = {
  /**
   * Sets whether the Modal is fullwidth or not.
   */
  fullwidth: PropTypes.bool,

  /**
   * Sets whether the Modal is open/close.
   */
  open: PropTypes.bool,

  /**
   * Custom classname(s) for the Modal.
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /**
   * Components/Elements to be rendered within the Modal.
   */
  children: PropTypes.node,

  /**
   * Function to be triggered on close of Modal.
   */
  onClose: PropTypes.func
};
ExpressiveModal.defaultProps = {
  open: false
};
export default ExpressiveModal;