/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Callout from '../../internal/components/Callout/Callout';
import { DDS_CALLOUT_DATA } from '../../internal/FeatureFlags';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import featureFlag from '@carbon/ibmdotcom-utilities/es/utilities/featureflag/featureflag';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Callout with Data pattern.
 */

var CalloutData = function CalloutData(_ref) {
  var data = _ref.data,
      copy = _ref.copy,
      source = _ref.source;
  return featureFlag(DDS_CALLOUT_DATA, React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--callout-data"),
    className: "".concat(prefix, "--callout-data")
  }, React.createElement(Callout, null, React.createElement("h4", {
    className: "".concat(prefix, "--callout-data__data")
  }, data), React.createElement("p", {
    className: "".concat(prefix, "--callout-data__copy")
  }, copy)), React.createElement("p", {
    className: "".concat(prefix, "--callout-data__source")
  }, source)));
};

CalloutData.PropTypes = {
  /**
   * Data for CalloutData pattern.
   */
  data: PropTypes.string.isRequired,

  /**
   * Copy text
   */
  copy: PropTypes.string.isRequired,

  /**
   * Source test
   */
  source: PropTypes.string.isRequired
};
export default CalloutData;