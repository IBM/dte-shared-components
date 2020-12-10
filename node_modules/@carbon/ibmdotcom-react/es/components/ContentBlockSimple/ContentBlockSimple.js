import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import ContentItem from '../../internal/components/ContentItem/ContentItem';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { ImageWithCaption } from '../ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../VideoPlayer';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Content Block - Simple pattern.
 */

var ContentBlockSimple = function ContentBlockSimple(_ref) {
  var copy = _ref.copy,
      heading = _ref.heading,
      mediaType = _ref.mediaType,
      mediaData = _ref.mediaData,
      cta = _ref.cta,
      aside = _ref.aside;
  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-simple"),
    className: "".concat(prefix, "--content-block-simple")
  }, React.createElement(ContentBlock, {
    heading: heading,
    cta: cta,
    aside: aside
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-block-simple__content")
  }, React.createElement(ContentItem, {
    copy: copy
  }), _renderMedia(mediaType, mediaData))));
};
/**
 * renders either video or image content
 *
 * @param {string} type cta type ( external | jump | local)
 * @param {object} data cta type ( external | jump | local)
 * @private
 * @returns {*} media component
 */


var _renderMedia = function _renderMedia(type, data) {
  if (data) {
    var _cx;

    return React.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-block-simple__media"),
      className: cx((_cx = {}, _defineProperty(_cx, "".concat(prefix, "--content-block-simple__media-video"), type === 'video'), _defineProperty(_cx, "".concat(prefix, "--content-block-simple__media-image"), type === 'image'), _cx))
    }, type === 'image' && React.createElement(ImageWithCaption, data), type === 'video' && React.createElement(VideoPlayer, data));
  }
};

ContentBlockSimple.propTypes = {
  /**
   * Simple content item.
   * Uses [`markdownToHtml`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/utilities/src/utilities/markdownToHtml) utility.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Title of the content block.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Determines media type (image or video).
   */
  mediaType: PropTypes.string,

  /**
   * Media Data for either image or video.
   * See the following components' README for more details:
   *
   * * `mediaType="image"`: [`<ImageWithCaption>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-imagewithcaption--default#props)
   * * `mediaType="video"`: [`<VideoPlayer>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-videoplayer--default#props)
   */
  mediaData: PropTypes.oneOfType([PropTypes.shape({
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
    showCaption: PropTypes.bool
  })]),

  /**
   * CTA used at the end of content body.
   * `Text` and `Card` styles supported.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card']),
    type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string
  }),

  /**
   * Object containing elements to be rendered within <aside> html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: PropTypes.object
};
export default ContentBlockSimple;