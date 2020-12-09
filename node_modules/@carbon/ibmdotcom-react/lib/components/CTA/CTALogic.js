"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/arrow--down/20"));

var _2 = _interopRequireDefault(require("@carbon/icons-react/lib/arrow--left/20"));

var _3 = _interopRequireDefault(require("@carbon/icons-react/lib/arrow--right/20"));

var _4 = _interopRequireDefault(require("@carbon/icons-react/lib/download/20"));

var _5 = _interopRequireDefault(require("@carbon/icons-react/lib/launch/20"));

var _LightboxMediaViewer = require("../LightboxMediaViewer");

var _6 = _interopRequireDefault(require("@carbon/icons-react/lib/play--outline/20"));

var _react = _interopRequireDefault(require("react"));

var _smoothScroll = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/smoothScroll/smoothScroll"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The logic behind the CTA component
 */
var CTALogic = /*#__PURE__*/function () {
  function CTALogic() {
    (0, _classCallCheck2.default)(this, CTALogic);
  }

  (0, _createClass2.default)(CTALogic, null, [{
    key: "getVideoId",

    /**
     * extract video id from props
     *
     * @param {string} style cta type ( external | jump | local)
     * @param {object} otherProps cta type ( external | jump | local)
     * @returns {*} behaviour object
     */
    value: function getVideoId(style, otherProps) {
      switch (style) {
        case 'text':
          return [{
            src: otherProps.media.src
          }];

        case 'card':
          return [{
            src: otherProps.media.src
          }];

        case 'feature':
          return [{
            src: otherProps.card.cta.media.src
          }];

        case 'button':
          {
            var videoIds = otherProps.buttons.map(function (button, key) {
              if (button.type === 'video' && button.media) return {
                src: button.media.src,
                key: key
              };
            }).filter(function (id) {
              return id && id;
            });
            return videoIds;
          }

        default:
          return [];
      }
    }
    /**
     * jump to target element  onClick
     *
     * @param {*} e event object
     * @param {string} type cta type ( external | jump | local)
     * @returns {*} behaviour object
     */

  }, {
    key: "jump",
    value: function jump(e, type) {
      return type === 'jump' ? (0, _smoothScroll.default)(e) : null;
    }
    /**
     * sets target
     *
     * @param {string} type cta type ( external | jump | local)
     * @returns {string} target value
     */

  }, {
    key: "external",
    value: function external(type) {
      return type === 'external' ? '_blank' : null;
    }
    /**
     * sets icon based on link type
     *
     * @param {string} type cta type ( external | jump | local)
     * @returns {*} cta type component
     */

  }, {
    key: "iconSelector",
    value: function iconSelector(type, iconPlacement) {
      switch (type) {
        case 'download':
          return _4.default;

        case 'external':
          return _5.default;

        case 'jump':
          return _.default;

        case 'video':
          return _6.default;

        case 'default':
          return null;

        default:
          return iconPlacement === 'left' ? _2.default : _3.default;
      }
    }
    /**
     * Opens the LightBoxMediaViewer component when CTA is clicked
     *
     * @param {boolean} renderLightBox determine whether to render the lightbox
     * @param {Function} openLightBox func to toggle the lightbox
     * @param {object} media media object to render within the lightbox
     * @returns {*} lightbox component
     */

  }, {
    key: "launchLightBox",
    value: function launchLightBox(renderLightBox, openLightBox, media) {
      return renderLightBox && _react.default.createElement(_LightboxMediaViewer.LightboxMediaViewer, {
        media: media,
        open: true,
        onClose: function onClose() {
          return openLightBox(false);
        }
      });
    }
    /**
     *
     * @param {*} e event
     * @param {Function} openLightBox function to toggle lightbox
     *
     * @returns {*} set lightbox state
     */

  }, {
    key: "setLightBox",
    value: function setLightBox(e, openLightBox) {
      e.preventDefault();
      return openLightBox(true);
    }
  }]);
  return CTALogic;
}();

var _default = CTALogic;
exports.default = _default;