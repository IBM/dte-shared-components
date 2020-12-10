import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect } from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import decodeString from '@carbon/ibmdotcom-utilities/es/utilities/decodeString/decodeString';
import { HorizontalRule } from '../HorizontalRule';
import Launch20 from '@carbon/icons-react/es/launch/20';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Quote Pattern
 *
 * @param {object} props props Object
 * @param {string} props.markType type of the quote marks
 * @param {string} props.copy quote copy
 * @param {object} props.source source object
 * @param {string} props.source.heading name heading for quote source
 * @param {string} props.source.copy title copy for quote source
 * @param {object} props.cta cta props object
 * @param {string} props.cta.copy cta copy
 * @param {string} props.cta.type type 'local' or 'external'
 * @param {string} props.cta.href cta href
 * @param {boolean} props.inverse toggles inverse theme
 * @returns {*} Quote Pattern
 */

var Quote = function Quote(_ref) {
  var _ref$markType = _ref.markType,
      markType = _ref$markType === void 0 ? 'doubleCurved' : _ref$markType,
      copy = _ref.copy,
      source = _ref.source,
      cta = _ref.cta,
      inverse = _ref.inverse;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      decodedCopy = _useState2[0],
      setDecodedCopy = _useState2[1];

  useEffect(function () {
    setDecodedCopy(decodeString(copy));
  }, [copy]);
  /**
   * Render the Quote copy with the selected quote marks
   *
   * @returns {*} Blockquote with quote marks
   */

  var renderQuote = function renderQuote() {
    switch (markType) {
      case 'doubleCurved':
        return React.createElement(React.Fragment, null, React.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\u201C"), React.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\u201D"));

      case 'singleCurved':
        return React.createElement(React.Fragment, null, React.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\u2018"), React.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\u2019"));

      case 'doubleAngle':
        return React.createElement(React.Fragment, null, React.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\xAB"), React.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\xBB"));

      case 'singleAngle':
        return React.createElement(React.Fragment, null, React.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\u2039"), React.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\u203A"));

      case 'lowHighReversedDoubleCurved':
        return React.createElement(React.Fragment, null, React.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\u201E"), React.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\u201C"));
    }
  };

  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--quote"),
    className: classnames("".concat(prefix, "--quote"), _defineProperty({}, "".concat(prefix, "--quote__inverse"), inverse))
  }, React.createElement("div", {
    className: "".concat(prefix, "--quote__container")
  }, React.createElement("div", {
    className: "".concat(prefix, "--quote__wrapper"),
    "data-autoid": "".concat(stablePrefix, "--quote__copy")
  }, renderQuote()), source && source.heading && source.copy ? React.createElement("div", {
    className: "".concat(prefix, "--quote__source"),
    "data-autoid": "".concat(stablePrefix, "--quote__source")
  }, React.createElement("p", {
    className: "".concat(prefix, "--quote__source-heading")
  }, source.heading), React.createElement("p", {
    className: "".concat(prefix, "--quote__source-body")
  }, source.copy), source.copy2 && React.createElement("p", {
    className: "".concat(prefix, "--quote__source-optional-copy")
  }, source.copy2)) : false), cta ? React.createElement("div", {
    className: "".concat(prefix, "--quote__footer")
  }, React.createElement(HorizontalRule, null), React.createElement(LinkWithIcon, {
    href: cta.href
  }, React.createElement("span", null, cta.copy), cta.type === 'local' ? React.createElement(ArrowRight20, null) : false, cta.type === 'external' ? React.createElement(Launch20, null) : false)) : false);
};

Quote.propTypes = {
  /**
   * Type of the quote marks. Choose from:
   *
   * | Name                          | Description |
   * | ----------------------------- | ----------- |
   * | `singleCurved`                | ‘ ’         |
   * | `doubleCurved`                | “ ”         |
   * | `singleAngle`                 | ‹ ›         |
   * | `doubleAngle`                 | « »         |
   * | `lowHighReversedDoubleCurved` | „ “         |
   */
  markType: PropTypes.oneOf(['doubleCurved', 'singleCurved', 'doubleAngle', 'singleAngle', 'lowHighReversedDoubleCurved']),

  /**
   * Main Quote.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Source object. The structure is:
   *
   * | Name      | Required | Data Type | Default Value | Description                  |
   * | --------- | -------- | --------- | ------------- | ---------------------------- |
   * | `heading` | YES      | String    | null          | Source heading               |
   * | `copy`    | YES      | String    | null          | Source body text             |
   * | `copy2`   | NO       | String    | null          | Optional second line of copy |
   */
  source: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
    copy2: PropTypes.string
  }),

  /**
   * Object with a sub-scheme of CTA data.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    copy: PropTypes.string,
    type: PropTypes.oneOf(['local', 'external']),
    href: PropTypes.string
  }),

  /**
   * `true` to use the invese colors.
   */
  inverse: PropTypes.bool
};
export default Quote;