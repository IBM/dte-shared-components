'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SliderHandle = function SliderHandle(_ref) {
	var className = _ref.className,
	    style = _ref.style,
	    tooltipTrigger = _ref.tooltipTrigger,
	    renderTooltipData = _ref.renderTooltipData,
	    passProps = _objectWithoutProperties(_ref, ['className', 'style', 'tooltipTrigger', 'renderTooltipData']);

	if (tooltipTrigger) {
		var tooltipClassname = '';
		switch (tooltipTrigger) {
			case 'hover':
				tooltipClassname = 'slider-tooltip';
				break;
			case 'focus':
				tooltipClassname = 'slider-tooltip-focus';
				break;
			case 'always':
				tooltipClassname = 'slider-tooltip-visible';
				break;
			case 'none':
			default:
				return _react2.default.createElement('button', _extends({
					style: style,
					'aria-label': 'slider-button',
					className: className
				}, passProps));
		}
		var tooltipContent = passProps['aria-valuenow'];
		return _react2.default.createElement(
			'button',
			_extends({ style: style, className: className, 'aria-label': 'slider-button' }, passProps),
			_react2.default.createElement(
				'span',
				{ className: tooltipClassname },
				renderTooltipData ? renderTooltipData(tooltipContent) : tooltipContent
			)
		);
	}
	return _react2.default.createElement('button', _extends({ style: style, className: className }, passProps));
};

exports.default = SliderHandle;