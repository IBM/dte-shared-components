import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Callout from '../../internal/components/Callout/Callout';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import { Quote } from '../Quote';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * CalloutQuote component.
 */

var CalloutQuote = function CalloutQuote(_ref) {
  var quote = _ref.quote;
  return React.createElement("div", {
    className: "".concat(prefix, "--callout-quote"),
    "data-autoid": "".concat(stablePrefix, "--callout-quote")
  }, React.createElement(Callout, null, React.createElement(Quote, _extends({}, quote, {
    inverse: true
  }))));
};

CalloutQuote.propTypes = {
  /**
   * Quote object.
   * See [`<Quote>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-quote--default#props) for full usage details.
   */
  quote: PropTypes.shape({
    markType: PropTypes.oneOf(['doubleCurved', 'singleCurved', 'doubleAngle', 'singleAngle', 'lowHighReversedDoubleCurved']),
    copy: PropTypes.string.isRequired,
    source: PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string
    }),
    cta: PropTypes.shape({
      copy: PropTypes.string,
      type: PropTypes.oneOf(['local', 'external']),
      href: PropTypes.string
    }),
    inverse: PropTypes.bool
  })
};
export default CalloutQuote;