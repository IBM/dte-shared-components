import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import ContentItem from '../../internal/components/ContentItem/ContentItem';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Content with pictogram component.
 */

var PictogramItem = function PictogramItem(_ref) {
  var heading = _ref.heading,
      copy = _ref.copy,
      _ref$pictogram = _ref.pictogram,
      Pictogram = _ref$pictogram.src,
      pictogramProps = _objectWithoutProperties(_ref$pictogram, ["src"]),
      cta = _ref.cta,
      className = _ref.className;

  return React.createElement("div", {
    className: classNames(className, "".concat(prefix, "--pictogram-item"))
  }, React.createElement("div", {
    className: "".concat(prefix, "--pictogram-item__row")
  }, React.createElement("div", {
    className: "".concat(prefix, "--pictogram-item__wrapper")
  }, React.createElement(Pictogram, _extends({
    "data-autoid": "".concat(stablePrefix, "--pictogram-item__pictogram"),
    className: "".concat(prefix, "--pictogram-item__pictogram")
  }, pictogramProps))), React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--pictogram-item__content"),
    className: "".concat(prefix, "--pictogram-item__content")
  }, React.createElement(ContentItem, {
    heading: heading,
    copy: copy,
    cta: cta && _objectSpread({
      style: 'text'
    }, cta)
  }))));
};

PictogramItem.propTypes = {
  /**
   * Content with pictogram component title property.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Content with pictogram component copy property.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Object with CTA data.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string
  }),

  /**
   * Pictogram data object.
   * The structure is:
   *
   * | Name  | Required | Data Type | Default Value | Description                                                  |
   * | ----- | -------- | --------- | ------------- | ------------------------------------------------------------ |
   * | `src` | YES      | Component | null          | Pictogram component imported from `@carbon/pictograms-react` |
   */
  pictogram: PropTypes.shape({
    src: PropTypes.object.isRequired
  }).isRequired,

  /**
   * Pictogram Item `className`` prop.
   */
  className: PropTypes.string
};
export default PictogramItem;