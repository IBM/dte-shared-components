"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ContentItem = _interopRequireDefault(require("../../internal/components/ContentItem/ContentItem"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * Content with pictogram component.
 */

var PictogramItem = function PictogramItem(_ref) {
  var heading = _ref.heading,
      copy = _ref.copy,
      _ref$pictogram = _ref.pictogram,
      Pictogram = _ref$pictogram.src,
      pictogramProps = (0, _objectWithoutProperties2.default)(_ref$pictogram, ["src"]),
      cta = _ref.cta,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(className, "".concat(prefix, "--pictogram-item"))
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--pictogram-item__row")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--pictogram-item__wrapper")
  }, _react.default.createElement(Pictogram, (0, _extends2.default)({
    "data-autoid": "".concat(stablePrefix, "--pictogram-item__pictogram"),
    className: "".concat(prefix, "--pictogram-item__pictogram")
  }, pictogramProps))), _react.default.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--pictogram-item__content"),
    className: "".concat(prefix, "--pictogram-item__content")
  }, _react.default.createElement(_ContentItem.default, {
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
  heading: _propTypes.default.string.isRequired,

  /**
   * Content with pictogram component copy property.
   */
  copy: _propTypes.default.string.isRequired,

  /**
   * Object with CTA data.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: _propTypes.default.shape({
    type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: _propTypes.default.string,
    href: _propTypes.default.string,
    customClassName: _propTypes.default.string
  }),

  /**
   * Pictogram data object.
   * The structure is:
   *
   * | Name  | Required | Data Type | Default Value | Description                                                  |
   * | ----- | -------- | --------- | ------------- | ------------------------------------------------------------ |
   * | `src` | YES      | Component | null          | Pictogram component imported from `@carbon/pictograms-react` |
   */
  pictogram: _propTypes.default.shape({
    src: _propTypes.default.object.isRequired
  }).isRequired,

  /**
   * Pictogram Item `className`` prop.
   */
  className: _propTypes.default.string
};
var _default = PictogramItem;
exports.default = _default;