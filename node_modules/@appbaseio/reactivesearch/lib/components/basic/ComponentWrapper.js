'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _transform = require('@appbaseio/reactivecore/lib/utils/transform');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ComponentWrapper component is a wrapper component for each ReactiveSearch component
 * which is responsible for following tasks:
 * 1. Register a component on mount
 * 2. Set query listener
 * 3. Set react prop
 * 4. Follow the [1-3] for the internal component if needed
 * 5. Update component props in redux store
 * 6. Unregister the component on un-mount
 */
var ComponentWrapper = function (_React$Component) {
	_inherits(ComponentWrapper, _React$Component);

	function ComponentWrapper(props) {
		_classCallCheck(this, ComponentWrapper);

		// Register  component
		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_initialiseProps.call(_this);

		props.addComponent(props.componentId);
		props.setQueryListener(props.componentId, props.onQueryChange, props.onError);
		// Update props in store
		props.setComponentProps(props.componentId, props);

		if (props.internalComponent) {
			_this.internalComponent = (0, _transform.getInternalComponentID)(props.componentId);
		}

		// Register internal component
		if (_this.internalComponent) {
			props.addComponent(_this.internalComponent);
			props.setComponentProps(_this.internalComponent, props);
		}
		return _this;
	}

	ComponentWrapper.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		var _this2 = this;

		(0, _helper.checkSomePropChange)(this.props, prevProps, (0, _utils.getValidPropsKeys)(this.props), function () {
			_this2.props.updateComponentProps(_this2.props.componentId, _this2.props);
			if (_this2.internalComponent) {
				_this2.props.updateComponentProps(_this2.internalComponent, _this2.props);
			}
		});
		(0, _helper.checkPropChange)(this.props.react, prevProps.react, function () {
			return _this2.setReact(_this2.props);
		});
	};

	ComponentWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
		// Unregister components
		var componentId = this.props.componentId;

		this.props.removeComponent(componentId);
		if (this.internalComponent) {
			this.props.removeComponent(this.internalComponent);
		}
	};

	ComponentWrapper.prototype.componentDidMount = function componentDidMount() {
		// Register internal component
		if (this.internalComponent) {
			// Watch component after rendering the component to avoid the un-necessary calls
			this.setReact(this.props);
		}
	};

	ComponentWrapper.prototype.render = function render() {
		if (this.hasCustomRenderer) {
			return (0, _utils.getComponent)({}, this.props);
		}
		return null;
	};

	_createClass(ComponentWrapper, [{
		key: 'hasCustomRenderer',
		get: function get() {
			return (0, _utils.hasCustomRenderer)(this.props);
		}
	}]);

	return ComponentWrapper;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.setReact = function (props) {
		var react = props.react;

		if (_this3.internalComponent) {
			if (react) {
				var newReact = (0, _helper.pushToAndClause)(react, _this3.internalComponent);
				props.watchComponent(props.componentId, newReact);
			} else {
				props.watchComponent(props.componentId, {
					and: _this3.internalComponent
				});
			}
		} else {
			props.watchComponent(props.componentId, react);
		}
	};
};

ComponentWrapper.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setComponentProps: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	updateComponentProps: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	// component props
	children: _types2.default.func,
	componentId: _types2.default.string.isRequired,
	componentType: _types2.default.componentType,
	internalComponent: _types2.default.bool,
	onError: _types2.default.func,
	onQueryChange: _types2.default.func,
	react: _types2.default.react,
	render: _types2.default.func
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		setComponentProps: function setComponentProps(component, options) {
			return dispatch((0, _actions.setComponentProps)(component, options, ownProps.componentType));
		},
		updateComponentProps: function updateComponentProps(component, options) {
			return dispatch((0, _actions.updateComponentProps)(component, options, ownProps.componentType));
		},
		addComponent: function addComponent(component) {
			return dispatch((0, _actions.addComponent)(component));
		},
		removeComponent: function removeComponent(component) {
			return dispatch((0, _actions.removeComponent)(component));
		},
		watchComponent: function watchComponent(component, react) {
			return dispatch((0, _actions.watchComponent)(component, react));
		},
		setQueryListener: function setQueryListener(component, onQueryChange, beforeQueryChange) {
			return dispatch((0, _actions.setQueryListener)(component, onQueryChange, beforeQueryChange));
		}
	};
};

exports.default = (0, _utils.connect)(null, mapDispatchToProps)(ComponentWrapper);