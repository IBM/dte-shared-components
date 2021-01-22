'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _ImpressionTracker = require('./ImpressionTracker');

var _ImpressionTracker2 = _interopRequireDefault(_ImpressionTracker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Results = function Results(_ref) {
	var filteredResults = _ref.filteredResults,
	    hasCustomRender = _ref.hasCustomRender,
	    listClass = _ref.listClass,
	    innerClass = _ref.innerClass,
	    renderItem = _ref.renderItem,
	    getComponent = _ref.getComponent,
	    triggerClickAnalytics = _ref.triggerClickAnalytics,
	    base = _ref.base,
	    analytics = _ref.analytics;

	var resultElement = function resultElement() {
		return hasCustomRender ? getComponent() : _react2.default.createElement(
			'div',
			{ className: listClass + ' ' + (0, _helper.getClassName)(innerClass, 'list') },
			filteredResults.map(function (item, index) {
				return renderItem(item, function () {
					triggerClickAnalytics(base + index);
				});
			})
		);
	};
	// If analytics is set to true then render with impression tracker
	if (analytics) {
		return _react2.default.createElement(
			_ImpressionTracker2.default,
			{ hits: filteredResults },
			resultElement()
		);
	}
	return resultElement();
};

Results.propTypes = {
	hasCustomRender: _types2.default.boolRequired,
	innerClass: _types2.default.style,
	renderItem: _types2.default.func,
	base: _types2.default.number,
	getComponent: _types2.default.func,
	listClass: _types2.default.string,
	filteredResults: _types2.default.hits,
	triggerClickAnalytics: _types2.default.func,
	analytics: _types2.default.bool
};

exports.default = Results;