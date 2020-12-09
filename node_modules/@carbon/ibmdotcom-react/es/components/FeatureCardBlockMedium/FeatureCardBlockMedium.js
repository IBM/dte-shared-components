import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { FeatureCard } from '../FeatureCard';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Featured Card Component.
 */

var FeatureCardBlockMedium = function FeatureCardBlockMedium(_ref) {
  var heading = _ref.heading,
      card = _ref.card,
      otherProps = _objectWithoutProperties(_ref, ["heading", "card"]);

  return heading && card.cta && React.createElement("section", {
    className: "".concat(prefix, "--feature-card-block-medium"),
    "data-autoid": "".concat(stablePrefix, "--feature-card-block-medium")
  }, React.createElement("h3", {
    className: "".concat(prefix, "--feature-card-block-medium__heading")
  }, heading), React.createElement(FeatureCard, _extends({
    card: card
  }, otherProps)));
};

FeatureCardBlockMedium.propTypes = {
  /**
   * Main title of the pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Object containing Feature Card details. Has the following structure in summary:
   *
   * | Name      | Data Type | Description                                                                                                                                                                        |
   * | --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | String    | Title of the Card item.                                                                                                                                                            |
   * | `image`   | Object    | Image object used in the FeatureCard component. See [`<Image>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-image--default#props) for full usage details. |
   * | `cta`     | Object    | Object containing target and href of link. See `cta` below.                                                                                                                        |
   *
   * `cta`:
   *
   * | Name   | Data Type | Description                       |
   * | ------ | --------- | --------------------------------- |
   * | `href` | String    | Url of the FeatureCard component. |
   *
   * See [`<FeatureCard>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-blocks-featurecard--default#props) for full usage details.
   */
  card: PropTypes.shape({
    heading: PropTypes.string,
    eyebrow: PropTypes.string,
    copy: PropTypes.string,
    cta: PropTypes.shape({
      copy: PropTypes.string,
      href: PropTypes.string,
      type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))])
    }).isRequired,
    image: PropTypes.shape({
      classname: PropTypes.string,
      sources: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
        breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })),
      defaultSrc: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      longDescription: PropTypes.string
    }),
    inverse: PropTypes.bool,
    customClassName: PropTypes.string,
    type: PropTypes.oneOf(['link'])
  }).isRequired
};
export default FeatureCardBlockMedium;