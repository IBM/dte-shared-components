import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CTA } from '../../../components/CTA';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { HorizontalRule } from '../../../components/HorizontalRule';
import { Layout } from '../../../components/Layout';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * ContentBlock internal component
 */

var ContentBlock = function ContentBlock(_ref) {
  var heading = _ref.heading,
      copy = _ref.copy,
      children = _ref.children,
      customClassName = _ref.customClassName,
      cta = _ref.cta,
      aside = _ref.aside,
      border = _ref.border;
  var classnames = cx("".concat(prefix, "--content-block"), customClassName);
  var setborder = aside ? false : border;
  var content = React.createElement(React.Fragment, null, copy && React.createElement("div", {
    className: "".concat(prefix, "--content-block__copy"),
    dangerouslySetInnerHTML: {
      __html: markdownToHtml(copy, {
        bold: false
      })
    }
  }), React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block__children"),
    className: "".concat(prefix, "--content-block__children")
  }, children), cta && _renderCTA(cta));
  var title = React.createElement("div", null, heading && React.createElement("h2", {
    "data-autoid": "".concat(stablePrefix, "--content-block__heading"),
    className: "".concat(prefix, "--content-block__heading")
  }, heading));
  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block"),
    className: classnames
  }, aside && aside.items ? _layoutWrap(React.createElement(React.Fragment, null, title, React.createElement("div", null))) : title, aside && aside.items ? _layoutWrap(React.createElement(React.Fragment, null, React.createElement("div", null, content), React.createElement("aside", null, aside.items)), aside.border) : content, setborder ? React.createElement(HorizontalRule, null) : '');
};
/**
 * wraps content in layout component
 *
 * @private
 * @param {Element} content content elements
 * @param {boolean} border set border or not
 * @returns {*} jsx cta component
 */


var _layoutWrap = function _layoutWrap(content, border) {
  return React.createElement(Layout, {
    type: "2-1",
    nested: true,
    border: border
  }, content.props.children);
};
/**
 * sets the class name based on theme type
 *
 * @private
 * @param {object} cta a cta object
 * @returns {*} jsx cta component
 */


function _renderCTA(cta) {
  if (cta.style === 'feature') {
    return React.createElement(CTA, _extends({
      customClassName: cx("".concat(prefix, "--content-block__cta"))
    }, cta));
  }

  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--content-block__cta"),
    className: "".concat(prefix, "--content-block__cta-row")
  }, React.createElement(CTA, _extends({
    customClassName: "".concat(prefix, "--content-block__cta ").concat(prefix, "--content-block__cta-col")
  }, cta)));
}

ContentBlock.propTypes = {
  /**
   * Heading text.
   */
  heading: PropTypes.string,

  /**
   * Copy text.
   */
  copy: PropTypes.string,

  /**
   * Children elements passed into `ContentBlock` to be rendered.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
    type: PropTypes.oneOfType([PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']), PropTypes.arrayOf(PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']))]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string
  }),

  /**
   * Custom className to wrap the `<ContentBlock>` component.
   */
  customClassName: PropTypes.string,

  /**
   * Object containing elements to be rendered within `<aside>` html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: PropTypes.shape({
    items: PropTypes.element,
    border: PropTypes.bool
  }),

  /**
   * border for content block.
   */
  border: PropTypes.bool
};
ContentBlock.defaultProps = {
  border: false
};
export default ContentBlock;