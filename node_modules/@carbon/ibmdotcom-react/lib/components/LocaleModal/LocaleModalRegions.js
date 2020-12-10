"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.addLocaleBackBtnListeners = exports.localeBackActive = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireWildcard(require("react"));

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/arrow--right/20"));

var _CardLink = require("../CardLink");

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _2 = _interopRequireDefault(require("@carbon/icons-react/lib/error/20"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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
 * LocaleModalRegions component
 *
 * @param {object} props props object
 * @param {object} props.regionList object of regions
 * @param {Function} props.setCurrentRegion sets state for region name
 * @param {boolean} props.setIsFiltering true when search filter is visible
 * @param {Function} props.setClearResults set flag to determine whether to reset the filtered results
 * @param {string} props.closeModalLabel label for the close button
 * @param {string} props.returnButtonLabel label for the return button
 * @returns {*} LocaleModalRegions component
 */

var LocaleModalRegions = function LocaleModalRegions(_ref) {
  var regionList = _ref.regionList,
      setCurrentRegion = _ref.setCurrentRegion,
      setIsFiltering = _ref.setIsFiltering,
      setClearResults = _ref.setClearResults,
      returnButtonLabel = _ref.returnButtonLabel,
      closeModalLabel = _ref.closeModalLabel;
  (0, _react.useEffect)(function () {
    var regionLink = document.querySelectorAll(".".concat(prefix, "--card"));
    (0, _toConsumableArray2.default)(regionLink).forEach(function (link) {
      link.setAttribute('tabindex', '0');
      link.addEventListener('click', function () {
        var searchInput = document.getElementById("".concat(prefix, "--locale-modal__filter"));
        searchInput.focus();
        setCurrentRegion(link.getElementsByTagName('h3')[0].innerHTML);
        setIsFiltering(true);
        /**
         * go back to region selection
         *
         */

        var localeBackBtn = document.querySelectorAll(".".concat(prefix, "--locale-modal__back .").concat(prefix, "--modal-header__label,\n          .").concat(prefix, "--locale-modal__back .").concat(prefix, "--modal-close"));
        addLocaleBackBtnListeners(localeBackBtn, returnButtonLabel, setIsFiltering, setClearResults, closeModalLabel);
      });
    });
  });
  return _react.default.createElement("div", {
    className: "".concat(prefix, "--grid ").concat(prefix, "--no-gutter ").concat(prefix, "--locale-modal__regions")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--row")
  }, regionList && regionList.map(function (region) {
    var hasCountries = region.countries.length !== 0;
    return _react.default.createElement("div", {
      key: "".concat(region.name),
      className: "".concat(prefix, "--col-sm-4 ").concat(prefix, "--col-md-8 ").concat(prefix, "--col-lg-8 ").concat(prefix, "--col-xlg-8 ").concat(prefix, "--no-gutter")
    }, _react.default.createElement(_CardLink.CardLink, {
      "data-autoid": "".concat(stablePrefix, "--locale-modal__geo-btn-").concat(region.key),
      key: region.key,
      card: {
        'data-region': region.key,
        heading: region.name,
        cta: {
          type: 'local',
          href: hasCountries ? '#' : null,
          icon: {
            src: hasCountries ? _.default : _2.default
          }
        },
        handleClick: function handleClick(e) {
          return e.preventDefault();
        }
      }
    }));
  })));
};
/**
 * Removes tabindex and role as it goes back
 *
 * @param {*} btn btn element
 */


var localeBackActive = function localeBackActive(btn, setIsFiltering, setClearResults) {
  setIsFiltering(false);
  setClearResults(true);
  var filter = document.getElementById("".concat(prefix, "--locale-modal__filter"));

  if (filter) {
    filter.value = '';
  }

  btn.removeAttribute('tabindex');
  btn.removeAttribute('role');
  btn.removeAttribute('aria-label');
};
/**
 * Add listeners and appropriate role, tab-index and aria-label to the buttons provided
 *
 * @param {Array} buttons buttons to be processed
 * @param {Function} returnButtonLabel hook from props
 * @param {Function} setIsFiltering hook from props
 * @param {Function} setClearResults hook from props
 * @param {Function} closeModalLabel hook from props
 */


exports.localeBackActive = localeBackActive;

var addLocaleBackBtnListeners = function addLocaleBackBtnListeners(buttons, returnButtonLabel, setIsFiltering, setClearResults, closeModalLabel) {
  (0, _toConsumableArray2.default)(buttons).forEach(function (btn) {
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', btn.tagName.toLowerCase() === 'button' ? closeModalLabel : returnButtonLabel);
    btn.addEventListener('click', function click() {
      localeBackActive(btn, setIsFiltering, setClearResults);
      btn.removeEventListener('click', click);
    });
    btn.addEventListener('keyup', function keyup(e) {
      if (e.keyCode === 32 || e.keyCode === 13) {
        localeBackActive(btn, setIsFiltering, setClearResults);
        btn.removeEventListener('keyup', keyup);
      }
    });
  });
};
/**
 * @property {object} propTypes LocaleModalRegions propTypes
 * @description Defined property types for component
 * @type {{}}
 */


exports.addLocaleBackBtnListeners = addLocaleBackBtnListeners;
LocaleModalRegions.propTypes = {
  /**
   * Object with region list json data
   * https://1.www.s81c.com/common/js/dynamicnav/www/countrylist/jsononly/usen-utf8.json
   */
  regionList: _propTypes.default.array,

  /**
   * Sets current region
   */
  setCurrentRegion: _propTypes.default.func,

  /**
   * Sets region filter
   */
  setIsFiltering: _propTypes.default.func,

  /**
   * Clears filter input and resets list
   */
  setClearResults: _propTypes.default.func,

  /**
   * Back button copy
   */
  returnButtonLabel: _propTypes.default.string,

  /**
   * Close button copy
   */
  closeModalLabel: _propTypes.default.string
};
var _default = LocaleModalRegions;
exports.default = _default;