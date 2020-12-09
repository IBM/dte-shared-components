import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ipcinfoCookie from '@carbon/ibmdotcom-utilities/es/utilities/ipcinfoCookie/ipcinfoCookie';
import PropTypes from 'prop-types';
import Search from '../../internal/vendor/carbon-components-react/components/Search/Search';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
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
      modalLabels = _objectWithoutProperties(_ref, ["regionList", "setClearResults", "currentRegion"]);

  var localList = useRef(null);
  useEffect(function () {
    localList.current.scrollTop = 0;
  }, [currentRegion, regionList]);
  useEffect(function () {
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
  return React.createElement("div", {
    className: "".concat(prefix, "--locale-modal__filter")
  }, React.createElement("div", {
    className: "".concat(prefix, "--locale-modal__search")
  }, React.createElement(Search, {
    "data-autoid": "".concat(stablePrefix, "--locale-modal__filter"),
    placeHolderText: modalLabels.searchPlaceholder,
    labelText: modalLabels.searchLabel,
    closeButtonLabelText: modalLabels.searchClearText,
    id: "".concat(prefix, "--locale-modal__filter"),
    tabIndex: "0"
  }), React.createElement("p", {
    className: "".concat(prefix, "--locale-modal__search-text")
  }, modalLabels.availabilityText)), React.createElement("ul", {
    className: "".concat(prefix, "--locale-modal__list"),
    ref: localList
  }, regionList === null || regionList === void 0 ? void 0 : regionList.map(function (region) {
    return currentRegion === region.name && region.countries.map(function (country, index) {
      return React.createElement("li", {
        key: index
      }, React.createElement("a", {
        className: "".concat(prefix, "--locale-modal__locales"),
        onClick: function onClick() {
          return _setCookie(country.locale);
        },
        href: country.href,
        "data-region": country.region
      }, React.createElement("div", {
        className: "".concat(prefix, "--locale-modal__locales__name")
      }, country.name), React.createElement("div", {
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
  regionList: PropTypes.array,

  /**
   * Func to clear search input.
   */
  setClearResults: PropTypes.func,

  /**
   * String of current region.
   */
  currentRegion: PropTypes.string
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

export var _setCookie = function _setCookie(locale) {
  var localeSplit = locale.split('-');
  var localeObj = {
    cc: localeSplit[1],
    lc: localeSplit[0]
  };
  ipcinfoCookie.set(localeObj);
};
/**
 * Filter locale links based on search input
 *
 */

export var filterLocale = function filterLocale(setClearResults, localeFilter, localeHidden, localeText, modalLabels) {
  var localeItems = document.querySelectorAll(".".concat(prefix, "--locale-modal__list a:not(.").concat(prefix, "--locale-modal__locales-filtered)"));
  setClearResults(false);
  var filterVal = localeFilter.value.toUpperCase();

  _toConsumableArray(localeItems).map(function (item) {
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
export default LocaleModalCountries;