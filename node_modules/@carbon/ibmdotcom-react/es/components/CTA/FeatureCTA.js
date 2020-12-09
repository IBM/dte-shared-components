import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CTALogic from './CTALogic';
import { FeatureCardBlockMedium } from '../FeatureCardBlockMedium';
import PropTypes from 'prop-types';
import React from 'react';
/**
 * FeatureCard subcomponent for CTA.
 */

var FeatureCTA = function FeatureCTA(_ref) {
  var type = _ref.type,
      openLightBox = _ref.openLightBox,
      renderLightBox = _ref.renderLightBox,
      videoTitle = _ref.videoTitle,
      formatCTAcopy = _ref.formatCTAcopy,
      otherProps = _objectWithoutProperties(_ref, ["type", "openLightBox", "renderLightBox", "videoTitle", "formatCTAcopy"]);

  return type === 'video' ? React.createElement("div", null, CTALogic.launchLightBox(renderLightBox, openLightBox, otherProps.card.cta.media), !renderLightBox && React.createElement(FeatureCardBlockMedium, {
    heading: otherProps.heading,
    card: _renderFeatureCard({
      card: _objectSpread({}, otherProps.card, {
        heading: formatCTAcopy({
          title: videoTitle[0].title,
          duration: videoTitle[0].duration
        })
      })
    }),
    onClick: function onClick(e) {
      return CTALogic.setLightBox(e, openLightBox);
    }
  })) : React.createElement(FeatureCardBlockMedium, {
    heading: otherProps.heading,
    card: _renderFeatureCard({
      card: _objectSpread({}, otherProps.card)
    })
  });
};
/**
 * sets featureCard
 *
 * @param {object} param param object
 * @param {object} param.card card object
 *
 * @private
 * @returns {*} object
 */


var _renderFeatureCard = function _renderFeatureCard(_ref2) {
  var card = _ref2.card;
  if (card.type === 'jump') card.cta.type = 'jump';else if (card.type === 'video') card.cta.href = '#';
  card.cta.icon.src = CTALogic.iconSelector(card.type);
  card.target = CTALogic.external(card.type);
  card.type = 'link';
  return card;
};

FeatureCTA.propTypes = {
  /**
   * CTA type. Choose from:
   *
   * | Type       | SVG element Name | Description                                                      |
   * | ---------- | ---------------- | ---------------------------------------------------------------- |
   * | `local`    | ArrowRight20     | Describes right arrow onClick which loads in self page.          |
   * | `jump`     | ArrowDown20      | Describes down arrow onClick which scrollToView of target.       |
   * | `external` | Launch20         | Describes launch arrow onClick which loads in new tab.           |
   * | `download` | Download20       | Describes download arrow onClick for downloading files.          |
   * | `video`    | PlayOutline20    | Describes play icon onClick which loads the video in a lightbox. |
   * | `default`  | None             | Describes the default CTA - without icon                         |
   *
   * For more details of icons, refer to:
   *
   * - [Icons library](https://www.carbondesignsystem.com/guidelines/icons/library/)!👀
   * - [@carbon/icons-react](https://github.com/carbon-design-system/carbon/tree/master/packages/icons-react)!👀
   * - [carbon-icons](https://www.npmjs.com/package/carbon-icons)!👀
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']))]),

  /**
   * Func to set renderLightBox state.
   */
  openLightBox: PropTypes.func,

  /**
   * Bool to determine whether to open lightbox.
   */
  renderLightBox: PropTypes.bool,

  /**
   * Array of video titles.
   */
  videoTitle: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),

  /**
   * Func to format the cta copy
   */
  formatCTAcopy: PropTypes.func
};
FeatureCTA.defaultProps = {
  type: 'default',
  formatCTAcopy: function formatCTAcopy(_ref3) {
    var title = _ref3.title,
        duration = _ref3.duration;
    return "".concat(title, " ").concat(duration);
  }
};
export default FeatureCTA;