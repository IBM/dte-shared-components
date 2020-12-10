/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Callout with child object.
 */

var Callout = function Callout(_ref) {
  var children = _ref.children;
  return React.createElement("section", {
    className: "".concat(prefix, "--callout__container"),
    "data-autoid": "".concat(stablePrefix, "--callout__container")
  }, React.createElement("div", {
    className: "".concat(prefix, "--callout__column"),
    "data-autoid": "".concat(stablePrefix, "--callout__column")
  }, React.createElement("div", {
    className: "".concat(prefix, "--callout__content"),
    "data-autoid": "".concat(stablePrefix, "--callout__content")
  }, children)));
};

Callout.propTypes = {
  /**
   * The component being imported into the callout container.
   */
  children: PropTypes.object
};
export default Callout;