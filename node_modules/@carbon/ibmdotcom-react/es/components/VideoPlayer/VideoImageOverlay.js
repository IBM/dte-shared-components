/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { Image } from '../Image';

var PlayIcon = function PlayIcon(props) {
  return React.createElement("svg", props, React.createElement("title", null, "Group 3"), React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React.createElement("circle", {
    fillOpacity: ".9",
    fill: "#525252",
    cx: "32",
    cy: "32",
    r: "32"
  }), React.createElement("path", {
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
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * VideoPlayer Image Overlay component
 */

var VideoImageOverlay = function VideoImageOverlay(_ref) {
  var videoId = _ref.videoId,
      videoData = _ref.videoData,
      embedVideo = _ref.embedVideo;
  return React.createElement("button", {
    className: "".concat(prefix, "--video-player__image-overlay"),
    "data-autoid": "".concat(stablePrefix, "--video-player__image-overlay"),
    onClick: function onClick() {
      return _embedPlayer(event, embedVideo);
    }
  }, React.createElement(Image, {
    defaultSrc: VideoPlayerAPI.getThumbnailUrl({
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
  videoId: PropTypes.string.isRequired,

  /**
   * Object containing videoData such as name, description, duration, etc.
   */
  videoData: PropTypes.object,

  /**
   * Func to set state to trigger embedding of video
   */
  embedVideo: PropTypes.func
};
export default VideoImageOverlay;