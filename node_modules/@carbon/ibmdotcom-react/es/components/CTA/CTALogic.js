import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20';
import ArrowLeft20 from '@carbon/icons-react/es/arrow--left/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import Download20 from '@carbon/icons-react/es/download/20';
import Launch20 from '@carbon/icons-react/es/launch/20';
import { LightboxMediaViewer } from '../LightboxMediaViewer';
import PlayOutline20 from '@carbon/icons-react/es/play--outline/20';
import React from 'react';
import smoothScroll from '@carbon/ibmdotcom-utilities/es/utilities/smoothScroll/smoothScroll';
/**
 * The logic behind the CTA component
 */

var CTALogic = /*#__PURE__*/function () {
  function CTALogic() {
    _classCallCheck(this, CTALogic);
  }

  _createClass(CTALogic, null, [{
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
      return type === 'jump' ? smoothScroll(e) : null;
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
          return Download20;

        case 'external':
          return Launch20;

        case 'jump':
          return ArrowDown20;

        case 'video':
          return PlayOutline20;

        case 'default':
          return null;

        default:
          return iconPlacement === 'left' ? ArrowLeft20 : ArrowRight20;
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
      return renderLightBox && React.createElement(LightboxMediaViewer, {
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

export default CTALogic;