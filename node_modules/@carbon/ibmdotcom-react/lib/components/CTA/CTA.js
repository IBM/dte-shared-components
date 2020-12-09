"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _ButtonCTA = _interopRequireDefault(require("./ButtonCTA"));

var _CardCTA = _interopRequireDefault(require("./CardCTA"));

var _CTALogic = _interopRequireDefault(require("./CTALogic"));

var _FeatureCTA = _interopRequireDefault(require("./FeatureCTA"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TextCTA = _interopRequireDefault(require("./TextCTA"));

var _useVideoData = require("../../internal/hooks/useVideoData");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * CTA component.
 */
var CTA = function CTA(_ref) {
  var _otherProps$copy;

  var style = _ref.style,
      type = _ref.type,
      customClassName = _ref.customClassName,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["style", "type", "customClassName"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      renderLightBox = _useState2[0],
      openLightBox = _useState2[1];

  var videoId = type && (type === 'video' || type.includes('video')) ? _CTALogic.default.getVideoId(style, otherProps) : [];
  var videoTitle = (0, _useVideoData.useVideoData)(type, videoId);
  var CTAComponent = style === 'card' ? _CardCTA.default : style === 'button' ? _ButtonCTA.default : style === 'feature' ? _FeatureCTA.default : _TextCTA.default;

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
  return _react.default.createElement("div", (0, _extends2.default)({
    className: customClassName
  }, ariaProps), _react.default.createElement(CTAComponent, ctaProps));
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
  style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),

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
   * Optional text for CTA.
   * Used for ones except `style="feature"`.
   */
  copy: _propTypes.default.string,

  /**
   * Valid URL for a the location of an internal or external resource.
   * Used for `style="text"`.
   */
  href: _propTypes.default.string,

  /**
   * Custom classname from parent.
   */
  customClassName: _propTypes.default.string
};
CTA.defaultProps = {
  style: 'text',
  type: 'default',
  copy: '',
  href: ''
};
var _default = CTA;
exports.default = _default;