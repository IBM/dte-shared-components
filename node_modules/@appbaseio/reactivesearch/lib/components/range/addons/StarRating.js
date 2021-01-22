'use strict';

exports.__esModule = true;

var _core = require('@emotion/core');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _propTypes = require('prop-types');

var _Star = require('./Star');

var _Star2 = _interopRequireDefault(_Star);

var _ratingsList = require('../../../styles/ratingsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx jsx */
function StarRating(props) {
	var icon = props.icon,
	    dimmedIcon = props.dimmedIcon;

	return (0, _core.jsx)(
		'div',
		{ css: _ratingsList.starRow },
		Array(props.stars).fill('').map(function (_, index) {
			return icon ? (0, _core.jsx)(
				_react2.default.Fragment,
				{ key: index },
				icon
			) // eslint-disable-line
			: (0, _core.jsx)(_Star2.default, { key: index }) // eslint-disable-line
			;
		}),
		Array(5 - props.stars).fill('').map(function (_, index) {
			return dimmedIcon ? (0, _core.jsx)(
				_react2.default.Fragment,
				{ key: index },
				dimmedIcon
			) // eslint-disable-line
			: (0, _core.jsx)(_Star2.default, { key: index, css: _ratingsList.whiteStar }) // eslint-disable-line
			;
		})
	);
}

StarRating.propTypes = {
	stars: _types2.default.number,
	icon: _propTypes.element,
	dimmedIcon: _propTypes.element
};

exports.default = StarRating;