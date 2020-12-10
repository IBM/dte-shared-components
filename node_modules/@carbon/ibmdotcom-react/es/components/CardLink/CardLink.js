import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from '../Card';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var prefix = settings.prefix;
/**
 * CardLink component
 */

var CardLink = function CardLink(_ref) {
  var card = _ref.card,
      customClassName = _ref.customClassName;
  var cardLinkClassname = cx("".concat(prefix, "--card__CTA"), customClassName);
  return React.createElement(Card, _extends({
    customClassName: cardLinkClassname
  }, card));
};

CardLink.propTypes = {
  /**
   * Card options.
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--link-clickable#props) for full usage details.
   */
  card: PropTypes.shape(Card.propTypes).isRequired,

  /**
   * Custom className
   */
  customClassName: PropTypes.string
};
CardLink.defaultProps = {
  disabled: false
};
export default CardLink;