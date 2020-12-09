import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import Close20 from '@carbon/icons-react/es/close/20';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Close button for Expressive Modal.
 */

var ExpressiveModalCloseBtn = function ExpressiveModalCloseBtn(_ref) {
  var btnClassName = _ref.btnClassName,
      iconDescription = _ref.iconDescription,
      iconClassName = _ref.iconClassName,
      props = _objectWithoutProperties(_ref, ["btnClassName", "iconDescription", "iconClassName"]);

  return React.createElement("button", _extends({
    "data-autoid": "".concat(stablePrefix, "--expressive-modal__close"),
    className: classNames("".concat(prefix, "--modal-close"), btnClassName),
    title: iconDescription,
    type: "button"
  }, props), React.createElement(Close20, {
    "aria-label": iconDescription,
    className: classNames("".concat(prefix, "--modal-close__icon"), iconClassName)
  }));
};

ExpressiveModalCloseBtn.propTypes = {
  /**
   * A custom class name to the button.
   */
  btnClassName: PropTypes.string,

  /**
   * A custom class name to the icon.
   */
  iconClassName: PropTypes.string,

  /**
   * Accessible description that describes icon action.
   */
  iconDescription: PropTypes.string
};
ExpressiveModalCloseBtn.defaultProps = {
  iconDescription: 'Close'
};
export default ExpressiveModalCloseBtn;