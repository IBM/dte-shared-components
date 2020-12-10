"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _ContentGroupSimple = require("../ContentGroupSimple");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * Content Block - segmented pattern.
 */

var ContentBlockMedia = function ContentBlockMedia(_ref) {
  var copy = _ref.copy,
      heading = _ref.heading,
      items = _ref.items,
      cta = _ref.cta,
      aside = _ref.aside;
  if (cta) cta.style = 'feature';
  var content = items.map(function (item, index) {
    return _react.default.createElement(_ContentGroupSimple.ContentGroupSimple, (0, _extends2.default)({
      key: index
    }, item));
  });
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-media"),
    className: "".concat(prefix, "--content-block-media")
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    copy: copy,
    cta: cta,
    aside: aside
  }, content));
};

ContentBlockMedia.propTypes = {
  /**
   * Short copy to suppport title.
   */
  copy: _propTypes.default.string,

  /**
   * Main title of `<ContentBlockMedia>`.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Array of content items objects to render.
   * Each items have the following structure in summary:
   *
   * | Name        | Required | Data Type | Description                                                                                                                                                                        |
   * | ----------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading`   | YES      | String    | Describes the block that it is a part of.                                                                                                                                          |
   * | `mediaData` | YES      | Object    | See `mediaData` below.                                                                                                                                                             |
   * | `cta`       | NO       | Object    | See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details. |
   *
   * `mediaData`:
   *
   * | Name      | Description                                                                                                                            |
   * | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | Describes the media section                                                                                                            |
   * | `image`   | See See [`<Image>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-image--default#props) for full usage details. |
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    heading: _propTypes.default.string.isRequired,
    mediaType: _propTypes.default.oneOf(['image', 'video']),
    mediaData: _propTypes.default.oneOfType([_propTypes.default.shape({
      inverse: _propTypes.default.bool,
      image: _propTypes.default.shape({
        classname: _propTypes.default.string,
        sources: _propTypes.default.arrayOf(_propTypes.default.shape({
          src: _propTypes.default.string,
          breakpoint: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
        })),
        defaultSrc: _propTypes.default.string.isRequired,
        alt: _propTypes.default.string.isRequired,
        longDescription: _propTypes.default.string
      }).isRequired,
      lightbox: _propTypes.default.bool,
      heading: _propTypes.default.string,
      copy: _propTypes.default.string,
      customClassName: _propTypes.default.string
    }), _propTypes.default.shape({
      customClassName: _propTypes.default.string,
      videoId: _propTypes.default.string.isRequired,
      showCaption: _propTypes.default.bool,
      inverse: _propTypes.default.bool
    })]).isRequired,
    items: _propTypes.default.arrayOf(_propTypes.default.shape({
      cta: _propTypes.default.shape({
        style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
        type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
        copy: _propTypes.default.string,
        href: _propTypes.default.string,
        customClassName: _propTypes.default.string
      }),
      customClassName: _propTypes.default.string,
      copy: _propTypes.default.string,
      heading: _propTypes.default.string,
      mediaType: _propTypes.default.oneOf(['image', 'video']),
      mediaData: _propTypes.default.oneOfType([_propTypes.default.shape({
        inverse: _propTypes.default.bool,
        image: _propTypes.default.shape({
          classname: _propTypes.default.string,
          sources: _propTypes.default.arrayOf(_propTypes.default.shape({
            src: _propTypes.default.string,
            breakpoint: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
          })),
          defaultSrc: _propTypes.default.string.isRequired,
          alt: _propTypes.default.string.isRequired,
          longDescription: _propTypes.default.string
        }).isRequired,
        lightbox: _propTypes.default.bool,
        heading: _propTypes.default.string,
        copy: _propTypes.default.string,
        customClassName: _propTypes.default.string
      }), _propTypes.default.shape({
        customClassName: _propTypes.default.string,
        videoId: _propTypes.default.string.isRequired,
        showCaption: _propTypes.default.bool,
        inverse: _propTypes.default.bool
      })]),
      inverse: _propTypes.default.bool
    })).isRequired,
    cta: _propTypes.default.shape({
      style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
      type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
      copy: _propTypes.default.string,
      href: _propTypes.default.string,
      customClassName: _propTypes.default.string
    })
  })).isRequired,

  /**
   * Optional CTA. Must be `Feature Link`.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    style: _propTypes.default.oneOf(['feature']),
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    customClassName: _propTypes.default.string
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
  aside: _propTypes.default.object
};
var _default = ContentBlockMedia;
exports.default = _default;