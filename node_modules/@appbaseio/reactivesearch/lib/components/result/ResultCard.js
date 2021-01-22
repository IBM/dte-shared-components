'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Title = require('../../styles/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Card = require('../../styles/Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultCard = function (_Component) {
	_inherits(ResultCard, _Component);

	function ResultCard() {
		_classCallCheck(this, ResultCard);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	ResultCard.prototype.render = function render() {
		var _props = this.props,
		    children = _props.children,
		    href = _props.href,
		    target = _props.target,
		    id = _props.id,
		    props = _objectWithoutProperties(_props, ['children', 'href', 'target', 'id']);

		return _react2.default.createElement(
			_Card2.default,
			_extends({
				id: id,
				href: href,
				target: target,
				rel: target === '_blank' ? 'noopener noreferrer' : null
			}, props),
			children
		);
	};

	return ResultCard;
}(_react.Component);

ResultCard.Image = function (_ref) {
	var src = _ref.src,
	    props = _objectWithoutProperties(_ref, ['src']);

	return _react2.default.createElement(_Card.Image, _extends({ style: { backgroundImage: 'url(' + src + ')' } }, props));
};

ResultCard.Title = function (_ref2) {
	var children = _ref2.children,
	    props = _objectWithoutProperties(_ref2, ['children']);

	return _react2.default.createElement(
		_Title2.default,
		props,
		children
	);
};

ResultCard.Description = function (_ref3) {
	var children = _ref3.children,
	    props = _objectWithoutProperties(_ref3, ['children']);

	return _react2.default.createElement(
		'article',
		props,
		children
	);
};

ResultCard.Image.displayName = 'ResultCardImage';

ResultCard.propTypes = {
	children: _types2.default.children,
	target: _types2.default.stringRequired,
	id: (0, _propTypes.oneOfType)([_types2.default.string, _types2.default.number]),
	href: _types2.default.string
};

ResultCard.defaultProps = {
	target: '_blank'
};

exports.default = ResultCard;