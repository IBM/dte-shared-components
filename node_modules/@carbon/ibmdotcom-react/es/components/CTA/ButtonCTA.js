import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { ButtonGroup } from '../ButtonGroup';
import CTALogic from './CTALogic';
import PropTypes from 'prop-types';
/**
 * Button subcomponent for CTA.
 */

var ButtonCTA = function ButtonCTA(_ref) {
  var type = _ref.type,
      openLightBox = _ref.openLightBox,
      renderLightBox = _ref.renderLightBox,
      videoTitle = _ref.videoTitle,
      formatCTAcopy = _ref.formatCTAcopy,
      otherProps = _objectWithoutProperties(_ref, ["type", "openLightBox", "renderLightBox", "videoTitle", "formatCTAcopy"]);

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      mediaData = _useState2[0],
      setMediaData = _useState2[1];

  return type.includes('video') ? React.createElement("div", null, CTALogic.launchLightBox(renderLightBox, openLightBox, mediaData), !renderLightBox && React.createElement(ButtonGroup, {
    buttons: _renderButtons(_objectSpread({
      videoTitle: videoTitle,
      openLightBox: openLightBox,
      setMediaData: setMediaData,
      formatCTAcopy: formatCTAcopy
    }, otherProps))
  })) : React.createElement(ButtonGroup, {
    buttons: _renderButtons(_objectSpread({}, otherProps))
  });
};
/**
 * sets button
 *
 * @param {object} param param object
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {Array} param.videoTitle array of video titles
 * @param {Function} param.setMediaData func to set media data state
 * @param {Function} param.formatCTAcopy func to format the cta copy
 * @param {object} param.buttons object with buttons array
 * @private
 * @returns {*} object
 */


var _renderButtons = function _renderButtons(_ref2) {
  var openLightBox = _ref2.openLightBox,
      videoTitle = _ref2.videoTitle,
      setMediaData = _ref2.setMediaData,
      formatCTAcopy = _ref2.formatCTAcopy,
      buttons = _ref2.buttons;
  return buttons.map(function (button, key) {
    if (button.type === 'video') {
      button.onClick = function (e) {
        e.preventDefault();
        setMediaData(button.media);
        return CTALogic.setLightBox(e, openLightBox);
      };

      var title = videoTitle.filter(function (name) {
        return name.key === key;
      });
      button.copy = !title[0] ? button.copy : formatCTAcopy({
        title: title[0].title,
        duration: title[0].duration
      });
      button.href = '#';
    } else {
      button.onClick = function (e) {
        return CTALogic.jump(e, button.type);
      };

      button.target = CTALogic.external(button.type);
    }

    button.renderIcon = CTALogic.iconSelector(button.type);
    button.iconDescription = _renderIconDesc(button.type);
    return button;
  });
};
/**
 * render the icon description for screen reader
 *
 * @param {string} type type of cta
 *
 * @private
 * @returns {string} icon description
 */


var _renderIconDesc = function _renderIconDesc(type) {
  switch (type) {
    case 'external':
      return 'external launch icon';

    case 'jump':
      return 'down arrow icon';

    case 'video':
      return 'play button icon';

    default:
      return 'right arrow icon';
  }
};

ButtonCTA.propTypes = {
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
   * Array of button objects to render.
   */
  buttons: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['local', 'external', 'jump', 'video']),
    copy: PropTypes.string,
    href: PropTypes.string,
    mediaData: PropTypes.shape({
      customClassName: PropTypes.string,
      videoId: PropTypes.string.isRequired,
      showCaption: PropTypes.bool,
      inverse: PropTypes.bool
    })
  })).isRequired,

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
  })),

  /**
   * The function to set media data.
   */
  setMediaData: PropTypes.func,

  /**
   * Func to format the cta copy
   */
  formatCTAcopy: PropTypes.func
};
ButtonCTA.defaultProps = {
  type: 'default',
  formatCTAcopy: function formatCTAcopy(_ref3) {
    var title = _ref3.title,
        duration = _ref3.duration;
    return "".concat(title, " ").concat(duration);
  }
};
export default ButtonCTA;