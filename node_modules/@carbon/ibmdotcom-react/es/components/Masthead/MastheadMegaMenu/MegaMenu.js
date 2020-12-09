import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CategoryGroup from './CategoryGroup';
import CategoryLink from './CategoryLink';
import LeftNavigation from './LeftNavigation';
import NavigationGroup from './NavigationGroup';
import PropTypes from 'prop-types';
import React from 'react';
import RightNavigation from './RightNavigation';
/**
 * Masthead megamenu component.
 */

var MegaMenu = function MegaMenu(_ref) {
  var _viewAllLink, _viewAllLink2;

  var data = _ref.data,
      rest = _objectWithoutProperties(_ref, ["data"]);

  var highlightedItems = [];
  var viewAllLink;
  var menuItems = [];
  data.menuSections[0].menuItems.forEach(function (item) {
    if (item.highlighted) return highlightedItems.push(item);
    if (item.megaPanelViewAll) return viewAllLink = item;else return menuItems.push(item);
  });
  var hasHighlights = highlightedItems.length !== 0;
  return React.createElement(NavigationGroup, {
    hasHighlights: hasHighlights
  }, hasHighlights && React.createElement(LeftNavigation, null, highlightedItems.map(function (item, i) {
    var _item$megapanelConten, _item$megapanelConten2;

    return React.createElement(CategoryGroup, {
      autoid: rest.autoid,
      index: i,
      href: item.url,
      title: item.title
    }, (_item$megapanelConten = item.megapanelContent) === null || _item$megapanelConten === void 0 ? void 0 : (_item$megapanelConten2 = _item$megapanelConten.quickLinks) === null || _item$megapanelConten2 === void 0 ? void 0 : _item$megapanelConten2.links.map(function (_ref2, key) {
      var title = _ref2.title,
          url = _ref2.url;
      return React.createElement(CategoryLink, {
        href: url,
        title: title,
        autoid: "".concat(rest.autoid, "-list").concat(i),
        index: key
      });
    }));
  })), React.createElement(RightNavigation, {
    viewAllLinkHref: (_viewAllLink = viewAllLink) === null || _viewAllLink === void 0 ? void 0 : _viewAllLink.url,
    viewAllLinkTitle: (_viewAllLink2 = viewAllLink) === null || _viewAllLink2 === void 0 ? void 0 : _viewAllLink2.title,
    autoid: rest.autoid
  }, menuItems.map(function (item, i) {
    var _item$megapanelConten3, _item$megapanelConten4;

    return React.createElement(CategoryGroup, {
      key: i,
      autoid: rest.autoid,
      index: i + highlightedItems.length,
      href: item.url,
      title: item.title
    }, (_item$megapanelConten3 = item.megapanelContent) === null || _item$megapanelConten3 === void 0 ? void 0 : (_item$megapanelConten4 = _item$megapanelConten3.quickLinks) === null || _item$megapanelConten4 === void 0 ? void 0 : _item$megapanelConten4.links.map(function (_ref3, key) {
      var title = _ref3.title,
          url = _ref3.url;
      return React.createElement(CategoryLink, {
        key: key,
        href: url,
        title: title,
        autoid: "".concat(rest.autoid, "-list").concat(i + highlightedItems.length),
        index: key
      });
    }));
  })));
};

MegaMenu.propTypes = {
  /**
   * Object containing megamenu nav data
   */
  data: PropTypes.shape({
    hasMenupanel: PropTypes.bool,
    title: PropTypes.string,
    url: PropTypes.string,
    menuSections: PropTypes.arrayOf(PropTypes.shape({
      menuItems: PropTypes.arrayOf(PropTypes.shape({
        highlighted: PropTypes.bool,
        title: PropTypes.string,
        url: PropTypes.string,
        megapanelContent: PropTypes.shape({
          quickLinks: PropTypes.shape({
            links: PropTypes.arrayOf(PropTypes.shape({
              title: PropTypes.string,
              url: PropTypes.string
            }))
          })
        })
      }))
    }))
  })
};
export default MegaMenu;