import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import { CTA } from '../../../components/CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * ContentArrayGroup Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {*} props.children JSX Components
 * @param {string} props.heading  Heading string
 * @param {string} props.className optional class to be applied to the containing node
 * @param {*} props.cta CTA component props object
 * @returns {*} JSX ContentGroup component
 */

var ContentGroup = function ContentGroup(_ref) {
  var children = _ref.children,
      heading = _ref.heading,
      customClassName = _ref.customClassName,
      cta = _ref.cta,
      copy = _ref.copy;
  var className = classNames("".concat(prefix, "--content-group"), customClassName);
  return React.createElement("div", {
    className: className,
    "data-autoid": "".concat(stablePrefix, "--content-group")
  }, React.createElement("h3", {
    "data-autoid": "".concat(stablePrefix, "--content-group__title"),
    className: "".concat(prefix, "--content-group__title")
  }, heading), copy && React.createElement("div", {
    className: "".concat(prefix, "--content-group__copy"),
    dangerouslySetInnerHTML: {
      __html: markdownToHtml(copy, {
        bold: false
      })
    }
  }), React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group__children"),
    className: classNames("".concat(prefix, "--content-group__col"), "".concat(prefix, "--content-group__children"))
  }, children), cta && React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-group__cta"),
    className: "".concat(prefix, "--content-group__cta-row")
  }, React.createElement(CTA, _extends({
    customClassName: "".concat(prefix, "--content-group__cta"),
    style: "card"
  }, cta))));
};

ContentGroup.propTypes = {
  /**
   * Heading text.
   */
  heading: PropTypes.string,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: PropTypes.string,

  /**
   * Container for other components.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

  /**
   * Class to be applied to the containing node.
   */
  customClassName: PropTypes.string,

  /**
   * CTA. Allowed style is `card` and type is `local`.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    type: PropTypes.oneOf(['local']),
    copy: PropTypes.string,
    customClassName: PropTypes.string
  })
};
export default ContentGroup;