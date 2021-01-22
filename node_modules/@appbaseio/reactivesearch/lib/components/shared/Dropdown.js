'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require('@emotion/core');

var _react = require('react');

var _downshift = require('downshift');

var _downshift2 = _interopRequireDefault(_downshift);

var _emotionTheming = require('emotion-theming');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _Input = require('../../styles/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Select = require('../../styles/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Chevron = require('../../styles/Chevron');

var _Chevron2 = _interopRequireDefault(_Chevron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @jsx jsx */


var Dropdown = function (_Component) {
	_inherits(Dropdown, _Component);

	function Dropdown(props) {
		_classCallCheck(this, Dropdown);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.toggle = function () {
			_this.setState({
				isOpen: !_this.state.isOpen
			});
		};

		_this.close = function () {
			_this.setState({
				isOpen: false
			});
		};

		_this.onChange = function (item) {
			if (_this.props.returnsObject) {
				_this.props.onChange(item);
			} else {
				_this.props.onChange(item[_this.props.keyField]);
			}

			if (!_this.props.multi) {
				_this.setState({
					isOpen: false
				});
			}
		};

		_this.handleStateChange = function (changes) {
			var isOpen = changes.isOpen,
			    type = changes.type;

			if (type === _downshift2.default.stateChangeTypes.mouseUp) {
				_this.setState({
					isOpen: isOpen
				});
			}
			if (type === _downshift2.default.stateChangeTypes.keyDownEscape) {
				_this.setState({
					isOpen: false
				});
			}
		};

		_this.getBackgroundColor = function (highlighted, selected) {
			var isDark = _this.props.themePreset === 'dark';
			if (highlighted) {
				return isDark ? '#555' : '#eee';
			}
			if (selected) {
				return isDark ? '#686868' : '#fafafa';
			}
			return isDark ? '#424242' : '#fff';
		};

		_this.handleInputChange = function (e) {
			var value = e.target.value;

			_this.setState({
				searchTerm: value
			});
		};

		_this.renderToString = function (value) {
			if (_this.props.customLabelRenderer) {
				var customLabel = _this.props.customLabelRenderer(value);
				if (typeof customLabel === 'string') {
					return customLabel;
				}
			}
			if (Array.isArray(value) && value.length) {
				var arrayToRender = value.map(function (item) {
					return _this.renderToString(item);
				});
				return arrayToRender.join(', ');
			}
			if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				if (value[_this.props.labelField]) {
					return value[_this.props.labelField];
				}
				if (Object.keys(value).length) {
					return _this.renderToString(Object.keys(value));
				}
				return _this.props.placeholder;
			}
			return value;
		};

		_this.state = {
			isOpen: false,
			searchTerm: ''
		};
		return _this;
	}

	Dropdown.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    items = _props.items,
		    selectedItem = _props.selectedItem,
		    placeholder = _props.placeholder,
		    labelField = _props.labelField,
		    keyField = _props.keyField,
		    themePreset = _props.themePreset,
		    theme = _props.theme,
		    renderItem = _props.renderItem,
		    transformData = _props.transformData,
		    footer = _props.footer,
		    hasCustomRenderer = _props.hasCustomRenderer,
		    customRenderer = _props.customRenderer;


		var itemsToRender = items;

		if (transformData) {
			itemsToRender = transformData(itemsToRender);
		}

		var dropdownItems = itemsToRender.filter(function (item) {
			if (String(item[labelField]).length) {
				if (_this2.props.showSearch && _this2.state.searchTerm) {
					return String(item[labelField]).toLowerCase().includes(_this2.state.searchTerm.toLowerCase());
				}
				return true;
			}
			return false;
		});

		return (0, _core.jsx)(_downshift2.default, {
			selectedItem: selectedItem,
			onChange: this.onChange,
			onOuterClick: this.close,
			onStateChange: this.handleStateChange,
			isOpen: this.state.isOpen,
			itemToString: function itemToString(i) {
				return i && i[_this2.props.labelField];
			},
			render: function render(_ref) {
				var getRootProps = _ref.getRootProps,
				    getButtonProps = _ref.getButtonProps,
				    getItemProps = _ref.getItemProps,
				    isOpen = _ref.isOpen,
				    highlightedIndex = _ref.highlightedIndex,
				    rest = _objectWithoutProperties(_ref, ['getRootProps', 'getButtonProps', 'getItemProps', 'isOpen', 'highlightedIndex']);

				return (0, _core.jsx)(
					'div',
					getRootProps({ css: _Input.suggestionsContainer }, { suppressRefError: true }),
					(0, _core.jsx)(
						_Select2.default,
						_extends({}, getButtonProps(), {
							className: (0, _helper.getClassName)(_this2.props.innerClass, 'select') || null,
							onClick: _this2.toggle,
							title: selectedItem ? _this2.renderToString(selectedItem) : placeholder,
							small: _this2.props.small,
							themePreset: _this2.props.themePreset
						}),
						_this2.props.customLabelRenderer ? _this2.props.customLabelRenderer(selectedItem) : (0, _core.jsx)(
							'div',
							null,
							selectedItem ? _this2.renderToString(selectedItem) : placeholder
						),
						(0, _core.jsx)(_Chevron2.default, { open: isOpen })
					),

					// eslint-disable-next-line
					hasCustomRenderer ? customRenderer(itemsToRender, _extends({
						getButtonProps: getButtonProps, getItemProps: getItemProps, isOpen: isOpen, highlightedIndex: highlightedIndex }, rest)) : isOpen && itemsToRender.length ? (0, _core.jsx)(
						'ul',
						{
							css: (0, _Input.suggestions)(themePreset, theme),
							className: (_this2.props.small ? 'small' : '') + ' ' + (0, _helper.getClassName)(_this2.props.innerClass, 'list')
						},
						_this2.props.showSearch ? (0, _core.jsx)(_Input2.default, {
							id: _this2.props.componentId + '-input',
							style: {
								border: 0,
								borderBottom: '1px solid #ddd'
							},
							showIcon: false,
							className: (0, _helper.getClassName)(_this2.props.innerClass, 'input'),
							placeholder: _this2.props.searchPlaceholder,
							value: _this2.state.searchTerm,
							onChange: _this2.handleInputChange,
							themePreset: themePreset
						}) : null,
						dropdownItems.length ? dropdownItems.map(function (item, index) {
							var selected = _this2.props.multi
							// MultiDropdownList
							&& (selectedItem && !!selectedItem[item[keyField]] ||
							// MultiDropdownRange
							Array.isArray(selectedItem) && selectedItem.find(function (value) {
								return value[labelField] === item[labelField];
							}));
							if (!_this2.props.multi) selected = item.key === selectedItem;

							return (0, _core.jsx)(
								'li',
								_extends({}, getItemProps({ item: item }), {
									key: item[keyField],
									className: '' + (selected ? 'active' : ''),
									style: {
										backgroundColor: _this2.getBackgroundColor(highlightedIndex === index, selected)
									}
								}),
								renderItem ? renderItem(item[labelField], item.doc_count, selected && _this2.props.multi) : (0, _core.jsx)(
									'div',
									null,
									typeof item[labelField] === 'string' ? (0, _core.jsx)('span', {
										dangerouslySetInnerHTML: {
											__html: item[labelField]
										}
									}) : item[labelField],
									_this2.props.showCount && item.doc_count && (0, _core.jsx)(
										'span',
										{
											className: (0, _helper.getClassName)(_this2.props.innerClass, 'count') || null
										},
										'\xA0(',
										item.doc_count,
										')'
									)
								),
								selected && _this2.props.multi ? (0, _core.jsx)(_Select.Tick, {
									className: (0, _helper.getClassName)(_this2.props.innerClass, 'icon') || null
								}) : null
							);
						}) : _this2.props.renderNoResults && _this2.props.renderNoResults(),
						footer
					) : null
				);
			}
		});
	};

	return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {
	keyField: 'key',
	labelField: 'label',
	small: false,
	searchPlaceholder: 'Type here to search...'
};

Dropdown.propTypes = {
	innerClass: _types2.default.style,
	items: _types2.default.data,
	keyField: _types2.default.string,
	labelField: _types2.default.string,
	multi: _types2.default.bool,
	hasCustomRenderer: _types2.default.bool,
	onChange: _types2.default.func,
	placeholder: _types2.default.string,
	searchPlaceholder: _types2.default.string,
	returnsObject: _types2.default.bool,
	renderItem: _types2.default.func,
	transformData: _types2.default.func,
	renderNoResults: _types2.default.func,
	customRenderer: _types2.default.func,
	customLabelRenderer: _types2.default.func,
	selectedItem: _types2.default.selectedValue,
	showCount: _types2.default.bool,
	single: _types2.default.bool,
	small: _types2.default.bool,
	theme: _types2.default.style,
	themePreset: _types2.default.themePreset,
	showSearch: _types2.default.bool,
	footer: _types2.default.children,
	componentId: _types2.default.string
};

exports.default = (0, _emotionTheming.withTheme)(Dropdown);