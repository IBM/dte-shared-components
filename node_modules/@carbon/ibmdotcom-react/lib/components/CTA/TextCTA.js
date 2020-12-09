"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _CTALogic = _interopRequireDefault(require("./CTALogic"));

var _LinkWithIcon = require("../LinkWithIcon");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["type", "openLightBox", "renderLightBox", "videoTitle", "formatCTAcopy", "iconPlacement"]);

  var Icon = _CTALogic.default.iconSelector(type, iconPlacement);

  var href = type !== 'video' ? otherProps.href ? otherProps.href : (_otherProps$cta = otherProps.cta) === null || _otherProps$cta === void 0 ? void 0 : _otherProps$cta.href : null;
  return type === 'video' ? _react.default.createElement("div", null, _CTALogic.default.launchLightBox(renderLightBox, openLightBox, otherProps.media), !renderLightBox && _react.default.createElement(_LinkWithIcon.LinkWithIcon, (0, _extends2.default)({
    href: "#",
    onClick: function onClick(e) {
      return _CTALogic.default.setLightBox(e, openLightBox);
    }
  }, iconPlacement && {
    iconPlacement: iconPlacement
  }), _react.default.createElement("span", null, formatCTAcopy({
    title: videoTitle[0].title,
    duration: videoTitle[0].duration
  })), _react.default.createElement(Icon, null))) : _react.default.createElement(_LinkWithIcon.LinkWithIcon, (0, _extends2.default)({
    href: href,
    target: _CTALogic.default.external(type),
    onClick: function onClick(e) {
      return _CTALogic.default.jump(e, type);
    }
  }, iconPlacement && {
    iconPlacement: iconPlacement
  }), _react.default.createElement("span", null, otherProps.copy), type !== 'default' && _react.default.createElement(Icon, null));
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
  type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']))]),

  /**
   * Icon placement.
   */
  iconPlacement: _propTypes.default.oneOf(['left', 'right']),

  /**
   * Func to set renderLightBox state.
   */
  openLightBox: _propTypes.default.func,

  /**
   * Bool to determine whether to open lightbox.
   */
  renderLightBox: _propTypes.default.bool,

  /**
   * Array of video titles.
   */
  videoTitle: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    duration: _propTypes.default.string,
    key: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
  })),

  /**
   * Func to format the cta copy
   */
  formatCTAcopy: _propTypes.default.func
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
var _default = TextCTA;
exports.default = _default;