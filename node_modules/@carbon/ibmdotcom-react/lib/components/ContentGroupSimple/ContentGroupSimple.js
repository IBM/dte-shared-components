"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ContentGroup = _interopRequireDefault(require("../../internal/components/ContentGroup/ContentGroup"));

var _ContentItem = _interopRequireDefault(require("../../internal/components/ContentItem/ContentItem"));

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
var prefix = _settings2.default.prefix;
var stablePrefix = _settings.default.stablePrefix;
/**
 * ContentGroupSimple.
 */

var ContentGroupSimple = function ContentGroupSimple(_ref) {
  var heading = _ref.heading,
      mediaType = _ref.mediaType,
      mediaData = _ref.mediaData,
      items = _ref.items,
      cta = _ref.cta,
      copy = _ref.copy;
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group-simple"),
    className: "".concat(prefix, "--content-group-simple")
  }, _react.default.createElement(_ContentGroup.default, {
    cta: cta,
    heading: heading,
    copy: copy
  }, _renderMedia(mediaType, mediaData), _renderContent(items)));
};
/**
 *
 * @param {Array} items Array of data for ContentItems to be rendered
 * @returns {*} Array of ContentItem Components
 */


var _renderContent = function _renderContent(items) {
  return items.map(function (item, index) {
    return _react.default.createElement(_ContentItem.default, (0, _extends2.default)({}, item, {
      key: index
    }));
  });
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
      "data-autoid": "".concat(stablePrefix, "--content-group-simple__media")
    }, type === 'image' && _react.default.createElement(_ImageWithCaption.ImageWithCaption, data), type === 'video' && _react.default.createElement(_VideoPlayer.VideoPlayer, data));
  }
};

ContentGroupSimple.propTypes = {
  /**
   * Main heading of the pattern.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: _propTypes.default.string,

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
   * Data to be used on `<ContentItem>`s.
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    cta: _propTypes.default.shape({
      type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
      copy: _propTypes.default.string,
      href: _propTypes.default.string,
      customClassName: _propTypes.default.string
    }),

    /**
     * Allows user to pass in custom class name.
     */
    customClassName: _propTypes.default.string,

    /**
     * Copy text.
     */
    copy: _propTypes.default.string,

    /**
     * Heading text.
     */
    heading: _propTypes.default.string,

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
     * `true` to changes theme to inverse.
     */
    inverse: _propTypes.default.bool
  })).isRequired,

  /**
   * Data to be used on CTA.
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
var _default = ContentGroupSimple;
exports.default = _default;