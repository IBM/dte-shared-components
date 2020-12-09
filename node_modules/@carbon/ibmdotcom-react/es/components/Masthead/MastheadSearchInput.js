import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useEffect, useRef } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
var stablePrefix = ddsSettings.stablePrefix;
/**
 * Renders the input bar with the search icon.
 */

var MastheadSearchInput = function MastheadSearchInput(_ref) {
  var componentInputProps = _ref.componentInputProps,
      dispatch = _ref.dispatch,
      isActive = _ref.isActive;
  var searchRef = useRef();
  /**
   * Clear search and clear input when called
   */

  var resetSearch = useCallback(function () {
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
  useEffect(function () {
    if (isActive) {
      searchRef.current && searchRef.current.focus();
    } else resetSearch();
  }, [isActive, resetSearch]);
  return React.createElement(React.Fragment, null, React.createElement("input", _extends({}, componentInputProps, {
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
  componentInputProps: PropTypes.object,

  /**
   * The Redux action dispatcher to control `<MastheadSearch>`.
   */
  dispatch: PropTypes.func,

  /**
   * `true` to make the search active.
   */
  isActive: PropTypes.bool,

  /**
   * Executes when the search icon is clicked.
   */
  searchIconClick: PropTypes.func
};
MastheadSearchInput.defaultProps = {
  componentInputProps: {},
  dispatch: function dispatch() {},
  searchIconClick: function searchIconClick() {}
};
export default MastheadSearchInput;