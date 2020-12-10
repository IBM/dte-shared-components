"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _ExpressiveModal = require("../ExpressiveModal");

var _Image = require("../Image");

var _ComposedModal = require("../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _removeHtmlTagEntities = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/removeHtmlTagEntities/removeHtmlTagEntities"));

var _windowOrGlobal = _interopRequireDefault(require("window-or-global"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _uniqueid = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/uniqueid/uniqueid"));

var _VideoPlayer = require("../VideoPlayer");

var _VideoPlayer2 = _interopRequireDefault(require("@carbon/ibmdotcom-services/lib/services/VideoPlayer/VideoPlayer"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * LightboxMediaViewer Component.
 */

var LightboxMediaViewer = function LightboxMediaViewer(_ref) {
  var media = _ref.media,
      onClose = _ref.onClose,
      modalProps = (0, _objectWithoutProperties2.default)(_ref, ["media", "onClose"]);

  var _useState = (0, _react.useState)({
    title: '',
    alt: '',
    description: ''
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      videoData = _useState2[0],
      setVideoData = _useState2[1];
  /**
   * Generates an ID for video title to be used by aria-labelledby.
   */


  var titleId = (0, _uniqueid.default)('dds-');
  /**
   * Generates an ID for video description, to be used by aria-describedby.
   */

  var descriptionId = (0, _uniqueid.default)('dds-');
  var containerRef = (0, _react.useRef)(null);
  /**
   * Adds aria-labelledby attribute to dialog container with video title.
   */

  (0, _react.useEffect)(function () {
    var containerNode = containerRef.current;
    var dialogNode = containerNode.querySelector('div[role="dialog"]');

    if (dialogNode && videoData.title) {
      dialogNode.setAttribute('aria-labelledby', titleId);
    }
  }, [titleId, videoData.title]);
  /**
   * Adds aria-describedby attribute to dialog container with video description.
   */

  (0, _react.useEffect)(function () {
    var containerNode = containerRef.current;
    var dialogNode = containerNode.querySelector('div[role="dialog"]');

    if (dialogNode && videoData.description) {
      dialogNode.setAttribute('aria-describedby', descriptionId);
    }
  }, [descriptionId, videoData.description]);
  (0, _react.useEffect)(function () {
    var stale = false;
    (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var data;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(media.type === 'video')) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return _VideoPlayer2.default.api(media.src);

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
  var videoDesc = (0, _removeHtmlTagEntities.default)(videoData.description);
  return _react.default.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--lightbox-media-viewer"),
    className: "".concat(prefix, "--lightbox-media-viewer"),
    ref: containerRef
  }, _react.default.createElement(_ExpressiveModal.ExpressiveModal, (0, _extends2.default)({
    fullwidth: true
  }, modalProps, {
    onClose: closeModal
  }), _react.default.createElement(_ComposedModal.ModalBody, null, _react.default.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__container")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__row")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__media ").concat(prefix, "--no-gutter")
  }, media.type === 'video' ? _react.default.createElement(_VideoPlayer.VideoPlayer, {
    videoId: media.src,
    autoPlay: true
  }) : _react.default.createElement(_Image.Image, {
    defaultSrc: media.src,
    alt: videoData.alt
  })), _react.default.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__media-description ").concat(prefix, "--no-gutter")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--lightbox-media-viewer__content")
  }, videoData.title && _react.default.createElement("div", {
    id: titleId,
    "data-autoid": "".concat(stablePrefix, "--lightbox-media-viewer__content__title"),
    className: "".concat(prefix, "--lightbox-media-viewer__content__title")
  }, videoData.title), videoData.description && _react.default.createElement("div", {
    id: descriptionId,
    "data-autoid": "".concat(stablePrefix, "--lightbox-media-viewer__content__desc"),
    className: "".concat(prefix, "--lightbox-media-viewer__content__desc")
  }, videoDesc))))))));
  /**
   * Stop video on modal close
   */

  function closeModal() {
    if ((onClose === null || onClose === void 0 ? void 0 : onClose()) !== false) {
      _windowOrGlobal.default.kWidget.addReadyCallback(function (videoId) {
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
  media: _propTypes.default.shape({
    type: _propTypes.default.string,
    src: _propTypes.default.string,
    title: _propTypes.default.string,
    alt: _propTypes.default.string,
    description: _propTypes.default.string
  }).isRequired,

  /**
   * Function to be triggered on close of Modal.
   */
  onClose: _propTypes.default.func
};
var _default = LightboxMediaViewer;
exports.default = _default;