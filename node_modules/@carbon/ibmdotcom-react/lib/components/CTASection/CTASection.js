"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ContentBlock = _interopRequireDefault(require("../../internal/components/ContentBlock/ContentBlock"));

var _ContentItem = _interopRequireDefault(require("../../internal/components/ContentItem/ContentItem"));

var _CTA = require("../CTA");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _windowOrGlobal = _interopRequireDefault(require("window-or-global"));

var _sameHeight = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/sameHeight/sameHeight"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * CTASection pattern.
 */

var CTASection = function CTASection(_ref) {
  var _classNames;

  var heading = _ref.heading,
      copy = _ref.copy,
      cta = _ref.cta,
      items = _ref.items,
      theme = _ref.theme;
  var containerRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    setSameHeight();

    _windowOrGlobal.default.addEventListener('resize', setSameHeight);

    return function () {
      return _windowOrGlobal.default.removeEventListener('resize', setSameHeight);
    };
  }, []);
  /**
   * Function that activates the sameHeight utility
   */

  var setSameHeight = function setSameHeight() {
    _windowOrGlobal.default.requestAnimationFrame(function () {
      var containerNode = containerRef.current;

      if (containerNode) {
        (0, _sameHeight.default)(containerNode.getElementsByClassName("".concat(prefix, "--content-item__copy")), 'md');
      }
    });
  };

  return _react.default.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--cta-section"),
    className: (0, _classnames.default)("".concat(prefix, "--cta-section"), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefix, "--cta-section__has-items"), items), (0, _defineProperty2.default)(_classNames, "".concat(prefix, "--cta-section--").concat(theme), theme), _classNames)),
    ref: containerRef
  }, _react.default.createElement(_ContentBlock.default, {
    heading: heading,
    copy: copy
  }), _react.default.createElement(_CTA.CTA, (0, _extends2.default)({
    customClassName: "".concat(prefix, "--cta-section__cta")
  }, cta)), items && _react.default.createElement("div", {
    className: "".concat(prefix, "--helper-wrapper")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--content-item-wrapper")
  }, items.map(function (item, index) {
    return _react.default.createElement(_ContentItem.default, {
      key: index,
      heading: item.heading,
      copy: item.copy,
      cta: item.cta
    });
  }))));
};

CTASection.propTypes = {
  /**
   * The heading for the CTA Section pattern.
   */
  heading: _propTypes.default.string.isRequired,

  /**
   * The copy for the CTA Section pattern.
   */
  copy: _propTypes.default.string.isRequired,

  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']))]),
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    customClassName: _propTypes.default.string
  }),

  /**
   * Color theme for pattern.
   */
  theme: _propTypes.default.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * The `<ContentItem>` data to render.
   * See the [`<ContentItem>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-sub-patterms-contentitem--default#props) for full usage details.
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    heading: _propTypes.default.string,
    copy: _propTypes.default.string,
    cta: _propTypes.default.shape({
      heading: _propTypes.default.string,
      copy: _propTypes.default.string,
      cta: _propTypes.default.shape({
        style: _propTypes.default.oneOf(['text', 'card', 'button', 'feature']),
        type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']))]),
        copy: _propTypes.default.string,
        href: _propTypes.default.string,
        customClassName: _propTypes.default.string
      })
    })
  }))
};
var _default = CTASection;
exports.default = _default;