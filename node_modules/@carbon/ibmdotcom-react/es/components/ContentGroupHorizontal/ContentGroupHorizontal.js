/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import { ContentItemHorizontal } from '../ContentItemHorizontal';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * ContentGroupHorizontal pattern.
 */

var ContentGroupHorizontal = function ContentGroupHorizontal(_ref) {
  var heading = _ref.heading,
      items = _ref.items;
  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group-horizontal"),
    className: "".concat(prefix, "--content-group-horizontal")
  }, React.createElement(ContentBlock, {
    heading: heading,
    border: true
  }, items.map(function (item, index) {
    return React.createElement(ContentItemHorizontal, {
      eyebrow: item.eyebrow,
      heading: item.heading,
      copy: item.copy,
      cta: item.cta,
      key: index
    });
  })));
};

ContentGroupHorizontal.propTypes = {
  /**
   * Heading of the content group.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Array of content items.
   * See [`<ContentItemHorizontal>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-contentitemhorizontal--default#props) for full usage details.
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    eyebrow: PropTypes.string,
    heading: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
    cta: PropTypes.shape({
      heading: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOfType([PropTypes.oneOf(['local', 'external']), PropTypes.arrayOf(PropTypes.oneOf(['local', 'external']))]),
        copy: PropTypes.string,
        href: PropTypes.string,
        customClassName: PropTypes.string
      })).isRequired,
      iconPlacement: PropTypes.oneOf(['left', 'right'])
    })
  })).isRequired
};
export default ContentGroupHorizontal;