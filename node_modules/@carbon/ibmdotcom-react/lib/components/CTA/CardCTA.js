"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _CardLink = require("../CardLink");

var _CTALogic = _interopRequireDefault(require("./CTALogic"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _VideoPlayer = _interopRequireDefault(require("@carbon/ibmdotcom-services/lib/services/VideoPlayer/VideoPlayer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PlayIcon = function PlayIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("title", null, "Group 3"), _react.default.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, _react.default.createElement("circle", {
    fillOpacity: ".9",
    fill: "#525252",
    cx: "32",
    cy: "32",
    r: "32"
  }), _react.default.createElement("path", {
    d: "M26.556 43.111a1 1 0 0 1-1-1v-22a1 1 0 0 1 1.5-.87l19 11a1 1 0 0 1 0 1.74l-19 11a1 1 0 0 1-.5.13z",
    fill: "#F3F3F3",
    fillRule: "nonzero"
  })));
};

PlayIcon.defaultProps = {
  width: "64",
  height: "64",
  viewBox: "0 0 64 64",
  xmlns: "http://www.w3.org/2000/svg"
};
var prefix = _settings.default.prefix;
/**
 * Card subcomponent for CTA.
 */

var CardCTA = function CardCTA(_ref) {
  var type = _ref.type,
      openLightBox = _ref.openLightBox,
      renderLightBox = _ref.renderLightBox,
      videoTitle = _ref.videoTitle,
      disableImage = _ref.disableImage,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["type", "openLightBox", "renderLightBox", "videoTitle", "disableImage"]);
  // eslint-disable-next-line no-unused-vars
  var style = otherProps.style,
      cardProps = (0, _objectWithoutProperties2.default)(otherProps, ["style"]);

  if (type === 'video') {
    var _videoTitle$0$duratio;

    var image;

    if (!disableImage) {
      var _cardProps$media;

      // use image src if passed in through props, otherwise use Kaltura's generated thumbnail image
      image = cardProps.image ? cardProps.image : {
        defaultSrc: _VideoPlayer.default.getThumbnailUrl({
          videoId: (_cardProps$media = cardProps.media) === null || _cardProps$media === void 0 ? void 0 : _cardProps$media.src,
          width: '320'
        }),
        alt: videoTitle[0].title
      };
      image = _objectSpread({}, image, {
        icon: PlayIcon
      });
    }

    return _react.default.createElement(_react.default.Fragment, null, _CTALogic.default.launchLightBox(renderLightBox, openLightBox, otherProps.media), !renderLightBox && _react.default.createElement(_CardLink.CardLink, {
      customClassName: "".concat(prefix, "--card__video"),
      card: _objectSpread({}, cardProps, {
        cta: {
          href: '#',
          icon: {
            src: _CTALogic.default.iconSelector(type)
          },
          iconPlacement: 'left',
          copy: (_videoTitle$0$duratio = videoTitle[0].duration) === null || _videoTitle$0$duratio === void 0 ? void 0 : _videoTitle$0$duratio.replace(/\(|\)/g, '')
        },
        image: image,
        copy: videoTitle[0].title,
        handleClick: function handleClick(e) {
          return _CTALogic.default.setLightBox(e, openLightBox);
        }
      })
    }));
  } else {
    return _react.default.createElement(_CardLink.CardLink, {
      card: _objectSpread({}, cardProps, {
        cta: {
          type: type,
          href: otherProps.cta.href,
          icon: {
            src: _CTALogic.default.iconSelector(type)
          }
        },
        copy: otherProps.copy,
        target: _CTALogic.default.external(type),
        href: otherProps.cta.href
      })
    });
  }
};

CardCTA.propTypes = {
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
   * Boolean to determine whether to disable image for card
   */
  disableImage: _propTypes.default.bool,

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
  }))
};
CardCTA.defaultProps = {
  type: 'default',
  copy: '',
  cta: null,
  disableImage: false,
  media: null
};
var _default = CardCTA;
exports.default = _default;