import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import ContentGroup from '../../internal/components/ContentGroup/ContentGroup';
import ContentItem from '../../internal/components/ContentItem/ContentItem';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { ImageWithCaption } from '../ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../VideoPlayer';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Content Block - Segmented pattern.
 */

var ContentBlockSegmented = function ContentBlockSegmented(_ref) {
  var copy = _ref.copy,
      cta = _ref.cta,
      heading = _ref.heading,
      mediaType = _ref.mediaType,
      mediaData = _ref.mediaData,
      items = _ref.items,
      aside = _ref.aside;
  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-segmented"),
    className: "".concat(prefix, "--content-block-segmented")
  }, React.createElement(ContentBlock, {
    heading: heading,
    copy: copy,
    cta: cta,
    aside: aside
  }, _renderMedia(mediaType, mediaData), _renderGroup(items)));
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
    return React.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-block-segmented__media")
    }, type === 'image' && React.createElement(ImageWithCaption, data), type === 'video' && React.createElement(VideoPlayer, data));
  }
};
/**
 *
 * @param {object} items content item data
 * @returns {*} JSX Component with the media
 */


var _renderGroup = function _renderGroup(items) {
  return items.map(function (item, index) {
    return React.createElement(ContentGroup, {
      heading: item.heading,
      key: index,
      cta: item.cta && (item.cta.type === 'jump' || item.cta.type === 'local') ? _objectSpread({
        style: 'text'
      }, item.cta) : undefined
    }, React.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-block-segmented__content-group")
    }, React.createElement(ContentItem, {
      copy: item.copy,
      key: index
    }), item.image && React.createElement("div", {
      "data-autoid": "".concat(stablePrefix, "--content-block-segmented__media")
    }, React.createElement(ImageWithCaption, item.image))));
  });
};

ContentBlockSegmented.propTypes = {
  /**
   * Main title of pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Short copy to suppport title.
   */
  copy: PropTypes.string,

  /**
   * Supports `text` and `card` styles.
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
   * Array of content items to render. Has the following structure for each items:
   *
   * | Name      | Required | Data Type | Description                                                                                                                                                                                                             |
   * | --------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | YES      | String    | Short copy describing content item.                                                                                                                                                                                     |
   * | `image`   | NO       | Object    | See the [`Image`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/Image) component for full usage details.                                                         |
   * | `cta`     | NO       | Object    | `jump` and `local` types are allowed, for more information, see the [`CTA`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA) component for full usage details. |
   * | `copy`    | YES      | String    | Item content.                                                                                                                                                                                                           |
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    copy: PropTypes.string,
    image: PropTypes.shape({
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
    }),
    cta: PropTypes.shape({
      style: PropTypes.oneOf(['card']),
      type: PropTypes.oneOf(['local']),
      copy: PropTypes.string,
      customClassName: PropTypes.string
    })
  })).isRequired,

  /**
   * Object containing elements to be rendered within <aside> html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: PropTypes.shape({
    items: PropTypes.element,
    border: PropTypes.bool
  })
};
export default ContentBlockSegmented;