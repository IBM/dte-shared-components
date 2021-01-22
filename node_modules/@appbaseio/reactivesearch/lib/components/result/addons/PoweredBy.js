'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _PoweredByImage = require('../../../styles/PoweredByImage');

var _PoweredByImage2 = _interopRequireDefault(_PoweredByImage);

var _Flex = require('../../../styles/Flex');

var _Flex2 = _interopRequireDefault(_Flex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PoweredBy = function (_React$PureComponent) {
	_inherits(PoweredBy, _React$PureComponent);

	function PoweredBy() {
		_classCallCheck(this, PoweredBy);

		return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
	}

	PoweredBy.prototype.render = function render() {
		if (this.props.show) {
			return _react2.default.createElement(
				_Flex2.default,
				{
					direction: 'row-reverse',
					className: (0, _helper.getClassName)(this.props.innerClass, 'poweredBy')
				},
				_react2.default.createElement(
					'a',
					{ href: 'https://appbase.io/', target: '_blank', rel: 'noopener noreferrer' },
					_react2.default.createElement(_PoweredByImage2.default, { src: 'https://cdn.rawgit.com/appbaseio/cdn/d2ec210045e59104ee5485841fa17b23fc83f097/appbase/logos/rbc-logo.svg' })
				)
			);
		}

		return null;
	};

	return PoweredBy;
}(_react2.default.PureComponent);

PoweredBy.propTypes = {
	show: _types2.default.bool,
	innerClass: _types2.default.style
};

exports.default = PoweredBy;