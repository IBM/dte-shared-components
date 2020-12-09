import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';
import VideoImageOverlay from './VideoImageOverlay';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * VideoPlayer component.
 */

var VideoPlayer = function VideoPlayer(_ref) {
  var showCaption = _ref.showCaption,
      videoId = _ref.videoId,
      customClassName = _ref.customClassName,
      autoPlay = _ref.autoPlay,
      aspectRatio = _ref.aspectRatio;

  var _useState = useState({
    description: '',
    name: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      videoData = _useState2[0],
      setVideoData = _useState2[1]; // embedVideo is set to true when overlay thumbnail is clicked


  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      embedVideo = _useState4[0],
      setEmbedVideo = _useState4[1];

  var videoPlayerId = uniqueid("video-player__video-".concat(videoId, "-"));
  var videoDuration = VideoPlayerAPI.getVideoDuration(videoData.msDuration);
  useEffect(function () {
    var stale = false;

    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var newVideoData;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(autoPlay || embedVideo)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return VideoPlayerAPI.embedVideo(videoId, "".concat(prefix, "--").concat(videoPlayerId), true);

            case 3:
              if (!stale) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              _context.next = 7;
              return VideoPlayerAPI.api(videoId);

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
  var classnames = cx("".concat(prefix, "--video-player"), customClassName);
  var aspectRatioClass = cx(_defineProperty({}, "".concat(prefix, "--video-player__aspect-ratio--").concat(aspectRatio), aspectRatio));
  return React.createElement("div", {
    "aria-label": "".concat(videoData.name, " ").concat(videoDuration),
    className: classnames
  }, React.createElement("div", {
    className: "".concat(prefix, "--video-player__video-container ").concat(aspectRatioClass),
    "data-autoid": "".concat(stablePrefix, "--video-player__video-").concat(videoId)
  }, React.createElement("div", {
    className: "".concat(prefix, "--video-player__video"),
    id: "".concat(prefix, "--").concat(videoPlayerId)
  }, !autoPlay && React.createElement(VideoImageOverlay, {
    videoId: videoId,
    videoData: videoData,
    embedVideo: setEmbedVideo
  }))), showCaption && React.createElement("div", {
    className: "".concat(prefix, "--video-player__video-caption")
  }, videoData.name, " ", videoDuration));
};

VideoPlayer.propTypes = {
  /**
   * `true` to autoplay the video on load
   */
  autoPlay: PropTypes.bool,

  /**
   * Override default aspect ratio of `16x9`.
   * Available aspect ratios:
   *
   * `16x9`, `9x16`, `2x1`, `1x2`, `4x3`, `3x4`, `1x1`
   */
  aspectRatio: PropTypes.string,

  /**
   * The CSS class name to apply.
   */
  customClassName: PropTypes.string,

  /**
   * Video ID from Kaltura video platform.
   */
  videoId: PropTypes.string.isRequired,

  /**
   * `true` to show the description.
   */
  showCaption: PropTypes.bool
};
VideoPlayer.defaultProps = {
  autoPlay: false
};
export default VideoPlayer;