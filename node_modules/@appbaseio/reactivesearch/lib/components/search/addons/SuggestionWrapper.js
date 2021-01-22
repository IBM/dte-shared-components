'use strict';

exports.__esModule = true;

var _core = require('@emotion/core');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Input = require('../../../styles/Input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx jsx */
var SuggestionWrapper = function SuggestionWrapper(_ref) {
	var theme = _ref.theme,
	    themePreset = _ref.themePreset,
	    children = _ref.children,
	    innerClassName = _ref.innerClassName,
	    innerClass = _ref.innerClass;
	return (0, _core.jsx)(
		'div',
		{
			css: (0, _Input.noSuggestions)(themePreset, theme),
			className: (0, _helper.getClassName)(innerClass, innerClassName || '')
		},
		(0, _core.jsx)(
			'li',
			null,
			children
		)
	);
};
SuggestionWrapper.propTypes = {
	theme: _types2.default.style,
	innerClassName: _types2.default.string,
	themePreset: _types2.default.themePreset,
	children: _types2.default.children,
	innerClass: _types2.default.style
};

exports.default = SuggestionWrapper;