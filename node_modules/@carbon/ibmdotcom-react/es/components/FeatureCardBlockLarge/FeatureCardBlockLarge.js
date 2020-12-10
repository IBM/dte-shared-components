import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from '../Card';
import classNames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Featured Card Component.
 */

var FeatureCardBlockLarge = function FeatureCardBlockLarge(props) {
  return props.eyebrow && props.heading && props.image && props.cta && React.createElement("section", {
    className: classNames("".concat(prefix, "--feature-card-block-large"), _defineProperty({}, "".concat(prefix, "--feature-card-block-large_no-copy-text"), !props.copy)),
    "data-autoid": "".concat(stablePrefix, "--feature-card-block-large")
  }, React.createElement("div", {
    className: "".concat(prefix, "--feature-card-block-large__container")
  }, React.createElement(Card, _extends({
    customClassName: "".concat(prefix, "--feature-card-block-large__card")
  }, props, {
    inverse: true
  }))));
};

FeatureCardBlockLarge.propTypes = {
  /**
   * "Eyebrow" text above copy and CTA.
   */
  eyebrow: PropTypes.string.isRequired,

  /**
   * Title of the Card item.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Body text for the card.
   */
  copy: PropTypes.string,

  /**
   * Object containing target and href of link. Has the following structure in summary:
   *
   * | Name   | Data Type | Description                                 |
   * | ------ | --------- | ------------------------------------------- |
   * | `href` | String    | Url of the FeatureCardBlockLarge component. |
   *
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--static#props) for full usage details.
   */
  cta: PropTypes.shape({
    copy: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))])
  }).isRequired,

  /**
   * Contains source and alt text properties.
   * See [`<Image>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-image--default#props) for full usage details.
   */
  image: PropTypes.shape({
    classname: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
      breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    defaultSrc: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    longDescription: PropTypes.string
  }).isRequired
};
export default FeatureCardBlockLarge;