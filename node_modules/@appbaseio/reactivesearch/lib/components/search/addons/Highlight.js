'use strict';

exports.__esModule = true;

var _core = require('@emotion/core');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return 'You have tried to stringify object returned from `css` function. It isn\'t supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).'; } /** @jsx jsx */

var highlightedStyling = process.env.NODE_ENV === 'production' ? {
	name: '12fugvv-highlightedStyling',
	styles: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;.highlight{font-weight:600;padding:0;background-color:transparent;color:inherit;};label:highlightedStyling;'
} : {
	name: '12fugvv-highlightedStyling',
	styles: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;.highlight{font-weight:600;padding:0;background-color:transparent;color:inherit;};label:highlightedStyling;',
	map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlYXJjaC9hZGRvbnMvSGlnaGxpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU04QiIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zZWFyY2gvYWRkb25zL0hpZ2hsaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgY3NzLCBqc3ggfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGVzY2FwZVJlZ0V4cCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzJztcblxuY29uc3QgaGlnaGxpZ2h0ZWRTdHlsaW5nID0gY3NzYFxuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHR0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0LmhpZ2hsaWdodCB7XG5cdFx0Zm9udC13ZWlnaHQ6IDYwMDtcblx0XHRwYWRkaW5nOiAwO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRcdGNvbG9yOiBpbmhlcml0O1xuXHR9XG5gO1xuXG5jb25zdCBIaWdobGlnaHQgPSAocHJvcHMpID0+IHtcblx0Y29uc3Qge1xuXHRcdHRleHRUb0hpZ2hsaWdodCwgc2VhcmNoV29yZHMsIGF1dG9Fc2NhcGUsIGhhc1ByZWRpY3RpdmVTdWdnZXN0aW9uLFxuXHR9ID0gcHJvcHM7XG5cdGNvbnN0IG1vZFNlYXJjaFdvcmRzID0gc2VhcmNoV29yZHMubWFwKHdvcmQgPT4gKGF1dG9Fc2NhcGUgPyBlc2NhcGVSZWdFeHAod29yZCkgOiB3b3JkKSk7XG5cdGNvbnN0IHN0cmluZ1RvUmVwbGFjZSA9IG1vZFNlYXJjaFdvcmRzLmpvaW4oJ3wnKTtcblx0cmV0dXJuIChcblx0XHQ8ZGl2XG5cdFx0XHRjc3M9e2hpZ2hsaWdodGVkU3R5bGluZ31cblx0XHRcdGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG5cdFx0XHRcdF9faHRtbDogaGFzUHJlZGljdGl2ZVN1Z2dlc3Rpb24gPyB0ZXh0VG9IaWdobGlnaHQgOiB0ZXh0VG9IaWdobGlnaHQucmVwbGFjZShcblx0XHRcdFx0XHRuZXcgUmVnRXhwKHN0cmluZ1RvUmVwbGFjZSwgJ2lnJyksXG5cdFx0XHRcdFx0bWF0Y2hlZCA9PiBgPG1hcmsgY2xhc3M9XCJoaWdobGlnaHRcIj4ke21hdGNoZWR9PC9tYXJrPmAsXG5cdFx0XHRcdCksXG5cdFx0XHR9fVxuXHRcdC8+XG5cdCk7XG59O1xuXG5IaWdobGlnaHQucHJvcFR5cGVzID0ge1xuXHRzZWFyY2hXb3JkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG5cdHRleHRUb0hpZ2hsaWdodDogUHJvcFR5cGVzLnN0cmluZyxcblx0YXV0b0VzY2FwZTogUHJvcFR5cGVzLmJvb2wsXG5cdGhhc1ByZWRpY3RpdmVTdWdnZXN0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkhpZ2hsaWdodC5kZWZhdWx0UHJvcHMgPSB7XG5cdHNlYXJjaFdvcmRzOiBbXSxcblx0dGV4dFRvSGlnaGxpZ2h0OiAnJyxcblx0YXV0b0VzY2FwZTogZmFsc2UsXG5cdGhhc1ByZWRpY3RpdmVTdWdnZXN0aW9uOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhpZ2hsaWdodDtcbiJdfQ== */',
	toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

var Highlight = function Highlight(props) {
	var textToHighlight = props.textToHighlight,
	    searchWords = props.searchWords,
	    autoEscape = props.autoEscape,
	    hasPredictiveSuggestion = props.hasPredictiveSuggestion;

	var modSearchWords = searchWords.map(function (word) {
		return autoEscape ? (0, _utils.escapeRegExp)(word) : word;
	});
	var stringToReplace = modSearchWords.join('|');
	return (0, _core.jsx)('div', {
		css: highlightedStyling,
		dangerouslySetInnerHTML: {
			__html: hasPredictiveSuggestion ? textToHighlight : textToHighlight.replace(new RegExp(stringToReplace, 'ig'), function (matched) {
				return '<mark class="highlight">' + matched + '</mark>';
			})
		}
	});
};

Highlight.propTypes = {
	searchWords: _propTypes2.default.arrayOf(_propTypes2.default.string),
	textToHighlight: _propTypes2.default.string,
	autoEscape: _propTypes2.default.bool,
	hasPredictiveSuggestion: _propTypes2.default.bool
};

Highlight.defaultProps = {
	searchWords: [],
	textToHighlight: '',
	autoEscape: false,
	hasPredictiveSuggestion: false
};

exports.default = Highlight;