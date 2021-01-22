'use strict';

exports.__esModule = true;

var _styledBase = require('@emotion/styled-base');

var _styledBase2 = _interopRequireDefault(_styledBase);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Base = ( /*#__PURE__*/0, _styledBase2.default)(function (_ref) {
	var _ref$as = _ref.as,
	    T = _ref$as === undefined ? 'div' : _ref$as,
	    props = _objectWithoutProperties(_ref, ['as']);

	return _react2.default.createElement(T, props);
}, {
	target: 'e1n4b2jv0',
	label: 'Base'
})('font-family:', function (_ref2) {
	var theme = _ref2.theme;
	return theme.typography.fontFamily;
}, ';font-size:', function (_ref3) {
	var theme = _ref3.theme;
	return theme.typography.fontSize;
}, ';color:', function (_ref4) {
	var theme = _ref4.theme;
	return theme.colors.textColor;
}, ';width:100%;input,button,textarea,select{font-family:', function (_ref5) {
	var theme = _ref5.theme;
	return theme.typography.fontFamily;
}, ';}*,*:before,*:after{box-sizing:border-box;}' + (process.env.NODE_ENV === 'production' ? '' : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvQmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHc0UiLCJmaWxlIjoiLi4vLi4vc3JjL3N0eWxlcy9CYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuY29uc3QgQmFzZSA9IHN0eWxlZCgoeyBhczogVCA9ICdkaXYnLCAuLi5wcm9wcyB9KSA9PiA8VCB7Li4ucHJvcHN9IC8+KWBcblx0Zm9udC1mYW1pbHk6ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUudHlwb2dyYXBoeS5mb250RmFtaWx5fTtcblx0Zm9udC1zaXplOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLnR5cG9ncmFwaHkuZm9udFNpemV9O1xuXHRjb2xvcjogJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnMudGV4dENvbG9yfTtcblx0d2lkdGg6IDEwMCU7XG5cblx0aW5wdXQsXG5cdGJ1dHRvbixcblx0dGV4dGFyZWEsXG5cdHNlbGVjdCB7XG5cdFx0Zm9udC1mYW1pbHk6ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUudHlwb2dyYXBoeS5mb250RmFtaWx5fTtcblx0fVxuXG5cdCosXG5cdCo6YmVmb3JlLFxuXHQqOmFmdGVyIHtcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHR9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIl19 */'));

exports.default = Base;