/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { Card } from '../Card';
import ContentGroup from '../../internal/components/ContentGroup/ContentGroup';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';
var prefix = settings.prefix;
var stablePrefix = ddsSettings.stablePrefix;
/**
 * Card Array Component.
 */

var ContentGroupCards = function ContentGroupCards(_ref) {
  var heading = _ref.heading,
      items = _ref.items,
      copy = _ref.copy;
  var containerRef = useRef();
  useEffect(function () {
    setSameHeight();
    window.addEventListener('resize', setSameHeight);
    return function () {
      return window.removeEventListener('resize', setSameHeight);
    };
  }, []);
  /**
   * Function that activates the sameHeight utility
   */

  var setSameHeight = function setSameHeight() {
    window.requestAnimationFrame(function () {
      var containerNode = containerRef.current;

      if (containerNode) {
        sameHeight(containerNode.getElementsByClassName("".concat(prefix, "--card__heading")), 'md');
        sameHeight(containerNode.getElementsByClassName("".concat(prefix, "--card__copy")), 'md');
      }
    });
  };

  return React.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--content-group-cards"),
    className: "".concat(prefix, "--content-group-cards")
  }, React.createElement(ContentGroup, {
    heading: heading,
    copy: copy
  }, React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group-cards-group"),
    ref: containerRef,
    className: "".concat(prefix, "--content-group-cards-group ").concat(prefix, "--grid--condensed")
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-group-cards__row")
  }, _renderCards(items)))));
};
/**
 * Renders the cards based on the ContentArray entries
 *
 * @param {Array} items Content object array
 * @returns {*} CardArrayItem JSX objects
 */


var _renderCards = function _renderCards(items) {
  return items.map(function (elem, index) {
    return React.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-group-cards-item"),
      className: "".concat(prefix, "--content-group-cards-item__col"),
      key: index,
      role: "region"
    }, React.createElement(Card, {
      customClassName: "".concat(prefix, "--content-group-cards-item"),
      heading: elem.heading,
      copy: elem.copy,
      cta: {
        href: elem.cta.href,
        icon: {
          src: ArrowRight20
        }
      },
      "aria-label": elem.heading
    }));
  });
};

ContentGroupCards.propTypes = {
  /**
   * Main heading of the pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: PropTypes.string,

  /**
   * Array of content group objects. Has the following structure:
   *
   * | Name      | Data Type | Description                                                |
   * | --------- | --------- | ---------------------------------------------------------- |
   * | `heading` | String    | Title for the Card.                                        |
   * | `copy`    | String    | Copy for the Card.                                         |
   * | `cta`     | Object    | Object containing target and href of cta. See `cta` below. |
   *
   * `cta`:
   *
   * | Name   | Data Type | Description                       |
   * | ------ | --------- | --------------------------------- |
   * | `href` | String    | Url of the Content Card item cta. |
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    copy: PropTypes.string,
    cta: PropTypes.shape({
      href: PropTypes.string
    })
  }))
};
export default ContentGroupCards;