import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import { CTA } from '../CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { HorizontalRule } from '../HorizontalRule';
import { ImageWithCaption } from '../ImageWithCaption';
import { LinkList } from '../LinkList';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../VideoPlayer';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * renders media either video or image content
 *
 * @param {string} type media type
 * @param {object} data media data
 * @returns {*} Image or Video
 */

var _renderMedia = function _renderMedia(type, data) {
  if (data) {
    return React.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--leadspace-block__media"),
      className: "".concat(prefix, "--leadspace-block__media")
    }, type === 'image' && React.createElement(ImageWithCaption, data), type === 'video' && React.createElement(VideoPlayer, data));
  }
};
/**
 * Lead space block component (left-aligned).
 */


var LeadSpaceBlock = function LeadSpaceBlock(_ref) {
  var title = _ref.title,
      heading = _ref.heading,
      copy = _ref.copy,
      mediaType = _ref.mediaType,
      mediaData = _ref.mediaData,
      items = _ref.items,
      cta = _ref.cta;
  var pageTitle = React.createElement("div", null, title && React.createElement("h1", {
    "data-autoid": "".concat(stablePrefix, "--leadspace-block__title"),
    className: "".concat(prefix, "--leadspace-block__title")
  }, title));
  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--leadspace-block"),
    className: "".concat(prefix, "--leadspace-block")
  }, pageTitle, React.createElement(ContentBlock, {
    heading: heading,
    copy: copy
  }, _renderMedia(mediaType, mediaData), React.createElement(LinkList, {
    style: "vertical-end",
    heading: items.heading,
    items: items.items
  }), React.createElement(CTA, _extends({
    customClassName: "".concat(prefix, "--leadspace-block__cta ").concat(prefix, "--leadspace-block__cta-col")
  }, cta))), React.createElement(HorizontalRule, null));
};

LeadSpaceBlock.propTypes = {
  /**
   * Heading of the content block.
   */
  title: PropTypes.string.isRequired,

  /**
   * Subheading of the content block.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Link list items.
   */
  items: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
      type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
      copy: PropTypes.string,
      href: PropTypes.string,
      customClassName: PropTypes.string
    })).isRequired
  }).isRequired,

  /**
   * Simple content item.
   */
  copy: PropTypes.string,

  /**
   * Media Type [image, video or none].
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
   * CTA props.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
    type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string
  })
};
LeadSpaceBlock.defaultProps = {
  copy: '',
  mediaType: null,
  mediaData: null,
  cta: null
};
export default LeadSpaceBlock;