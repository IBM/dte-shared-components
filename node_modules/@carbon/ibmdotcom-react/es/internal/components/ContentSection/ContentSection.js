import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

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
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * ContentSection Component, for use with cardSection.
 */

var ContentSection = function ContentSection(_ref) {
  var heading = _ref.heading,
      theme = _ref.theme,
      children = _ref.children,
      customClassName = _ref.customClassName,
      otherProps = _objectWithoutProperties(_ref, ["heading", "theme", "children", "customClassName"]);

  return React.createElement("section", {
    className: classNames("".concat(prefix, "--content-section"), customClassName, _defineProperty({}, "".concat(prefix, "--content-section--").concat(theme), theme)),
    "data-autoid": otherProps.autoid ? otherProps.autoid : "".concat(stablePrefix, "--content-section")
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-section__grid")
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-section__row")
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-section__left")
  }, React.createElement("h2", {
    className: "".concat(prefix, "--content-section__heading")
  }, heading)), React.createElement("div", {
    className: "".concat(prefix, "--content-section__children")
  }, children))));
};

ContentSection.propTypes = {
  /**
   * Heading text.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Theme name.
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Container for other components.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

  /**
   * Optional class to be applied to the containing node.
   */
  customClassName: PropTypes.string
};
export default ContentSection;