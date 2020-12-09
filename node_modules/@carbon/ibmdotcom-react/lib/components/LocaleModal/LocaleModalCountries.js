"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.filterLocale = exports._setCookie = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _ipcinfoCookie = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/ipcinfoCookie/ipcinfoCookie"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Search = _interopRequireDefault(require("../../internal/vendor/carbon-components-react/components/Search/Search"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * LocaleModalCountries component
 *
 * @param {object} props props object
 * @param {object} props.regionList object of country and language codes
 * @param {Function} props.setClearResults set flag to determine whether to reset the filtered results
 * @param {string} props.currentRegion current region
 * @returns {*} LocaleModal component
 */

var LocaleModalCountries = function LocaleModalCountries(_ref) {
  var regionList = _ref.regionList,
      setClearResults = _ref.setClearResults,
      currentRegion = _ref.currentRegion,
      modalLabels = (0, _objectWithoutProperties2.default)(_ref, ["regionList", "setClearResults", "currentRegion"]);
  var localList = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    localList.current.scrollTop = 0;
  }, [currentRegion, regionList]);
  (0, _react.useEffect)(function () {
    var localeFilter = document.getElementById("".concat(prefix, "--locale-modal__filter"));
    var localeText = document.querySelector(".".concat(prefix, "--locale-modal__search-text"));
    var closeBtn = document.querySelector(".".concat(prefix, "--search .").concat(prefix, "--search-close"));
    var localeHidden = "".concat(prefix, "--locale-modal__locales-hidden");
    localeFilter === null || localeFilter === void 0 ? void 0 : localeFilter.addEventListener('keyup', filterLocale.bind(null, setClearResults, localeFilter, localeHidden, localeText, modalLabels));
    /**
     * Show all links when close button clicked
     *
     */

    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', setClearResults.bind(null, true));
    return function () {
      closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.removeEventListener('click', setClearResults.bind(null, true));
      localeFilter === null || localeFilter === void 0 ? void 0 : localeFilter.removeEventListener('keyup', filterLocale.bind(null, setClearResults, localeFilter, localeHidden, localeText, modalLabels));
    };
  });
  return _react.default.createElement("div", {
    className: "".concat(prefix, "--locale-modal__filter")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--locale-modal__search")
  }, _react.default.createElement(_Search.default, {
    "data-autoid": "".concat(stablePrefix, "--locale-modal__filter"),
    placeHolderText: modalLabels.searchPlaceholder,
    labelText: modalLabels.searchLabel,
    closeButtonLabelText: modalLabels.searchClearText,
    id: "".concat(prefix, "--locale-modal__filter"),
    tabIndex: "0"
  }), _react.default.createElement("p", {
    className: "".concat(prefix, "--locale-modal__search-text")
  }, modalLabels.availabilityText)), _react.default.createElement("ul", {
    className: "".concat(prefix, "--locale-modal__list"),
    ref: localList
  }, regionList === null || regionList === void 0 ? void 0 : regionList.map(function (region) {
    return currentRegion === region.name && region.countries.map(function (country, index) {
      return _react.default.createElement("li", {
        key: index
      }, _react.default.createElement("a", {
        className: "".concat(prefix, "--locale-modal__locales"),
        onClick: function onClick() {
          return _setCookie(country.locale);
        },
        href: country.href,
        "data-region": country.region
      }, _react.default.createElement("div", {
        className: "".concat(prefix, "--locale-modal__locales__name")
      }, country.name), _react.default.createElement("div", {
        className: "".concat(prefix, "--locale-modal__locales__name")
      }, country.language)));
    });
  })));
};
/**
 * @property {object} propTypes LocaleModalCountries propTypes
 * @description Defined property types for component
 * @type {{regionList: Array, availabilityText: string, unavailabilityText: string, placeHolderText: string, labelText: string}}
 */


LocaleModalCountries.propTypes = {
  /**
   * Array of regions, countries, and languages.
   */
  regionList: _propTypes.default.array,

  /**
   * Func to clear search input.
   */
  setClearResults: _propTypes.default.func,

  /**
   * String of current region.
   */
  currentRegion: _propTypes.default.string
};
LocaleModalCountries.defaultProps = {
  searchLabel: 'Search by location or language'
};
/**
 * method to handle when country/region has been selected
 * sets the ipcInfo cookie with selected locale
 *
 * @param {object} locale selected country/region
 * @private
 */

var _setCookie = function _setCookie(locale) {
  var localeSplit = locale.split('-');
  var localeObj = {
    cc: localeSplit[1],
    lc: localeSplit[0]
  };

  _ipcinfoCookie.default.set(localeObj);
};
/**
 * Filter locale links based on search input
 *
 */


exports._setCookie = _setCookie;

var filterLocale = function filterLocale(setClearResults, localeFilter, localeHidden, localeText, modalLabels) {
  var localeItems = document.querySelectorAll(".".concat(prefix, "--locale-modal__list a:not(.").concat(prefix, "--locale-modal__locales-filtered)"));
  setClearResults(false);
  var filterVal = localeFilter.value.toUpperCase();
  (0, _toConsumableArray2.default)(localeItems).map(function (item) {
    var locale = item.getElementsByTagName('div');
    var country = locale[0].textContent || locale[0].innerText;
    var language = locale[1].textContent || locale[1].innerText;

    if (country.toUpperCase().indexOf(filterVal) > -1 || language.toUpperCase().indexOf(filterVal) > -1) {
      item.classList.remove(localeHidden);
    } else {
      item.classList.add(localeHidden);
    }
  });
  /**
   * Update locale copy when no results
   *
   */

  var localeItemsHidden = document.querySelectorAll(".".concat(localeHidden));
  localeText.innerHTML = localeItems.length === localeItemsHidden.length ? modalLabels.unavailabilityText : modalLabels.availabilityText;
};

exports.filterLocale = filterLocale;
var _default = LocaleModalCountries;
exports.default = _default;