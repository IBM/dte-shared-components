'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _ListItem = require('../../../styles/ListItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ResultListImage = function ResultListImage(_ref) {
	var src = _ref.src,
	    small = _ref.small,
	    props = _objectWithoutProperties(_ref, ['src', 'small']);

	return _react2.default.createElement(_ListItem.Image, _extends({ src: src, small: small }, props));
};
ResultListImage.propTypes = {
	src: _types2.default.stringRequired,
	small: _types2.default.bool
};
ResultListImage.defaultProps = {
	small: false
};

exports.default = ResultListImage;