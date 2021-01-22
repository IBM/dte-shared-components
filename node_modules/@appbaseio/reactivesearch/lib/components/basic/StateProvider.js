'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _propTypes = require('prop-types');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultKeys = ['hits', 'value', 'aggregations', 'error'];

var filterProps = function filterProps(props) {
	return _extends({}, props, {
		props: props.componentProps
	});
};

var filterByComponentIds = function filterByComponentIds(state) {
	var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var componentIds = props.componentIds;

	if (typeof componentIds === 'string') {
		var _ref;

		return _ref = {}, _ref[componentIds] = state[componentIds], _ref;
	}
	if (componentIds instanceof Array) {
		var filteredState = {};
		componentIds.forEach(function (componentId) {
			filteredState[componentId] = state[componentId];
		});
		return filteredState;
	}
	return state;
};

var filterByKeys = function filterByKeys(state, allowedKeys) {
	return Object.keys(state).reduce(function (components, componentId) {
		var _extends2;

		return _extends({}, components, (_extends2 = {}, _extends2[componentId] = Object.keys(state[componentId]).filter(function (key) {
			return allowedKeys.includes(key);
		}).reduce(function (obj, key) {
			// eslint-disable-next-line
			obj[key] = state[componentId][key];
			return obj;
		}, {}), _extends2));
	}, {});
};

var StateProvider = function (_Component) {
	_inherits(StateProvider, _Component);

	function StateProvider(props) {
		_classCallCheck(this, StateProvider);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			searchState: filterByKeys((0, _helper.getSearchState)(filterProps(props)), props.includeKeys)
		};
		return _this;
	}

	StateProvider.getDerivedStateFromProps = function getDerivedStateFromProps(props) {
		return {
			searchState: filterByKeys((0, _helper.getSearchState)(filterProps(props)), props.includeKeys)
		};
	};

	StateProvider.prototype.isStateChanged = function isStateChanged(prevState, nextState) {
		return JSON.stringify(nextState) !== JSON.stringify(prevState);
	};

	StateProvider.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
		// Only apply when componentIds is defined
		if (!nextProps.strict || this.isStateChanged(this.state, nextState)) {
			return true;
		}
		return false;
	};

	StateProvider.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
		var onChange = this.props.onChange;

		if (onChange && this.isStateChanged(prevState, this.state)) {
			onChange(prevState.searchState, this.state.searchState);
		}
	};

	StateProvider.prototype.render = function render() {
		var searchState = this.state.searchState;

		return (0, _utils.getComponent)({ searchState: searchState }, this.props);
	};

	return StateProvider;
}(_react.Component);

StateProvider.defaultProps = {
	strict: true,
	includeKeys: defaultKeys
};
StateProvider.propTypes = {
	onChange: _propTypes.func,
	render: _propTypes.func,
	componentIds: (0, _propTypes.oneOfType)([_propTypes.string, (0, _propTypes.arrayOf)(_propTypes.string)]),
	includeKeys: (0, _propTypes.arrayOf)(_propTypes.string),
	strict: _propTypes.bool,
	selectedValues: _types2.default.componentObject,
	customData: _types2.default.componentObject,
	queryLog: _types2.default.componentObject,
	componentProps: _types2.default.componentObject,
	hits: _types2.default.componentObject,
	aggregations: _types2.default.componentObject,
	isLoading: _types2.default.componentObject,
	error: _types2.default.componentObject,
	promotedResults: _types2.default.componentObject,
	rawData: _types2.default.rawData
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		selectedValues: filterByComponentIds(state.selectedValues, props),
		queryLog: filterByComponentIds(state.queryLog, props),
		dependencyTree: filterByComponentIds(state.dependencyTree, props),
		componentProps: filterByComponentIds(state.props, props),
		hits: filterByComponentIds(state.hits, props),
		aggregations: filterByComponentIds(state.aggregations, props),
		isLoading: filterByComponentIds(state.isLoading, props),
		error: filterByComponentIds(state.error, props),
		promotedResults: filterByComponentIds(state.promotedResults, props),
		customData: filterByComponentIds(state.customData, props),
		settings: filterByComponentIds(state.settings, props),
		rawData: filterByComponentIds(state.rawData, props)
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, null)(StateProvider);