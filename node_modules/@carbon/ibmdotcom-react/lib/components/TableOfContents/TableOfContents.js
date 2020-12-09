"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _HorizontalRule = require("../HorizontalRule");

var _Layout = _interopRequireDefault(require("../Layout/Layout"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _settings2 = _interopRequireDefault(require("carbon-components/umd/globals/js/settings"));

var _TOCDesktop = _interopRequireDefault(require("./TOCDesktop"));

var _TOCMobile = _interopRequireDefault(require("./TOCMobile"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var stablePrefix = _settings.default.stablePrefix;
var prefix = _settings2.default.prefix;
/**
 * loops into the array of elements and returns the values
 *
 * @private
 * @returns {Array} returns elemenrt name and data title
 */

var _findMenuItems = function _findMenuItems() {
  var eles = document.querySelectorAll('a[name]');
  var menuItems = [];
  eles.forEach(function (element) {
    if (element.getAttribute('name') !== 'menuLabel') {
      menuItems.push({
        id: element.getAttribute('name'),
        title: element.getAttribute('data-title') || ''
      });
    }
  });
  return menuItems;
};
/**
 * Table of Contents pattern.
 */


var TableOfContents = function TableOfContents(_ref) {
  var menuItems = _ref.menuItems,
      children = _ref.children,
      menuLabel = _ref.menuLabel,
      theme = _ref.theme,
      stickyOffset = _ref.stickyOffset,
      menuRule = _ref.menuRule,
      headingContent = _ref.headingContent;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      useMenuItems = _useState2[0],
      setUseMenuItems = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedId = _useState4[0],
      setSelectedId = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      selectedTitle = _useState6[0],
      setSelectedTitle = _useState6[1];

  (0, _react.useEffect)(function () {
    if (menuItems === null || menuItems === void 0 ? void 0 : menuItems.length) {
      setUseMenuItems((0, _toConsumableArray2.default)(menuItems));
    } else {
      setUseMenuItems(_findMenuItems());
    }
  }, [menuItems]);
  (0, _react.useEffect)(function () {
    var id = useMenuItems[0] ? useMenuItems[0].id : '';
    var title = useMenuItems[0] ? useMenuItems[0].title : '';

    if (id === 'menuLabel' && useMenuItems[1]) {
      id = useMenuItems[1].id;
      title = useMenuItems[1].title;
    }

    setSelectedId(id);
    setSelectedTitle(title);
  }, [useMenuItems]);
  (0, _react.useEffect)(function () {
    /**
     * Function to be added to eventListener and cleaned later on
     */
    var handleRAF = function handleRAF() {
      window.requestAnimationFrame(setSelectedItem);
    };

    window.addEventListener('scroll', handleRAF);
    return function () {
      return window.removeEventListener('scroll', handleRAF);
    };
  });
  /**
   * Set selected id & title
   *
   */

  var setSelectedItem = function setSelectedItem() {
    var elems = getElemsInView();

    if (elems) {
      var _filteredItems$;

      var id = elems || useMenuItems[0].id;
      var filteredItems = useMenuItems.filter(function (menu) {
        if (id !== 'undefined') {
          return menu.id === id;
        }
      });
      var title = (_filteredItems$ = filteredItems[0]) === null || _filteredItems$ === void 0 ? void 0 : _filteredItems$.title;

      if (title !== undefined) {
        setSelectedId(id);
        setSelectedTitle(title);
      }
    }
  };
  /**
   * Check whether provided anchor tags are in visible viewport
   *
   * @returns {string} name attribute
   */


  var getElemsInView = function getElemsInView() {
    var items = (0, _toConsumableArray2.default)(document.querySelectorAll('a[name]')).map(function (elem, index, arr) {
      return {
        elem: elem,
        height: arr[index + 1] ? arr[index + 1].getBoundingClientRect().y - elem.getBoundingClientRect().y : null,
        position: elem.getBoundingClientRect().y
      };
    }).filter(function (elem, index, arr) {
      return elem.height === null ? arr[index - 1].position < arr[index - 1].height : elem.position - 50 > -elem.height;
    });
    return items[0].elem.getAttribute('name');
  };
  /**
   * Sets the selected menu item
   *
   * @param {*} id selected id of menu item
   * @param {*} title selected title of menu item
   */


  var updateState = function updateState(id, title) {
    setSelectedId(id);
    setSelectedTitle(title);
  };
  /**
   * Props for the Layout component
   *
   * @type {{marginBottom: string, type: string, marginTop: string}}
   */


  var layoutProps = {
    type: '1-3'
  };
  /**
   * Validate if the Menu Items has Id and Title filled
   *
   * @param {Array} menuItems array of Items
   * @returns {Array} filtered array of items
   */

  var validateMenuItems = function validateMenuItems(menuItems) {
    return menuItems.filter(function (item) {
      return item.title.trim().length > 0 && item.id.trim().length > 0;
    });
  };
  /**
   * Props for TOCDesktop and TOCMobile
   *
   * @type {{
   * updateState: Function,
   * selectedId: string,
   * menuItems: Array,
   * selectedTitle: string,
   * menuLabel: string
   * children: object
   * }}
   */


  var props = {
    menuItems: validateMenuItems(useMenuItems),
    selectedId: selectedId,
    selectedTitle: selectedTitle,
    menuLabel: menuLabel,
    updateState: updateState,
    children: children.length > 1 ? children[0] : null
  };
  /**
   * Render TableOfContents pattern
   *
   * @returns {*} JSX Object
   */

  return _react.default.createElement("section", {
    "data-autoid": "".concat(stablePrefix, "--tableofcontents"),
    className: (0, _classnames.default)("".concat(prefix, "--tableofcontents"), (0, _defineProperty2.default)({}, "".concat(prefix, "--tableofcontents--").concat(theme), theme))
  }, _react.default.createElement(_Layout.default, layoutProps, _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__sidebar")
  }, headingContent && _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__desktop__children")
  }, headingContent, menuRule && _react.default.createElement(_HorizontalRule.HorizontalRule, null)), _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__mobile-top")
  }), _react.default.createElement("div", {
    style: {
      position: 'sticky',
      top: stickyOffset ? "".concat(stickyOffset, "px") : 0
    }
  }, _react.default.createElement(_TOCDesktop.default, (0, _extends2.default)({
    menuRule: menuRule,
    headingContent: headingContent
  }, props)), _react.default.createElement(_TOCMobile.default, props))), _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__content")
  }, _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__content-wrapper")
  }, headingContent !== undefined ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "".concat(prefix, "--tableofcontents__children__mobile")
  }, headingContent), children) : children))));
};

TableOfContents.propTypes = {
  /**
   * Array of menu item objects to render within the side nav.
   * Each items has the following structure:
   *
   * | Properties Name | Data Type | Description     |
   * | --------------- | --------- | --------------- |
   * | title           | String    | Menu title text |
   * | id              | String    | Menu id         |
   *
   * If `menuItems` is not passed in as a prop, the menu items are dynamically
   * generated based on anchor links that exist on the page. The anchor links should
   * follow the following format:
   *
   * ```html
   * <a name="name-of-section" data-title="Lorem Ipsum"></a>
   * ```
   */
  menuItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string.isRequired,
    id: _propTypes.default.string.isRequired
  })),

  /**
   * Content to display next to the side nav.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),

  /**
   * Placeholder value for menu label.
   */
  menuLabel: _propTypes.default.string,

  /**
   * Defines the color theme for the pattern. Choose from:
   *
   * | Name            | Description                              |
   * | --------------- | ---------------------------------------- |
   * | white / default | White theme applied to pattern           |
   * | g10             | Gray 10 (g10) theme applied to pattern   |
   * | g100            | Gray 100 (g100) theme applied to pattern |
   */
  theme: _propTypes.default.oneOf(['white', 'g10', 'g100']),

  /**
   * Defines the offset for the sticky column.
   */
  stickyOffset: _propTypes.default.number,

  /**
   * Defines if the menu ruler will be rendered.
   */
  menuRule: _propTypes.default.bool,

  /**
   * Content to be displayed above the navigation menu.
   */
  headingContent: _propTypes.default.node
};
TableOfContents.defaultProps = {
  menuItems: null,
  menuLabel: 'Jump to',
  theme: 'white',
  stickyOffset: null
};
var _default = TableOfContents;
exports.default = _default;