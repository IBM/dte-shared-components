import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import ButtonCTA from './ButtonCTA';
import CardCTA from './CardCTA';
import CTALogic from './CTALogic';
import FeatureCTA from './FeatureCTA';
import PropTypes from 'prop-types';
import TextCTA from './TextCTA';
import { useVideoData } from '../../internal/hooks/useVideoData';
/**
 * CTA component.
 */

var CTA = function CTA(_ref) {
  var _otherProps$copy;

  var style = _ref.style,
      type = _ref.type,
      customClassName = _ref.customClassName,
      otherProps = _objectWithoutProperties(_ref, ["style", "type", "customClassName"]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      renderLightBox = _useState2[0],
      openLightBox = _useState2[1];

  var videoId = type && (type === 'video' || type.includes('video')) ? CTALogic.getVideoId(style, otherProps) : [];
  var videoTitle = useVideoData(type, videoId);
  var CTAComponent = style === 'card' ? CardCTA : style === 'button' ? ButtonCTA : style === 'feature' ? FeatureCTA : TextCTA;

  var ctaProps = _objectSpread({
    style: style,
    type: type,
    renderLightBox: renderLightBox,
    openLightBox: openLightBox,
    videoTitle: videoTitle
  }, otherProps);

  var ariaLabel = (_otherProps$copy = otherProps === null || otherProps === void 0 ? void 0 : otherProps.copy) !== null && _otherProps$copy !== void 0 ? _otherProps$copy : videoTitle[0].title;
  var ariaProps = style === 'card' && {
    'aria-label': ariaLabel,
    role: 'region'
  };
  return React.createElement("div", _extends({
    className: customClassName
  }, ariaProps), React.createElement(CTAComponent, ctaProps));
};

CTA.propTypes = {
  /**
   * CTA style. Choose from:
   *
   * | Style     | Component Name | Description                                                                                                                                 |
   * | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `text`    | LinkWithIcon   | For more details [see here](https://ibmdotcom-react.mybluemix.net/?path=/story/components-link-with-icon--default)!👀 |
   * | `button`  | ButtonGroup    | For more details [see here](https://ibmdotcom-react.mybluemix.net/?path=/story/components-buttongroup--default)!👀    |
   * | `card`    | Card           | For more details [see here](https://ibmdotcom-react.mybluemix.net/?path=/story/components-card--link)!👀              |
   * | `feature` | FeatureCard    | For more details [see here](https://ibmdotcom-react.mybluemix.net/?path=/story/components-card--link)!👀              |
   */
  style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),

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
   * Optional text for CTA.
   * Used for ones except `style="feature"`.
   */
  copy: PropTypes.string,

  /**
   * Valid URL for a the location of an internal or external resource.
   * Used for `style="text"`.
   */
  href: PropTypes.string,

  /**
   * Custom classname from parent.
   */
  customClassName: PropTypes.string
};
CTA.defaultProps = {
  style: 'text',
  type: 'default',
  copy: '',
  href: ''
};
export default CTA;