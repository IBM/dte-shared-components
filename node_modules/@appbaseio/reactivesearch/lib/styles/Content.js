'use strict';

exports.__esModule = true;

var _styledBase = require('@emotion/styled-base');

var _styledBase2 = _interopRequireDefault(_styledBase);

var _core = require('@emotion/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alert = function alert(_ref) {
	var theme = _ref.theme;
	return (/*#__PURE__*/(0, _core.css)('color:', theme.colors.alertColor, ';' + (process.env.NODE_ENV === 'production' ? '' : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvQ29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHZ0MiLCJmaWxlIjoiLi4vLi4vc3JjL3N0eWxlcy9Db250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbmNvbnN0IGFsZXJ0ID0gKHsgdGhlbWUgfSkgPT4gY3NzYFxuXHRjb2xvcjogJHt0aGVtZS5jb2xvcnMuYWxlcnRDb2xvcn07XG5gO1xuXG5jb25zdCBDb250ZW50ID0gc3R5bGVkLmRpdmBcblx0JHtwcm9wcyA9PiBwcm9wcy5hbGVydCAmJiBhbGVydH07XG5cdG1hcmdpbjogOHB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgQ29udGVudDtcbiJdfQ== */'))
	);
};

var Content = (0, _styledBase2.default)('div', {
	target: 'e19vigba0',
	label: 'Content'
})(function (props) {
	return props.alert && alert;
}, ';margin:8px;' + (process.env.NODE_ENV === 'production' ? '' : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvQ29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPMEIiLCJmaWxlIjoiLi4vLi4vc3JjL3N0eWxlcy9Db250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbmNvbnN0IGFsZXJ0ID0gKHsgdGhlbWUgfSkgPT4gY3NzYFxuXHRjb2xvcjogJHt0aGVtZS5jb2xvcnMuYWxlcnRDb2xvcn07XG5gO1xuXG5jb25zdCBDb250ZW50ID0gc3R5bGVkLmRpdmBcblx0JHtwcm9wcyA9PiBwcm9wcy5hbGVydCAmJiBhbGVydH07XG5cdG1hcmdpbjogOHB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgQ29udGVudDtcbiJdfQ== */'));

exports.default = Content;