import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { CardLink } from '../CardLink';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import Error20 from '@carbon/icons-react/es/error/20';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
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
  useEffect(function () {
    var regionLink = document.querySelectorAll(".".concat(prefix, "--card"));

    _toConsumableArray(regionLink).forEach(function (link) {
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
  return React.createElement("div", {
    className: "".concat(prefix, "--grid ").concat(prefix, "--no-gutter ").concat(prefix, "--locale-modal__regions")
  }, React.createElement("div", {
    className: "".concat(prefix, "--row")
  }, regionList && regionList.map(function (region) {
    var hasCountries = region.countries.length !== 0;
    return React.createElement("div", {
      key: "".concat(region.name),
      className: "".concat(prefix, "--col-sm-4 ").concat(prefix, "--col-md-8 ").concat(prefix, "--col-lg-8 ").concat(prefix, "--col-xlg-8 ").concat(prefix, "--no-gutter")
    }, React.createElement(CardLink, {
      "data-autoid": "".concat(stablePrefix, "--locale-modal__geo-btn-").concat(region.key),
      key: region.key,
      card: {
        'data-region': region.key,
        heading: region.name,
        cta: {
          type: 'local',
          href: hasCountries ? '#' : null,
          icon: {
            src: hasCountries ? ArrowRight20 : Error20
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


export var localeBackActive = function localeBackActive(btn, setIsFiltering, setClearResults) {
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

export var addLocaleBackBtnListeners = function addLocaleBackBtnListeners(buttons, returnButtonLabel, setIsFiltering, setClearResults, closeModalLabel) {
  _toConsumableArray(buttons).forEach(function (btn) {
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

LocaleModalRegions.propTypes = {
  /**
   * Object with region list json data
   * https://1.www.s81c.com/common/js/dynamicnav/www/countrylist/jsononly/usen-utf8.json
   */
  regionList: PropTypes.array,

  /**
   * Sets current region
   */
  setCurrentRegion: PropTypes.func,

  /**
   * Sets region filter
   */
  setIsFiltering: PropTypes.func,

  /**
   * Clears filter input and resets list
   */
  setClearResults: PropTypes.func,

  /**
   * Back button copy
   */
  returnButtonLabel: PropTypes.string,

  /**
   * Close button copy
   */
  closeModalLabel: PropTypes.string
};
export default LocaleModalRegions;