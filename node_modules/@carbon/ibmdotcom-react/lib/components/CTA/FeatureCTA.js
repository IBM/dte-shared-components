"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _CTALogic = _interopRequireDefault(require("./CTALogic"));

var _FeatureCardBlockMedium = require("../FeatureCardBlockMedium");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * FeatureCard subcomponent for CTA.
 */
var FeatureCTA = function FeatureCTA(_ref) {
  var type = _ref.type,
      openLightBox = _ref.openLightBox,
      renderLightBox = _ref.renderLightBox,
      videoTitle = _ref.videoTitle,
      formatCTAcopy = _ref.formatCTAcopy,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["type", "openLightBox", "renderLightBox", "videoTitle", "formatCTAcopy"]);
  return type === 'video' ? _react.default.createElement("div", null, _CTALogic.default.launchLightBox(renderLightBox, openLightBox, otherProps.card.cta.media), !renderLightBox && _react.default.createElement(_FeatureCardBlockMedium.FeatureCardBlockMedium, {
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
      return _CTALogic.default.setLightBox(e, openLightBox);
    }
  })) : _react.default.createElement(_FeatureCardBlockMedium.FeatureCardBlockMedium, {
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
  card.cta.icon.src = _CTALogic.default.iconSelector(card.type);
  card.target = _CTALogic.default.external(card.type);
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
  type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']))]),

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
FeatureCTA.defaultProps = {
  type: 'default',
  formatCTAcopy: function formatCTAcopy(_ref3) {
    var title = _ref3.title,
        duration = _ref3.duration;
    return "".concat(title, " ").concat(duration);
  }
};
var _default = FeatureCTA;
exports.default = _default;