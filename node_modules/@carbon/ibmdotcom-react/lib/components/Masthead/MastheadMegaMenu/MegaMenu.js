"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _CategoryGroup = _interopRequireDefault(require("./CategoryGroup"));

var _CategoryLink = _interopRequireDefault(require("./CategoryLink"));

var _LeftNavigation = _interopRequireDefault(require("./LeftNavigation"));

var _NavigationGroup = _interopRequireDefault(require("./NavigationGroup"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _RightNavigation = _interopRequireDefault(require("./RightNavigation"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Masthead megamenu component.
 */
var MegaMenu = function MegaMenu(_ref) {
  var _viewAllLink, _viewAllLink2;

  var data = _ref.data,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["data"]);
  var highlightedItems = [];
  var viewAllLink;
  var menuItems = [];
  data.menuSections[0].menuItems.forEach(function (item) {
    if (item.highlighted) return highlightedItems.push(item);
    if (item.megaPanelViewAll) return viewAllLink = item;else return menuItems.push(item);
  });
  var hasHighlights = highlightedItems.length !== 0;
  return _react.default.createElement(_NavigationGroup.default, {
    hasHighlights: hasHighlights
  }, hasHighlights && _react.default.createElement(_LeftNavigation.default, null, highlightedItems.map(function (item, i) {
    var _item$megapanelConten, _item$megapanelConten2;

    return _react.default.createElement(_CategoryGroup.default, {
      autoid: rest.autoid,
      index: i,
      href: item.url,
      title: item.title
    }, (_item$megapanelConten = item.megapanelContent) === null || _item$megapanelConten === void 0 ? void 0 : (_item$megapanelConten2 = _item$megapanelConten.quickLinks) === null || _item$megapanelConten2 === void 0 ? void 0 : _item$megapanelConten2.links.map(function (_ref2, key) {
      var title = _ref2.title,
          url = _ref2.url;
      return _react.default.createElement(_CategoryLink.default, {
        href: url,
        title: title,
        autoid: "".concat(rest.autoid, "-list").concat(i),
        index: key
      });
    }));
  })), _react.default.createElement(_RightNavigation.default, {
    viewAllLinkHref: (_viewAllLink = viewAllLink) === null || _viewAllLink === void 0 ? void 0 : _viewAllLink.url,
    viewAllLinkTitle: (_viewAllLink2 = viewAllLink) === null || _viewAllLink2 === void 0 ? void 0 : _viewAllLink2.title,
    autoid: rest.autoid
  }, menuItems.map(function (item, i) {
    var _item$megapanelConten3, _item$megapanelConten4;

    return _react.default.createElement(_CategoryGroup.default, {
      key: i,
      autoid: rest.autoid,
      index: i + highlightedItems.length,
      href: item.url,
      title: item.title
    }, (_item$megapanelConten3 = item.megapanelContent) === null || _item$megapanelConten3 === void 0 ? void 0 : (_item$megapanelConten4 = _item$megapanelConten3.quickLinks) === null || _item$megapanelConten4 === void 0 ? void 0 : _item$megapanelConten4.links.map(function (_ref3, key) {
      var title = _ref3.title,
          url = _ref3.url;
      return _react.default.createElement(_CategoryLink.default, {
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
  data: _propTypes.default.shape({
    hasMenupanel: _propTypes.default.bool,
    title: _propTypes.default.string,
    url: _propTypes.default.string,
    menuSections: _propTypes.default.arrayOf(_propTypes.default.shape({
      menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
        highlighted: _propTypes.default.bool,
        title: _propTypes.default.string,
        url: _propTypes.default.string,
        megapanelContent: _propTypes.default.shape({
          quickLinks: _propTypes.default.shape({
            links: _propTypes.default.arrayOf(_propTypes.default.shape({
              title: _propTypes.default.string,
              url: _propTypes.default.string
            }))
          })
        })
      }))
    }))
  })
};
var _default = MegaMenu;
exports.default = _default;