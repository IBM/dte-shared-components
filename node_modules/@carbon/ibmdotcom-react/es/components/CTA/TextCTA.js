import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CTALogic from './CTALogic';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
/**
 * Link subcomponent for CTA.
 */

var TextCTA = function TextCTA(_ref) {
  var _otherProps$cta;

  var type = _ref.type,
      openLightBox = _ref.openLightBox,
      renderLightBox = _ref.renderLightBox,
      videoTitle = _ref.videoTitle,
      formatCTAcopy = _ref.formatCTAcopy,
      iconPlacement = _ref.iconPlacement,
      otherProps = _objectWithoutProperties(_ref, ["type", "openLightBox", "renderLightBox", "videoTitle", "formatCTAcopy", "iconPlacement"]);

  var Icon = CTALogic.iconSelector(type, iconPlacement);
  var href = type !== 'video' ? otherProps.href ? otherProps.href : (_otherProps$cta = otherProps.cta) === null || _otherProps$cta === void 0 ? void 0 : _otherProps$cta.href : null;
  return type === 'video' ? React.createElement("div", null, CTALogic.launchLightBox(renderLightBox, openLightBox, otherProps.media), !renderLightBox && React.createElement(LinkWithIcon, _extends({
    href: "#",
    onClick: function onClick(e) {
      return CTALogic.setLightBox(e, openLightBox);
    }
  }, iconPlacement && {
    iconPlacement: iconPlacement
  }), React.createElement("span", null, formatCTAcopy({
    title: videoTitle[0].title,
    duration: videoTitle[0].duration
  })), React.createElement(Icon, null))) : React.createElement(LinkWithIcon, _extends({
    href: href,
    target: CTALogic.external(type),
    onClick: function onClick(e) {
      return CTALogic.jump(e, type);
    }
  }, iconPlacement && {
    iconPlacement: iconPlacement
  }), React.createElement("span", null, otherProps.copy), type !== 'default' && React.createElement(Icon, null));
};

TextCTA.propTypes = {
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
   * Icon placement.
   */
  iconPlacement: PropTypes.oneOf(['left', 'right']),

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
TextCTA.defaultProps = {
  type: 'default',
  formatCTAcopy: function formatCTAcopy(_ref2) {
    var title = _ref2.title,
        duration = _ref2.duration;
    return "".concat(title, " ").concat(duration);
  },
  iconPlacement: 'right'
};
export default TextCTA;