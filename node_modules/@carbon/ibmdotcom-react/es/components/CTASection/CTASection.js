import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import ContentItem from '../../internal/components/ContentItem/ContentItem';
import { CTA } from '../CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * CTASection pattern.
 */

var CTASection = function CTASection(_ref) {
  var _classNames;

  var heading = _ref.heading,
      copy = _ref.copy,
      cta = _ref.cta,
      items = _ref.items,
      theme = _ref.theme;
  var containerRef = useRef();
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
        sameHeight(containerNode.getElementsByClassName("".concat(prefix, "--content-item__copy")), 'md');
      }
    });
  };

  return React.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--cta-section"),
    className: classNames("".concat(prefix, "--cta-section"), (_classNames = {}, _defineProperty(_classNames, "".concat(prefix, "--cta-section__has-items"), items), _defineProperty(_classNames, "".concat(prefix, "--cta-section--").concat(theme), theme), _classNames)),
    ref: containerRef
  }, React.createElement(ContentBlock, {
    heading: heading,
    copy: copy
  }), React.createElement(CTA, _extends({
    customClassName: "".concat(prefix, "--cta-section__cta")
  }, cta)), items && React.createElement("div", {
    className: "".concat(prefix, "--helper-wrapper")
  }, React.createElement("div", {
    className: "".concat(prefix, "--content-item-wrapper")
  }, items.map(function (item, index) {
    return React.createElement(ContentItem, {
      key: index,
      heading: item.heading,
      copy: item.copy,
      cta: item.cta
    });
  }))));
};

CTASection.propTypes = {
  /**
   * The heading for the CTA Section pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * The copy for the CTA Section pattern.
   */
  copy: PropTypes.string.isRequired,

  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
    type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']))]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string
  }),

  /**
   * Color theme for pattern.
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * The `<ContentItem>` data to render.
   * See the [`<ContentItem>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-sub-patterms-contentitem--default#props) for full usage details.
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    copy: PropTypes.string,
    cta: PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.shape({
        style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
        type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video', 'default']))]),
        copy: PropTypes.string,
        href: PropTypes.string,
        customClassName: PropTypes.string
      })
    })
  }))
};
export default CTASection;