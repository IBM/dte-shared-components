"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
/**
 * Renders the input bar with the search icon.
 */

var MastheadSearchInput = function MastheadSearchInput(_ref) {
  var componentInputProps = _ref.componentInputProps,
      dispatch = _ref.dispatch,
      isActive = _ref.isActive;
  var searchRef = (0, _react.useRef)();
  /**
   * Clear search and clear input when called
   */

  var resetSearch = (0, _react.useCallback)(function () {
    dispatch({
      type: 'setSearchClosed'
    });
    dispatch({
      type: 'setVal',
      payload: {
        val: ''
      }
    });
  }, [dispatch]);
  (0, _react.useEffect)(function () {
    if (isActive) {
      searchRef.current && searchRef.current.focus();
    } else resetSearch();
  }, [isActive, resetSearch]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", (0, _extends2.default)({}, componentInputProps, {
    "data-autoid": "".concat(stablePrefix, "--header__search--input"),
    ref: searchRef,
    name: "q",
    tabIndex: isActive ? null : '-1'
  })));
};

MastheadSearchInput.propTypes = {
  /**
   * The input props.
   */
  componentInputProps: _propTypes.default.object,

  /**
   * The Redux action dispatcher to control `<MastheadSearch>`.
   */
  dispatch: _propTypes.default.func,

  /**
   * `true` to make the search active.
   */
  isActive: _propTypes.default.bool,

  /**
   * Executes when the search icon is clicked.
   */
  searchIconClick: _propTypes.default.func
};
MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: function dispatch() {},
  searchIconClick: function searchIconClick() {}
};
var _default = MastheadSearchInput;
exports.default = _default;