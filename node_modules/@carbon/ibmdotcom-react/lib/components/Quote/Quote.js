"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/arrow--right/20"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _decodeString = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/decodeString/decodeString"));

var _HorizontalRule = require("../HorizontalRule");

var _2 = _interopRequireDefault(require("@carbon/icons-react/lib/launch/20"));

var _LinkWithIcon = require("../LinkWithIcon");

var _propTypes = _interopRequireDefault(require("prop-types"));

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

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      decodedCopy = _useState2[0],
      setDecodedCopy = _useState2[1];

  (0, _react.useEffect)(function () {
    setDecodedCopy((0, _decodeString.default)(copy));
  }, [copy]);
  /**
   * Render the Quote copy with the selected quote marks
   *
   * @returns {*} Blockquote with quote marks
   */

  var renderQuote = function renderQuote() {
    switch (markType) {
      case 'doubleCurved':
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\u201C"), _react.default.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\u201D"));

      case 'singleCurved':
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\u2018"), _react.default.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\u2019"));

      case 'doubleAngle':
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\xAB"), _react.default.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\xBB"));

      case 'singleAngle':
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\u2039"), _react.default.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\u203A"));

      case 'lowHighReversedDoubleCurved':
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", {
          className: "".concat(prefix, "--quote__mark")
        }, "\u201E"), _react.default.createElement("blockquote", {
          className: "".concat(prefix, "--quote__copy")
        }, decodedCopy, "\u201C"));
    }
  };

  return _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--quote"),
    className: (0, _classnames2.default)("".concat(prefix, "--quote"), (0, _defineProperty2.default)({}, "".concat(prefix, "--quote__inverse"), inverse))
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--quote__container")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--quote__wrapper"),
    "data-autoid": "".concat(stablePrefix, "--quote__copy")
  }, renderQuote()), source && source.heading && source.copy ? _react.default.createElement("div", {
    className: "".concat(prefix, "--quote__source"),
    "data-autoid": "".concat(stablePrefix, "--quote__source")
  }, _react.default.createElement("p", {
    className: "".concat(prefix, "--quote__source-heading")
  }, source.heading), _react.default.createElement("p", {
    className: "".concat(prefix, "--quote__source-body")
  }, source.copy), source.copy2 && _react.default.createElement("p", {
    className: "".concat(prefix, "--quote__source-optional-copy")
  }, source.copy2)) : false), cta ? _react.default.createElement("div", {
    className: "".concat(prefix, "--quote__footer")
  }, _react.default.createElement(_HorizontalRule.HorizontalRule, null), _react.default.createElement(_LinkWithIcon.LinkWithIcon, {
    href: cta.href
  }, _react.default.createElement("span", null, cta.copy), cta.type === 'local' ? _react.default.createElement(_.default, null) : false, cta.type === 'external' ? _react.default.createElement(_2.default, null) : false)) : false);
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
  markType: _propTypes.default.oneOf(['doubleCurved', 'singleCurved', 'doubleAngle', 'singleAngle', 'lowHighReversedDoubleCurved']),

  /**
   * Main Quote.
   */
  copy: _propTypes.default.string.isRequired,

  /**
   * Source object. The structure is:
   *
   * | Name      | Required | Data Type | Default Value | Description                  |
   * | --------- | -------- | --------- | ------------- | ---------------------------- |
   * | `heading` | YES      | String    | null          | Source heading               |
   * | `copy`    | YES      | String    | null          | Source body text             |
   * | `copy2`   | NO       | String    | null          | Optional second line of copy |
   */
  source: _propTypes.default.shape({
    heading: _propTypes.default.string.isRequired,
    copy: _propTypes.default.string.isRequired,
    copy2: _propTypes.default.string
  }),

  /**
   * Object with a sub-scheme of CTA data.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    copy: _propTypes.default.string,
    type: _propTypes.default.oneOf(['local', 'external']),
    href: _propTypes.default.string
  }),

  /**
   * `true` to use the invese colors.
   */
  inverse: _propTypes.default.bool
};
var _default = Quote;
exports.default = _default;