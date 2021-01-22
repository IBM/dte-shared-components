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

var _ListItem = require('../../styles/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ResultListImage = require('./addons/ResultListImage');

var _ResultListImage2 = _interopRequireDefault(_ResultListImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultList = function (_Component) {
	_inherits(ResultList, _Component);

	function ResultList() {
		var _temp, _this, _ret;

		_classCallCheck(this, ResultList);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			hasImage: false,
			isSmall: false
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	ResultList.prototype.componentDidMount = function componentDidMount() {
		var hasImage = false;
		var isSmall = false;
		var children = this.props.children;

		var ImageChild = _react2.default.Children.toArray(children).find(function (o) {
			return o.type && o.type.name === _ResultListImage2.default.name;
		});
		if (ImageChild) {
			hasImage = true;
			if (ImageChild.props.small) {
				isSmall = true;
			}
		}

		// eslint-disable-next-line
		this.setState({
			hasImage: hasImage,
			isSmall: isSmall
		});
	};

	ResultList.prototype.render = function render() {
		var _props = this.props,
		    children = _props.children,
		    id = _props.id,
		    href = _props.href,
		    target = _props.target,
		    props = _objectWithoutProperties(_props, ['children', 'id', 'href', 'target']);

		var _state = this.state,
		    hasImage = _state.hasImage,
		    isSmall = _state.isSmall;

		return _react2.default.createElement(
			_ListItem2.default,
			_extends({
				id: id,
				href: href,
				image: hasImage,
				small: isSmall,
				target: target,
				rel: target === '_blank' ? 'noopener noreferrer' : null
			}, props),
			children
		);
	};

	return ResultList;
}(_react.Component);

ResultList.Image = _ResultListImage2.default;

ResultList.Content = function (_ref) {
	var children = _ref.children,
	    props = _objectWithoutProperties(_ref, ['children']);

	return _react2.default.createElement(
		'article',
		props,
		children
	);
};

ResultList.Title = function (_ref2) {
	var children = _ref2.children,
	    props = _objectWithoutProperties(_ref2, ['children']);

	return _react2.default.createElement(
		_Title2.default,
		props,
		children
	);
};

ResultList.Description = function (_ref3) {
	var children = _ref3.children,
	    props = _objectWithoutProperties(_ref3, ['children']);

	return _react2.default.createElement(
		'div',
		props,
		children
	);
};

ResultList.propTypes = {
	children: _types2.default.children,
	target: _types2.default.stringRequired,
	href: _types2.default.string,
	id: (0, _propTypes.oneOfType)([_types2.default.string, _types2.default.number])
};

ResultList.defaultProps = {
	target: '_blank'
};

exports.default = ResultList;