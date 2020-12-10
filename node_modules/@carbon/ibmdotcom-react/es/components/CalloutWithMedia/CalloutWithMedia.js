import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Callout from '../../internal/components/Callout/Callout';
import { ContentBlockSimple } from '../ContentBlockSimple';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Callout with media pattern.
 */

var CalloutWithMedia = function CalloutWithMedia(_ref) {
  var ContentBlockSimpleProps = _extends({}, _ref);

  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--callout-with-media"),
    className: "".concat(prefix, "--callout-with-media")
  }, React.createElement(Callout, null, React.createElement(ContentBlockSimple, ContentBlockSimpleProps)));
};

CalloutWithMedia.propTypes = ContentBlockSimple.propTypes;
export default CalloutWithMedia;