"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _Image = require("../Image");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _VideoPlayer = _interopRequireDefault(require("@carbon/ibmdotcom-services/lib/services/VideoPlayer/VideoPlayer"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * VideoPlayer Image Overlay component
 */

var VideoImageOverlay = function VideoImageOverlay(_ref) {
  var videoId = _ref.videoId,
      videoData = _ref.videoData,
      embedVideo = _ref.embedVideo;
  return _react.default.createElement("button", {
    className: "".concat(prefix, "--video-player__image-overlay"),
    "data-autoid": "".concat(stablePrefix, "--video-player__image-overlay"),
    onClick: function onClick() {
      return _embedPlayer(event, embedVideo);
    }
  }, _react.default.createElement(_Image.Image, {
    defaultSrc: _VideoPlayer.default.getThumbnailUrl({
      videoId: videoId,
      width: '655'
    }),
    alt: videoData.name,
    icon: PlayIcon
  }));
};

var _embedPlayer = function _embedPlayer(e, embedVideo) {
  var element = e.target;
  element.remove();
  embedVideo(true);
};

VideoImageOverlay.propTypes = {
  /**
   * Video ID from Kaltura video platform.
   */
  videoId: _propTypes.default.string.isRequired,

  /**
   * Object containing videoData such as name, description, duration, etc.
   */
  videoData: _propTypes.default.object,

  /**
   * Func to set state to trigger embedding of video
   */
  embedVideo: _propTypes.default.func
};
var _default = VideoImageOverlay;
exports.default = _default;