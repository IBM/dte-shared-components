import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CardLink } from '../CardLink';
import CTALogic from './CTALogic';

var PlayIcon = function PlayIcon(props) {
  return React.createElement("svg", props, React.createElement("title", null, "Group 3"), React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React.createElement("circle", {
    fillOpacity: ".9",
    fill: "#525252",
    cx: "32",
    cy: "32",
    r: "32"
  }), React.createElement("path", {
    d: "M26.556 43.111a1 1 0 0 1-1-1v-22a1 1 0 0 1 1.5-.87l19 11a1 1 0 0 1 0 1.74l-19 11a1 1 0 0 1-.5.13z",
    fill: "#F3F3F3",
    fillRule: "nonzero"
  })));
};

PlayIcon.defaultProps = {
  width: "64",
  height: "64",
  viewBox: "0 0 64 64",
  xmlns: "http://www.w3.org/2000/svg"
};
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
var prefix = settings.prefix;
/**
 * Card subcomponent for CTA.
 */

var CardCTA = function CardCTA(_ref) {
  var type = _ref.type,
      openLightBox = _ref.openLightBox,
      renderLightBox = _ref.renderLightBox,
      videoTitle = _ref.videoTitle,
      disableImage = _ref.disableImage,
      otherProps = _objectWithoutProperties(_ref, ["type", "openLightBox", "renderLightBox", "videoTitle", "disableImage"]);

  // eslint-disable-next-line no-unused-vars
  var style = otherProps.style,
      cardProps = _objectWithoutProperties(otherProps, ["style"]);

  if (type === 'video') {
    var _videoTitle$0$duratio;

    var image;

    if (!disableImage) {
      var _cardProps$media;

      // use image src if passed in through props, otherwise use Kaltura's generated thumbnail image
      image = cardProps.image ? cardProps.image : {
        defaultSrc: VideoPlayerAPI.getThumbnailUrl({
          videoId: (_cardProps$media = cardProps.media) === null || _cardProps$media === void 0 ? void 0 : _cardProps$media.src,
          width: '320'
        }),
        alt: videoTitle[0].title
      };
      image = _objectSpread({}, image, {
        icon: PlayIcon
      });
    }

    return React.createElement(React.Fragment, null, CTALogic.launchLightBox(renderLightBox, openLightBox, otherProps.media), !renderLightBox && React.createElement(CardLink, {
      customClassName: "".concat(prefix, "--card__video"),
      card: _objectSpread({}, cardProps, {
        cta: {
          href: '#',
          icon: {
            src: CTALogic.iconSelector(type)
          },
          iconPlacement: 'left',
          copy: (_videoTitle$0$duratio = videoTitle[0].duration) === null || _videoTitle$0$duratio === void 0 ? void 0 : _videoTitle$0$duratio.replace(/\(|\)/g, '')
        },
        image: image,
        copy: videoTitle[0].title,
        handleClick: function handleClick(e) {
          return CTALogic.setLightBox(e, openLightBox);
        }
      })
    }));
  } else {
    return React.createElement(CardLink, {
      card: _objectSpread({}, cardProps, {
        cta: {
          type: type,
          href: otherProps.cta.href,
          icon: {
            src: CTALogic.iconSelector(type)
          }
        },
        copy: otherProps.copy,
        target: CTALogic.external(type),
        href: otherProps.cta.href
      })
    });
  }
};

CardCTA.propTypes = {
  /**
   * CTA type. Choose from:
   *
   * | Type       | SVG element Name | Description                                                      |
   * | ---------- | ---------------- | ---------------------------------------------------------------- |
   * | `local`    | ArrowRight20     | Describes right arrow onClick which loads in self page.          |
   * | `jump`     | ArrowDown20      | Describes down arrow onClick which scrollToView of target.       |
   * | `external` | Launch20         | Describes launch arrow onClick which loads in new tab.           |
   * | `download` | Download20       | Describes download arrow onClick for downloading files.          |
   * | `video`    | PlayOutline20    | Describes play icon onClick which loads the video in a lightbox. |
   * | `default`  | None             | Describes the default CTA - without icon                         |
   *
   * For more details of icons, refer to:
   *
   * - [Icons library](https://www.carbondesignsystem.com/guidelines/icons/library/)!👀
   * - [@carbon/icons-react](https://github.com/carbon-design-system/carbon/tree/master/packages/icons-react)!👀
   * - [carbon-icons](https://www.npmjs.com/package/carbon-icons)!👀
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']))]),

  /**
   * Boolean to determine whether to disable image for card
   */
  disableImage: PropTypes.bool,

  /**
   * Func to set renderLightBox state.
   */
  openLightBox: PropTypes.func,

  /**
   * Bool to determine whether to open lightbox.
   */
  renderLightBox: PropTypes.bool,

  /**
   * Array of video titles.
   */
  videoTitle: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }))
};
CardCTA.defaultProps = {
  type: 'default',
  copy: '',
  cta: null,
  disableImage: false,
  media: null
};
export default CardCTA;