"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _ContentGroup = _interopRequireDefault(require("../../internal/components/ContentGroup/ContentGroup"));

var _ContentItem = _interopRequireDefault(require("../../internal/components/ContentItem/ContentItem"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _ImageWithCaption = require("../ImageWithCaption");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _VideoPlayer = require("../VideoPlayer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * Content Block - Segmented pattern.
 */

var ContentBlockSegmented = function ContentBlockSegmented(_ref) {
  var copy = _ref.copy,
      cta = _ref.cta,
      heading = _ref.heading,
      mediaType = _ref.mediaType,
      mediaData = _ref.mediaData,
      items = _ref.items,
      aside = _ref.aside;
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-segmented"),
    className: "".concat(prefix, "--content-block-segmented")
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    copy: copy,
    cta: cta,
    aside: aside
  }, _renderMedia(mediaType, mediaData), _renderGroup(items)));
};
/**
 * renders either video or image content
 *
 * @param {string} type cta type ( external | jump | local)
 * @param {object} data cta type ( external | jump | local)
 * @private
 * @returns {*} media component
 */


var _renderMedia = function _renderMedia(type, data) {
  if (data) {
    return _react.default.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-block-segmented__media")
    }, type === 'image' && _react.default.createElement(_ImageWithCaption.ImageWithCaption, data), type === 'video' && _react.default.createElement(_VideoPlayer.VideoPlayer, data));
  }
};
/**
 *
 * @param {object} items content item data
 * @returns {*} JSX Component with the media
 */


var _renderGroup = function _renderGroup(items) {
  return items.map(function (item, index) {
    return _react.default.createElement(_ContentGroup.default, {
      heading: item.heading,
      key: index,
      cta: item.cta && (item.cta.type === 'jump' || item.cta.type === 'local') ? _objectSpread({
        style: 'text'
      }, item.cta) : undefined
    }, _react.default.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-block-segmented__content-group")
    }, _react.default.createElement(_ContentItem.default, {
      copy: item.copy,
      key: index
    }), item.image && _react.default.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-block-segmented__media")
    }, _react.default.createElement(_ImageWithCaption.ImageWithCaption, item.image))));
  });
};

ContentBlockSegmented.propTypes = {
  /**
   * Main title of pattern.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Short copy to suppport title.
   */
  copy: _propTypes.default.string,

  /**
   * Supports `text` and `card` styles.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    style: _propTypes.default.oneOf(['text', 'card']),
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    customClassName: _propTypes.default.string
  }),

  /**
   * Determines media type (image or video).
   */
  mediaType: _propTypes.default.oneOf(['image', 'video']),

  /**
   * Media Data for either image or video.
   * See the following components' README for more details:
   *
   * * `mediaType="image"`: [`<ImageWithCaption>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-imagewithcaption--default#props)
   * * `mediaType="video"`: [`<VideoPlayer>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-videoplayer--default#props)
   */
  mediaData: _propTypes.default.oneOfType([_propTypes.default.shape({
    inverse: _propTypes.default.bool,
    image: _propTypes.default.shape({
      classname: _propTypes.default.string,
      sources: _propTypes.default.arrayOf(_propTypes.default.shape({
        src: _propTypes.default.string,
        breakpoint: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
      })),
      defaultSrc: _propTypes.default.string.isRequired,
      alt: _propTypes.default.string.isRequired,
      longDescription: _propTypes.default.string
    }).isRequired,
    lightbox: _propTypes.default.bool,
    heading: _propTypes.default.string,
    copy: _propTypes.default.string,
    customClassName: _propTypes.default.string
  }), _propTypes.default.shape({
    customClassName: _propTypes.default.string,
    videoId: _propTypes.default.string.isRequired,
    showCaption: _propTypes.default.bool,
    inverse: _propTypes.default.bool
  })]),

  /**
   * Array of content items to render. Has the following structure for each items:
   *
   * | Name      | Required | Data Type | Description                                                                                                                                                                                                             |
   * | --------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | YES      | String    | Short copy describing content item.                                                                                                                                                                                     |
   * | `image`   | NO       | Object    | See the [`Image`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/Image) component for full usage details.                                                         |
   * | `cta`     | NO       | Object    | `jump` and `local` types are allowed, for more information, see the [`CTA`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA) component for full usage details. |
   * | `copy`    | YES      | String    | Item content.                                                                                                                                                                                                           |
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    heading: _propTypes.default.string,
    copy: _propTypes.default.string,
    image: _propTypes.default.shape({
      inverse: _propTypes.default.bool,
      image: _propTypes.default.shape({
        classname: _propTypes.default.string,
        sources: _propTypes.default.arrayOf(_propTypes.default.shape({
          src: _propTypes.default.string,
          breakpoint: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
        })),
        defaultSrc: _propTypes.default.string.isRequired,
        alt: _propTypes.default.string.isRequired,
        longDescription: _propTypes.default.string
      }).isRequired,
      lightbox: _propTypes.default.bool,
      heading: _propTypes.default.string,
      copy: _propTypes.default.string,
      customClassName: _propTypes.default.string
    }),
    cta: _propTypes.default.shape({
      style: _propTypes.default.oneOf(['card']),
      type: _propTypes.default.oneOf(['local']),
      copy: _propTypes.default.string,
      customClassName: _propTypes.default.string
    })
  })).isRequired,

  /**
   * Object containing elements to be rendered within <aside> html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: _propTypes.default.shape({
    items: _propTypes.default.element,
    border: _propTypes.default.bool
  })
};
var _default = ContentBlockSegmented;
exports.default = _default;