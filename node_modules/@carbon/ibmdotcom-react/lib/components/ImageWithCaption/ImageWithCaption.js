"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _CTALogic = _interopRequireDefault(require("../CTA/CTALogic"));

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _Image = require("../Image");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/zoom--in/20"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * Picture element.
 */

var ImageWithCaption = function ImageWithCaption(_ref) {
  var image = _ref.image,
      lightbox = _ref.lightbox,
      heading = _ref.heading,
      copy = _ref.copy,
      customClassName = _ref.customClassName;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      renderLightBox = _useState2[0],
      openLightBox = _useState2[1];

  if (!image) {
    return null;
  }

  var classnames = (0, _classnames.default)("".concat(prefix, "--image-with-caption"), customClassName);
  var media = {
    type: 'image',
    src: image.defaultSrc,
    title: heading,
    alt: image.alt,
    description: copy
  };
  return _react.default.createElement("div", {
    className: classnames,
    "data-autoid": "".concat(stablePrefix, "--image-with-caption")
  }, _CTALogic.default.launchLightBox(renderLightBox, openLightBox, media), lightbox ? _react.default.createElement("button", {
    "aria-label": "launch light box media viewer",
    className: "".concat(prefix, "--image-with-caption__image"),
    onClick: function onClick(e) {
      return _CTALogic.default.setLightBox(e, openLightBox);
    }
  }, _react.default.createElement(_Image.Image, image), _react.default.createElement("div", {
    className: "".concat(prefix, "--image-with-caption__zoom-button")
  }, _react.default.createElement(_.default, {
    "aria-label": "Zoom In Icon"
  }))) : _react.default.createElement(_Image.Image, image), _react.default.createElement("p", {
    className: "".concat(prefix, "--image__caption"),
    "data-autoid": "".concat(stablePrefix, "--image__caption")
  }, heading));
};

ImageWithCaption.propTypes = {
  /**
   * Image object needed for ImageWithCaption component.
   * Visit the [Image storybook](https://ibmdotcom-react.mybluemix.net/?path=/story/components-image--default)
   * for more details on the Image component.
   */
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

  /**
   * `true` to enable lightbox functionality, allowing user to see enlarged image.
   */
  lightbox: _propTypes.default.bool,

  /**
   * Caption text.
   */
  heading: _propTypes.default.string,

  /**
   * More detailed description of the image.
   */
  copy: _propTypes.default.string,

  /**
   * The CSS class name to apply.
   */
  customClassName: _propTypes.default.string
};
ImageWithCaption.defaultProps = {
  copy: '',
  lightbox: false
};
var _default = ImageWithCaption;
exports.default = _default;