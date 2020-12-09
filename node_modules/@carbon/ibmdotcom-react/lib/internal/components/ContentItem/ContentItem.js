"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _CTA = require("../../../components/CTA");

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _ImageWithCaption = require("../../../components/ImageWithCaption");

var _markdownToHtml = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/markdownToHtml/markdownToHtml"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _VideoPlayer = require("../../../components/VideoPlayer");

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * ContentItem Component
 *
 * @param {object} props props object
 * @param {boolean} props.inverse inverse class
 * @param {string} props.customClassName allows user to pass in custom class name
 * @param {string} props.cta cta object
 * @param {string} props.copy copy text
 * @param {string} props.heading  heading object
 * @param {string} props.mediaType Determines the media type (image or video)
 * @param {object} props.mediaData Data properties for image or video
 * @returns {*} JSX ContentItem component
 */

var ContentItem = function ContentItem(_ref) {
  var cta = _ref.cta,
      copy = _ref.copy,
      heading = _ref.heading,
      mediaType = _ref.mediaType,
      mediaData = _ref.mediaData,
      inverse = _ref.inverse,
      customClassName = _ref.customClassName;
  var classnames = (0, _classnames.default)("".concat(prefix, "--content-item"), (0, _defineProperty2.default)({}, "".concat(prefix, "--content-item--inverse"), inverse), customClassName);
  return _react.default.createElement("div", {
    className: classnames,
    "data-autoid": "".concat(stablePrefix, "--content-item")
  }, heading && _react.default.createElement("h4", {
    "data-autoid": "".concat(stablePrefix, "--content-item__heading"),
    className: "".concat(prefix, "--content-item__heading")
  }, heading), _renderMedia(mediaType, mediaData, inverse), copy && _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-item__copy"),
    className: "".concat(prefix, "--content-item__copy"),
    dangerouslySetInnerHTML: {
      __html: (0, _markdownToHtml.default)(copy, {
        bold: false
      })
    }
  }), cta && _react.default.createElement(_CTA.CTA, {
    style: "text",
    type: cta.type,
    copy: cta.copy,
    href: cta.href,
    customClassName: "".concat(prefix, "--content-item__cta")
  }));
};
/**
 * renders either video or image content
 *
 * @param {string} type cta type ( external | jump | local)
 * @param {object} data cta type ( external | jump | local)
 * @param {boolean} inverse inverse type
 * @private
 * @returns {*} media component
 */


var _renderMedia = function _renderMedia(type, data, inverse) {
  if (data) {
    return _react.default.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-item__media")
    }, type === 'image' && _react.default.createElement(_ImageWithCaption.ImageWithCaption, (0, _extends2.default)({
      inverse: inverse
    }, data)), type === 'video' && _react.default.createElement(_VideoPlayer.VideoPlayer, (0, _extends2.default)({
      inverse: inverse
    }, data)));
  }
};

ContentItem.propTypes = {
  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
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
};
var _default = ContentItem;
exports.default = _default;