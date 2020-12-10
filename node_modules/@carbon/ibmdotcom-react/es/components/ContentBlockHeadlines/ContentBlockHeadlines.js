/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from 'react';
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import { CTA } from '../CTA';
import { DDS_CONTENTBLOCK_HEADLINES } from '../../internal/FeatureFlags';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import featureFlag from '@carbon/ibmdotcom-utilities/es/utilities/featureflag/featureflag';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * ContentBlockHeadlines pattern
 */

var ContentBlockHeadlines = function ContentBlockHeadlines(_ref) {
  var heading = _ref.heading,
      copy = _ref.copy,
      items = _ref.items;
  var containerRef = useRef();
  var contentRows = chunk(items, 2);
  useEffect(function () {
    setSameHeight();
    root.addEventListener('resize', setSameHeight);
    return function () {
      return root.removeEventListener('resize', setSameHeight);
    };
  }, []);
  /**
   * Function that activates the sameHeight utility
   */

  var setSameHeight = function setSameHeight() {
    root.requestAnimationFrame(function () {
      var containerNode = containerRef.current;

      if (containerNode) {
        sameHeight(containerNode.getElementsByClassName("".concat(prefix, "--content-block-headlines__copy")), 'md');
      }
    });
  };

  return featureFlag(DDS_CONTENTBLOCK_HEADLINES, React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block-headlines"),
    className: "".concat(prefix, "--content-block-headlines"),
    ref: containerRef
  }, React.createElement(ContentBlock, {
    heading: heading,
    copy: copy,
    border: true
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-block-headlines__container")
  }, _renderRows(contentRows)))));
};
/**
 * Renders the ContentBlockHeadlines items
 *
 * @param {Array} contentRows array of content rows
 * @private
 * @returns {*} JSX component
 */


var _renderRows = function _renderRows(contentRows) {
  return contentRows.map(function (row, index) {
    return React.createElement("div", {
      className: "".concat(prefix, "--content-block-headlines__row"),
      key: index
    }, React.createElement("div", {
      className: "".concat(prefix, "--content-block-headlines__item-container")
    }, row.map(function (item, index) {
      return React.createElement("div", {
        className: "".concat(prefix, "--content-block-headlines__item"),
        key: index
      }, React.createElement("h4", {
        className: "".concat(prefix, "--content-block-headlines__headline")
      }, item.headline), React.createElement("p", {
        className: "".concat(prefix, "--content-block-headlines__copy")
      }, item.copy), item.cta && React.createElement(CTA, item.cta));
    })));
  });
};
/**
 * Break out items per row
 *
 * @param {Array} array of items
 * @param {number} size number of items per row
 * @private
 * @returns {Array} array of rows
 */


function chunk(array, size) {
  return array.reduce(function (chunks, item, i) {
    if (i % size === 0) {
      chunks.push([item]);
    } else {
      chunks[chunks.length - 1].push(item);
    }

    return chunks;
  }, []);
}

ContentBlockHeadlines.propTypes = {
  /**
   * Heading of the content block.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Intro copy of the content block.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Array of content items.
   * See [CTA](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#text-link) for full usage details.
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    headline: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
    cta: PropTypes.shape({
      type: PropTypes.oneOfType([PropTypes.oneOf(['local', 'download', 'jump', 'external', 'video', 'default']), PropTypes.arrayOf(PropTypes.oneOf(['local', 'download', 'jump', 'external', 'video', 'default']))]),
      copy: PropTypes.string,
      href: PropTypes.string,
      customClassName: PropTypes.string
    })
  })).isRequired
};
export default ContentBlockHeadlines;