"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _CTA = require("../CTA");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _HorizontalRule = require("../HorizontalRule");

var _ImageWithCaption = require("../ImageWithCaption");

var _LinkList = require("../LinkList");

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
 * renders media either video or image content
 *
 * @param {string} type media type
 * @param {object} data media data
 * @returns {*} Image or Video
 */

var _renderMedia = function _renderMedia(type, data) {
  if (data) {
    return _react.default.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--leadspace-block__media"),
      className: "".concat(prefix, "--leadspace-block__media")
    }, type === 'image' && _react.default.createElement(_ImageWithCaption.ImageWithCaption, data), type === 'video' && _react.default.createElement(_VideoPlayer.VideoPlayer, data));
  }
};
/**
 * Lead space block component (left-aligned).
 */


var LeadSpaceBlock = function LeadSpaceBlock(_ref) {
  var title = _ref.title,
      heading = _ref.heading,
      copy = _ref.copy,
      mediaType = _ref.mediaType,
      mediaData = _ref.mediaData,
      items = _ref.items,
      cta = _ref.cta;

  var pageTitle = _react.default.createElement("div", null, title && _react.default.createElement("h1", {
    "data-autoid": "".concat(stablePrefix, "--leadspace-block__title"),
    className: "".concat(prefix, "--leadspace-block__title")
  }, title));

  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--leadspace-block"),
    className: "".concat(prefix, "--leadspace-block")
  }, pageTitle, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    copy: copy
  }, _renderMedia(mediaType, mediaData), _react.default.createElement(_LinkList.LinkList, {
    style: "vertical-end",
    heading: items.heading,
    items: items.items
  }), _react.default.createElement(_CTA.CTA, (0, _extends2.default)({
    customClassName: "".concat(prefix, "--leadspace-block__cta ").concat(prefix, "--leadspace-block__cta-col")
  }, cta))), _react.default.createElement(_HorizontalRule.HorizontalRule, null));
};

LeadSpaceBlock.propTypes = {
  /**
   * Heading of the content block.
   */
  title: _propTypes.default.string.isRequired,

  /**
   * Subheading of the content block.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Link list items.
   */
  items: _propTypes.default.shape({
    heading: _propTypes.default.string.isRequired,
    items: _propTypes.default.arrayOf(_propTypes.default.shape({
      style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
      type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
      copy: _propTypes.default.string,
      href: _propTypes.default.string,
      customClassName: _propTypes.default.string
    })).isRequired
  }).isRequired,

  /**
   * Simple content item.
   */
  copy: _propTypes.default.string,

  /**
   * Media Type [image, video or none].
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
   * CTA props.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    customClassName: _propTypes.default.string
  })
};
LeadSpaceBlock.defaultProps = {
  copy: '',
  mediaType: null,
  mediaData: null,
  cta: null
};
var _default = LeadSpaceBlock;
exports.default = _default;