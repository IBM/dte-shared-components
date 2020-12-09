import _extends from "@babel/runtime/helpers/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState, useRef } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { ExpressiveModal } from '../ExpressiveModal';
import { Image } from '../Image';
import { ModalBody } from '../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal';
import PropTypes from 'prop-types';
import removeHtmlTagEntities from '@carbon/ibmdotcom-utilities/es/utilities/removeHtmlTagEntities/removeHtmlTagEntities';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';
import { VideoPlayer } from '../VideoPlayer';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * LightboxMediaViewer Component.
 */

var LightboxMediaViewer = function LightboxMediaViewer(_ref) {
  var media = _ref.media,
      onClose = _ref.onClose,
      modalProps = _objectWithoutProperties(_ref, ["media", "onClose"]);

  var _useState = useState({
    title: '',
    alt: '',
    description: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      videoData = _useState2[0],
      setVideoData = _useState2[1];
  /**
   * Generates an ID for video title to be used by aria-labelledby.
   */


  var titleId = uniqueid('dds-');
  /**
   * Generates an ID for video description, to be used by aria-describedby.
   */

  var descriptionId = uniqueid('dds-');
  var containerRef = useRef(null);
  /**
   * Adds aria-labelledby attribute to dialog container with video title.
   */

  useEffect(function () {
    var containerNode = containerRef.current;
    var dialogNode = containerNode.querySelector('div[role="dialog"]');

    if (dialogNode && videoData.title) {
      dialogNode.setAttribute('aria-labelledby', titleId);
    }
  }, [titleId, videoData.title]);
  /**
   * Adds aria-describedby attribute to dialog container with video description.
   */

  useEffect(function () {
    var containerNode = containerRef.current;
    var dialogNode = containerNode.querySelector('div[role="dialog"]');

    if (dialogNode && videoData.description) {
      dialogNode.setAttribute('aria-describedby', descriptionId);
    }
  }, [descriptionId, videoData.description]);
  useEffect(function () {
    var stale = false;

    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var data;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(media.type === 'video')) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return VideoPlayerAPI.api(media.src);

            case 3:
              data = _context.sent;

              if (!stale) {
                setVideoData({
                  title: data.name,
                  alt: data.name,
                  description: data.description
                });
              }

              _context.next = 8;
              break;

            case 7:
              setVideoData({
                title: media.title,
                alt: media.alt,
                description: media.description
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();

    return function () {
      stale = true;
    };
  }, [media]);
  var videoDesc = removeHtmlTagEntities(videoData.description);
  return React.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--lightbox-media-viewer"),
    className: "".concat(prefix, "--lightbox-media-viewer"),
    ref: containerRef
  }, React.createElement(ExpressiveModal, _extends({
    fullwidth: true
  }, modalProps, {
    onClose: closeModal
  }), React.createElement(ModalBody, null, React.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__container")
  }, React.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__row")
  }, React.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__media ").concat(prefix, "--no-gutter")
  }, media.type === 'video' ? React.createElement(VideoPlayer, {
    videoId: media.src,
    autoPlay: true
  }) : React.createElement(Image, {
    defaultSrc: media.src,
    alt: videoData.alt
  })), React.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__media-description ").concat(prefix, "--no-gutter")
  }, React.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__content")
  }, videoData.title && React.createElement("div", {
    id: titleId,
    "data-autoid": "".concat(stablePrefix, "--lightbox-media-viewer__content__title"),
    className: "".concat(prefix, "--lightbox-media-viewer__content__title")
  }, videoData.title), videoData.description && React.createElement("div", {
    id: descriptionId,
    "data-autoid": "".concat(stablePrefix, "--lightbox-media-viewer__content__desc"),
    className: "".concat(prefix, "--lightbox-media-viewer__content__desc")
  }, videoDesc))))))));
  /**
   * Stop video on modal close
   */

  function closeModal() {
    if ((onClose === null || onClose === void 0 ? void 0 : onClose()) !== false) {
      root.kWidget.addReadyCallback(function (videoId) {
        var kdp = document.getElementById(videoId);
        kdp.sendNotification('doStop');
      });
    }
  }
};

LightboxMediaViewer.propTypes = {
  /**
   * Object containing media info. The structure is:
   *
   * | Name          | Data Type | Description                                                           |
   * | ------------- | --------- | --------------------------------------------------------------------- |
   * | `type`        | String    | Determines whether to render `image` or `video`                       |
   * | `src`         | String    | Image link or video id                                                |
   * | `alt`         | String    | Alternate text for image. For video, this is generated from api call. |
   * | `title`       | String    | Title copy. For video, this is generated from api call.               |
   * | `description` | String    | Description copy. For video, this is generated from api call.         |
   */
  media: PropTypes.shape({
    type: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string,
    description: PropTypes.string
  }).isRequired,

  /**
   * Function to be triggered on close of Modal.
   */
  onClose: PropTypes.func
};
export default LightboxMediaViewer;