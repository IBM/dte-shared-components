"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _ContentGroupCards = require("../ContentGroupCards");

var _ContentGroupPictograms = require("../ContentGroupPictograms");

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
 * ContentBlockMixed Pattern.
 */

var ContentBlockMixed = function ContentBlockMixed(_ref) {
  var heading = _ref.heading,
      copy = _ref.copy,
      cta = _ref.cta,
      items = _ref.items,
      aside = _ref.aside;
  var patterns = {
    ContentGroupCards: _ContentGroupCards.ContentGroupCards,
    ContentGroupSimple: _ContentGroupSimple.ContentGroupSimple,
    ContentGroupPictograms: _ContentGroupPictograms.ContentGroupPictograms
  };
  var groups = items.map(function (item, index) {
    var Pattern = patterns[item.type];
    return _react.default.createElement(Pattern, (0, _extends2.default)({
      key: index
    }, item));
  });
  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-mixed"),
    className: "".concat(prefix, "--content-block-mixed")
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    copy: copy,
    cta: cta,
    aside: aside
  }, groups));
};

ContentBlockMixed.propTypes = {
  /**
   * Title of the content block.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * Simple content item.
   * Uses [`markdownToHtml`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/utilities/src/utilities/markdownToHtml) utility.
   */
  copy: _propTypes.default.string,

  /**
   * The data of the content groups to render. See the following for full usage details:
   *
   * * [`<ContentGroupCards>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-blocks-contentgroupcards--default#props)
   * * [`<ContentGroupSimple>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-blocks-contentgroupsimple--default#props)
   * * [`<ContentGroupPictograms>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-blocks-contentgrouppictograms--default#props)
   */
  items: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.shape({
    type: _propTypes.default.oneOf(['ContentGroupCards', 'ContentGroupSimple', 'ContentGroupPictograms']).isRequired,
    heading: _propTypes.default.string.isRequired,
    items: _propTypes.default.arrayOf(_propTypes.default.shape({
      title: _propTypes.default.string,
      copy: _propTypes.default.string,
      cta: _propTypes.default.shape({
        href: _propTypes.default.string
      })
    }))
  }), _propTypes.default.shape({
    type: _propTypes.default.oneOf(['ContentGroupCards', 'ContentGroupSimple', 'ContentGroupPictograms']).isRequired,
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
    })]),
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
  }), _propTypes.default.shape({
    type: _propTypes.default.oneOf(['ContentGroupCards', 'ContentGroupSimple', 'ContentGroupPictograms']).isRequired,
    heading: _propTypes.default.string.isRequired,
    items: _propTypes.default.arrayOf(_propTypes.default.shape({
      heading: _propTypes.default.string.isRequired,
      copy: _propTypes.default.string.isRequired,
      cta: _propTypes.default.shape({
        style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
        type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
        copy: _propTypes.default.string,
        href: _propTypes.default.string,
        customClassName: _propTypes.default.string
      }),
      pictogram: _propTypes.default.shape({
        src: _propTypes.default.object.isRequired
      }),
      className: _propTypes.default.string
    })).isRequired,
    className: _propTypes.default.string
  })])).isRequired,

  /**
   * CTA used at the end of content body. `Card` style supported.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    style: _propTypes.default.oneOf(['card']),
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: _propTypes.default.string,
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
  aside: _propTypes.default.shape({
    items: _propTypes.default.element,
    border: _propTypes.default.bool
  })
};
var _default = ContentBlockMixed;
exports.default = _default;