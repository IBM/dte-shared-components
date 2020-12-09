import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import CTALogic from '../CTA/CTALogic';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { Image } from '../Image';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import ZoomIn20 from '@carbon/icons-react/es/zoom--in/20';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Picture element.
 */

var ImageWithCaption = function ImageWithCaption(_ref) {
  var image = _ref.image,
      lightbox = _ref.lightbox,
      heading = _ref.heading,
      copy = _ref.copy,
      customClassName = _ref.customClassName;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      renderLightBox = _useState2[0],
      openLightBox = _useState2[1];

  if (!image) {
    return null;
  }

  var classnames = cx("".concat(prefix, "--image-with-caption"), customClassName);
  var media = {
    type: 'image',
    src: image.defaultSrc,
    title: heading,
    alt: image.alt,
    description: copy
  };
  return React.createElement("div", {
    className: classnames,
    "data-autoid": "".concat(stablePrefix, "--image-with-caption")
  }, CTALogic.launchLightBox(renderLightBox, openLightBox, media), lightbox ? React.createElement("button", {
    "aria-label": "launch light box media viewer",
    className: "".concat(prefix, "--image-with-caption__image"),
    onClick: function onClick(e) {
      return CTALogic.setLightBox(e, openLightBox);
    }
  }, React.createElement(Image, image), React.createElement("div", {
    className: "".concat(prefix, "--image-with-caption__zoom-button")
  }, React.createElement(ZoomIn20, {
    "aria-label": "Zoom In Icon"
  }))) : React.createElement(Image, image), React.createElement("p", {
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

  /**
   * `true` to enable lightbox functionality, allowing user to see enlarged image.
   */
  lightbox: PropTypes.bool,

  /**
   * Caption text.
   */
  heading: PropTypes.string,

  /**
   * More detailed description of the image.
   */
  copy: PropTypes.string,

  /**
   * The CSS class name to apply.
   */
  customClassName: PropTypes.string
};
ImageWithCaption.defaultProps = {
  copy: '',
  lightbox: false
};
export default ImageWithCaption;