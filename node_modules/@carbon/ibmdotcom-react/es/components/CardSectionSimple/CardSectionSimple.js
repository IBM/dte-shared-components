import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CardGroup } from '../CardGroup';
import classNames from 'classnames';
import ContentSection from '../../internal/components/ContentSection/ContentSection';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * CardSectionSimple pattern it is Cards without images.
 */

var CardSectionSimple = function CardSectionSimple(_ref) {
  var cards = _ref.cards,
      cta = _ref.cta,
      theme = _ref.theme,
      otherProps = _objectWithoutProperties(_ref, ["cards", "cta", "theme"]);

  var cardsWithoutImages = cards.filter(function (_ref2) {
    var image = _ref2.image,
        heading = _ref2.heading,
        copy = _ref2.copy,
        href = _ref2.cta.href;
    return !image && heading && copy && href;
  });
  return React.createElement(ContentSection, {
    heading: otherProps.heading,
    autoid: "".concat(stablePrefix, "--card-group-simple-group"),
    customClassName: classNames("".concat(prefix, "--card-group"), _defineProperty({}, "".concat(prefix, "--card-group--").concat(theme), theme))
  }, React.createElement(CardGroup, {
    cards: cardsWithoutImages,
    cta: cta
  }));
};

CardSectionSimple.propTypes = {
  /**
   * Color theme for pattern. Choose from:
   *
   * | Name    | Data Type | Description                  |
   * | ------- | --------- | ---------------------------- |
   * | `white` | String    | Carbon White theme           |
   * | `g10`   | String    | Carbon Gray 10 (g10) theme   |
   * | `g90`   | String    | Carbon Gray 90 (g90) theme   |
   * | `g100`  | String    | Carbon Gray 100 (g100) theme |
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Section heading.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Array of card data. Has the following structure for each items:
   *
   * | Name       | Required | Data Type | Description                            |
   * | ---------- | -------- | --------- | -------------------------------------- |
   * | `copy`     | YES      | String    | Copy of the card.                      |
   * | `heading`  | YES      | String    | Heading of the card.                   |
   * | `cta.href` | YES      | String    | URI for internal or external resource. |
   *
   * See example
   * [card data](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/src/components/CardGroup/__stories__/data/cards.json).
   */
  cards: PropTypes.arrayOf(PropTypes.exact({
    heading: PropTypes.string,
    copy: PropTypes.string,
    cta: PropTypes.shape({
      href: PropTypes.string
    })
  })).isRequired,

  /**
   * Optional CTA card for group. Always displays as last item.
   * See [`<CardGroup>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cardgroup--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    heading: PropTypes.string,
    cta: PropTypes.shape({
      href: PropTypes.string
    })
  })
};
export default CardSectionSimple;