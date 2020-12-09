"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _uniqueid = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/uniqueid/uniqueid"));

var _VideoImageOverlay = _interopRequireDefault(require("./VideoImageOverlay"));

var _VideoPlayer = _interopRequireDefault(require("@carbon/ibmdotcom-services/lib/services/VideoPlayer/VideoPlayer"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * VideoPlayer component.
 */

var VideoPlayer = function VideoPlayer(_ref) {
  var showCaption = _ref.showCaption,
      videoId = _ref.videoId,
      customClassName = _ref.customClassName,
      autoPlay = _ref.autoPlay,
      aspectRatio = _ref.aspectRatio;

  var _useState = (0, _react.useState)({
    description: '',
    name: ''
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      videoData = _useState2[0],
      setVideoData = _useState2[1]; // embedVideo is set to true when overlay thumbnail is clicked


  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      embedVideo = _useState4[0],
      setEmbedVideo = _useState4[1];

  var videoPlayerId = (0, _uniqueid.default)("video-player__video-".concat(videoId, "-"));

  var videoDuration = _VideoPlayer.default.getVideoDuration(videoData.msDuration);

  (0, _react.useEffect)(function () {
    var stale = false;
    (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var newVideoData;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(autoPlay || embedVideo)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return _VideoPlayer.default.embedVideo(videoId, "".concat(prefix, "--").concat(videoPlayerId), true);

            case 3:
              if (!stale) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              _context.next = 7;
              return _VideoPlayer.default.api(videoId);

            case 7:
              newVideoData = _context.sent;

              if (!stale) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return");

            case 10:
              setVideoData(newVideoData);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
    return function () {
      stale = true;
    };
  }, [autoPlay, videoId, videoPlayerId, embedVideo]);
  var classnames = (0, _classnames.default)("".concat(prefix, "--video-player"), customClassName);
  var aspectRatioClass = (0, _classnames.default)((0, _defineProperty2.default)({}, "".concat(prefix, "--video-player__aspect-ratio--").concat(aspectRatio), aspectRatio));
  return _react.default.createElement("div", {
    "aria-label": "".concat(videoData.name, " ").concat(videoDuration),
    className: classnames
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--video-player__video-container ").concat(aspectRatioClass),
    "data-autoid": "".concat(stablePrefix, "--video-player__video-").concat(videoId)
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--video-player__video"),
    id: "".concat(prefix, "--").concat(videoPlayerId)
  }, !autoPlay && _react.default.createElement(_VideoImageOverlay.default, {
    videoId: videoId,
    videoData: videoData,
    embedVideo: setEmbedVideo
  }))), showCaption && _react.default.createElement("div", {
    className: "".concat(prefix, "--video-player__video-caption")
  }, videoData.name, " ", videoDuration));
};

VideoPlayer.propTypes = {
  /**
   * `true` to autoplay the video on load
   */
  autoPlay: _propTypes.default.bool,

  /**
   * Override default aspect ratio of `16x9`.
   * Available aspect ratios:
   *
   * `16x9`, `9x16`, `2x1`, `1x2`, `4x3`, `3x4`, `1x1`
   */
  aspectRatio: _propTypes.default.string,

  /**
   * The CSS class name to apply.
   */
  customClassName: _propTypes.default.string,

  /**
   * Video ID from Kaltura video platform.
   */
  videoId: _propTypes.default.string.isRequired,

  /**
   * `true` to show the description.
   */
  showCaption: _propTypes.default.bool
};
VideoPlayer.defaultProps = {
  autoPlay: false
};
var _default = VideoPlayer;
exports.default = _default;