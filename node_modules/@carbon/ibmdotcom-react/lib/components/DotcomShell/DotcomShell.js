"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _Footer = require("../Footer");

var _Masthead = require("../Masthead");

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
 * DotcomShell component.
 */

var DotcomShell = function DotcomShell(_ref) {
  var children = _ref.children,
      footerProps = _ref.footerProps,
      mastheadProps = _ref.mastheadProps;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Masthead.Masthead, mastheadProps), _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--dotcom-shell"),
    className: "".concat(prefix, "--dotcom-shell")
  }, _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--dotcom-shell__content"),
    className: "".concat(prefix, "--dotcom-shell__content")
  }, children)), _react.default.createElement(_Footer.Footer, footerProps));
};

DotcomShell.propTypes = {
  /**
   * Component(s) to render within the UI shell.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,

  /**
   * Props for the Masthead.
   * See [`<Footer>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-footer--default) for more details.
   */
  footerProps: _propTypes.default.shape({
    navigation: _propTypes.default.shape({
      footerMenu: _propTypes.default.arrayOf(_propTypes.default.shape({
        title: _propTypes.default.string,
        links: _propTypes.default.arrayOf(_propTypes.default.shape({
          title: _propTypes.default.string,
          url: _propTypes.default.string
        }))
      })),
      footerThin: _propTypes.default.arrayOf(_propTypes.default.shape({
        title: _propTypes.default.string,
        url: _propTypes.default.string
      }))
    }),
    type: _propTypes.default.oneOf(['tall', 'short']),
    langCode: _propTypes.default.shape({
      cc: _propTypes.default.string,
      lc: _propTypes.default.string
    }),
    disableLocaleButton: _propTypes.default.bool,
    languageOnly: _propTypes.default.bool,
    languageItems: _propTypes.default.arrayOf(_propTypes.default.shape({})),
    languageInitialItem: _propTypes.default.shape({
      id: _propTypes.default.string,
      text: _propTypes.default.string
    }),
    languageCallback: _propTypes.default.func
  }),

  /**
   * Props for the Masthead.
   * See [`<Masthead>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-masthead--default) for more details.
   */
  mastheadProps: _propTypes.default.shape(_Masthead.Masthead.propTypes)
};
_Footer.Footer.defaultProps = {
  footerProps: null,
  mastheadProps: null
};
var _default = DotcomShell;
exports.default = _default;