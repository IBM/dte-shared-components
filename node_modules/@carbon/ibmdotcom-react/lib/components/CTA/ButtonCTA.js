"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _ButtonGroup = require("../ButtonGroup");

var _CTALogic = _interopRequireDefault(require("./CTALogic"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Button subcomponent for CTA.
 */
var ButtonCTA = function ButtonCTA(_ref) {
  var type = _ref.type,
      openLightBox = _ref.openLightBox,
      renderLightBox = _ref.renderLightBox,
      videoTitle = _ref.videoTitle,
      formatCTAcopy = _ref.formatCTAcopy,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["type", "openLightBox", "renderLightBox", "videoTitle", "formatCTAcopy"]);

  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      mediaData = _useState2[0],
      setMediaData = _useState2[1];

  return type.includes('video') ? _react.default.createElement("div", null, _CTALogic.default.launchLightBox(renderLightBox, openLightBox, mediaData), !renderLightBox && _react.default.createElement(_ButtonGroup.ButtonGroup, {
    buttons: _renderButtons(_objectSpread({
      videoTitle: videoTitle,
      openLightBox: openLightBox,
      setMediaData: setMediaData,
      formatCTAcopy: formatCTAcopy
    }, otherProps))
  })) : _react.default.createElement(_ButtonGroup.ButtonGroup, {
    buttons: _renderButtons(_objectSpread({}, otherProps))
  });
};
/**
 * sets button
 *
 * @param {object} param param object
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {Array} param.videoTitle array of video titles
 * @param {Function} param.setMediaData func to set media data state
 * @param {Function} param.formatCTAcopy func to format the cta copy
 * @param {object} param.buttons object with buttons array
 * @private
 * @returns {*} object
 */


var _renderButtons = function _renderButtons(_ref2) {
  var openLightBox = _ref2.openLightBox,
      videoTitle = _ref2.videoTitle,
      setMediaData = _ref2.setMediaData,
      formatCTAcopy = _ref2.formatCTAcopy,
      buttons = _ref2.buttons;
  return buttons.map(function (button, key) {
    if (button.type === 'video') {
      button.onClick = function (e) {
        e.preventDefault();
        setMediaData(button.media);
        return _CTALogic.default.setLightBox(e, openLightBox);
      };

      var title = videoTitle.filter(function (name) {
        return name.key === key;
      });
      button.copy = !title[0] ? button.copy : formatCTAcopy({
        title: title[0].title,
        duration: title[0].duration
      });
      button.href = '#';
    } else {
      button.onClick = function (e) {
        return _CTALogic.default.jump(e, button.type);
      };

      button.target = _CTALogic.default.external(button.type);
    }

    button.renderIcon = _CTALogic.default.iconSelector(button.type);
    button.iconDescription = _renderIconDesc(button.type);
    return button;
  });
};
/**
 * render the icon description for screen reader
 *
 * @param {string} type type of cta
 *
 * @private
 * @returns {string} icon description
 */


var _renderIconDesc = function _renderIconDesc(type) {
  switch (type) {
    case 'external':
      return 'external launch icon';

    case 'jump':
      return 'down arrow icon';

    case 'video':
      return 'play button icon';

    default:
      return 'right arrow icon';
  }
};

ButtonCTA.propTypes = {
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
   * Array of button objects to render.
   */
  buttons: _propTypes.default.arrayOf(_propTypes.default.shape({
    type: _propTypes.default.oneOf(['local', 'external', 'jump', 'video']),
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    mediaData: _propTypes.default.shape({
      customClassName: _propTypes.default.string,
      videoId: _propTypes.default.string.isRequired,
      showCaption: _propTypes.default.bool,
      inverse: _propTypes.default.bool
    })
  })).isRequired,

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
   * The function to set media data.
   */
  setMediaData: _propTypes.default.func,

  /**
   * Func to format the cta copy
   */
  formatCTAcopy: _propTypes.default.func
};
ButtonCTA.defaultProps = {
  type: 'default',
  formatCTAcopy: function formatCTAcopy(_ref3) {
    var title = _ref3.title,
        duration = _ref3.duration;
    return "".concat(title, " ").concat(duration);
  }
};
var _default = ButtonCTA;
exports.default = _default;