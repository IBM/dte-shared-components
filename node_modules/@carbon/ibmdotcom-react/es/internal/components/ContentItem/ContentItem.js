import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CTA } from '../../../components/CTA';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../../../components/VideoPlayer';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
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
  var classnames = cx("".concat(prefix, "--content-item"), _defineProperty({}, "".concat(prefix, "--content-item--inverse"), inverse), customClassName);
  return React.createElement("div", {
    className: classnames,
    "data-autoid": "".concat(stablePrefix, "--content-item")
  }, heading && React.createElement("h4", {
    "data-autoid": "".concat(stablePrefix, "--content-item__heading"),
    className: "".concat(prefix, "--content-item__heading")
  }, heading), _renderMedia(mediaType, mediaData, inverse), copy && React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-item__copy"),
    className: "".concat(prefix, "--content-item__copy"),
    dangerouslySetInnerHTML: {
      __html: markdownToHtml(copy, {
        bold: false
      })
    }
  }), cta && React.createElement(CTA, {
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
    return React.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-item__media")
    }, type === 'image' && React.createElement(ImageWithCaption, _extends({
      inverse: inverse
    }, data)), type === 'video' && React.createElement(VideoPlayer, _extends({
      inverse: inverse
    }, data)));
  }
};

ContentItem.propTypes = {
  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string
  }),

  /**
   * Allows user to pass in custom class name.
   */
  customClassName: PropTypes.string,

  /**
   * Copy text.
   */
  copy: PropTypes.string,

  /**
   * Heading text.
   */
  heading: PropTypes.string,

  /**
   * Determines media type (image or video).
   */
  mediaType: PropTypes.oneOf(['image', 'video']),

  /**
   * Media Data for either image or video.
   * See the following components' README for more details:
   *
   * * `mediaType="image"`: [`<ImageWithCaption>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-imagewithcaption--default#props)
   * * `mediaType="video"`: [`<VideoPlayer>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-videoplayer--default#props)
   */
  mediaData: PropTypes.oneOfType([PropTypes.shape({
    inverse: PropTypes.bool,
    image: PropTypes.shape({
      classname: PropTypes.string,
      sources: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
        breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })),
      defaultSrc: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      longDescription: PropTypes.string
    }).isRequired,
    lightbox: PropTypes.bool,
    heading: PropTypes.string,
    copy: PropTypes.string,
    customClassName: PropTypes.string
  }), PropTypes.shape({
    customClassName: PropTypes.string,
    videoId: PropTypes.string.isRequired,
    showCaption: PropTypes.bool,
    inverse: PropTypes.bool
  })]),

  /**
   * `true` to changes theme to inverse.
   */
  inverse: PropTypes.bool
};
export default ContentItem;