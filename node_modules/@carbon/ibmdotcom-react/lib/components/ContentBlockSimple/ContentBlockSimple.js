"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _ContentItem = _interopRequireDefault(require("../../internal/components/ContentItem/ContentItem"));

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _ImageWithCaption = require("../ImageWithCaption");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _VideoPlayer = require("../VideoPlayer");

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * Content Block - Simple pattern.
 */

var ContentBlockSimple = function ContentBlockSimple(_ref) {
  var copy = _ref.copy,
      heading = _ref.heading,
      mediaType = _ref.mediaType,
      mediaData = _ref.mediaData,
      cta = _ref.cta,
      aside = _ref.aside;
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-simple"),
    className: "".concat(prefix, "--content-block-simple")
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    cta: cta,
    aside: aside
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-block-simple__content")
  }, _react.default.createElement(_ContentItem.default, {
    copy: copy
  }), _renderMedia(mediaType, mediaData))));
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
    var _cx;

    return _react.default.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-block-simple__media"),
      className: (0, _classnames.default)((_cx = {}, (0, _defineProperty2.default)(_cx, "".concat(prefix, "--content-block-simple__media-video"), type === 'video'), (0, _defineProperty2.default)(_cx, "".concat(prefix, "--content-block-simple__media-image"), type === 'image'), _cx))
    }, type === 'image' && _react.default.createElement(_ImageWithCaption.ImageWithCaption, data), type === 'video' && _react.default.createElement(_VideoPlayer.VideoPlayer, data));
  }
};

ContentBlockSimple.propTypes = {
  /**
   * Simple content item.
   * Uses [`markdownToHtml`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/utilities/src/utilities/markdownToHtml) utility.
   */
  copy: _propTypes.default.string.isRequired,

  /**
   * Title of the content block.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Determines media type (image or video).
   */
  mediaType: _propTypes.default.string,

  /**
   * Media Data for either image or video.
   * See the following components' README for more details:
   *
   * * `mediaType="image"`: [`<ImageWithCaption>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-imagewithcaption--default#props)
   * * `mediaType="video"`: [`<VideoPlayer>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-videoplayer--default#props)
   */
  mediaData: _propTypes.default.oneOfType([_propTypes.default.shape({
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
    showCaption: _propTypes.default.bool
  })]),

  /**
   * CTA used at the end of content body.
   * `Text` and `Card` styles supported.
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
   * Object containing elements to be rendered within <aside> html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: _propTypes.default.object
};
var _default = ContentBlockSimple;
exports.default = _default;