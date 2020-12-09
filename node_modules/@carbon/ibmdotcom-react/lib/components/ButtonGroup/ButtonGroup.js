"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("../../internal/vendor/carbon-components-react/components/Button/Button"));

var _settings = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/settings/settings"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _windowOrGlobal = _interopRequireDefault(require("window-or-global"));

var _sameHeight = _interopRequireDefault(require("@carbon/ibmdotcom-utilities/lib/utilities/sameHeight/sameHeight"));

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
 * Button group.
 */

var ButtonGroup = function ButtonGroup(_ref) {
  var buttons = _ref.buttons,
      enableSizeByContent = _ref.enableSizeByContent;
  var groupRef = (0, _react.useRef)(null);
  var observedPseudoButtonNodesRef = (0, _react.useRef)(new Set());
  var shouldUseResizeObserver = enableSizeByContent && typeof ResizeObserver !== 'undefined';
  var resizeObserverButtonsRef = (0, _react.useRef)(!shouldUseResizeObserver ? null : new ResizeObserver(function (entries) {
    var groups = entries.reduce(function (acc, entry) {
      var group = entry.target.closest('.bx--buttongroup');

      if (group) {
        acc.add(group);
      }

      return acc;
    }, new Set());
    groups.forEach(function (group) {
      var width = Array.prototype.reduce.call(group.querySelectorAll('.bx--buttongroup-item--pseudo .bx--btn'), function (acc, item) {
        return Math.max(acc, item.offsetWidth);
      }, 0);
      var height = Array.prototype.reduce.call(group.querySelectorAll('.bx--buttongroup-item--pseudo .bx--btn'), function (acc, item) {
        return Math.max(acc, item.offsetHeight);
      }, 0);
      var hasWordWrap = height > 48;
      var mobileWidth = _windowOrGlobal.default.innerWidth <= 320;
      Array.prototype.forEach.call(group.querySelectorAll('.bx--buttongroup-item:not(.bx--buttongroup-item--pseudo) .bx--btn'), function (item) {
        item.style.width = mobileWidth ? "100%" : "".concat(width + 1, "px");
        item.classList.toggle("".concat(prefix, "--btn--multiline"), hasWordWrap);
      });
    });
  }));
  (0, _react.useLayoutEffect)(function () {
    var observedPseudoButtonNodes = observedPseudoButtonNodesRef.current;
    var resizeObserverButtons = resizeObserverButtonsRef.current;

    if (shouldUseResizeObserver) {
      var groupNode = groupRef.current;
      observedPseudoButtonNodes.forEach(function (item) {
        if (!groupNode.contains(item)) {
          resizeObserverButtons.unobserve(item);
          observedPseudoButtonNodes.delete(item);
        }
      });
      var latestPseudoButtonNodes = groupNode.querySelectorAll('.bx--buttongroup-item--pseudo .bx--btn');
      Array.prototype.forEach.call(latestPseudoButtonNodes, function (item) {
        if (!observedPseudoButtonNodes.has(item)) {
          resizeObserverButtons.observe(item);
          observedPseudoButtonNodes.add(item);
        }
      });
    } else {
      observedPseudoButtonNodes.forEach(function (item) {
        resizeObserverButtons.unobserve(item);
        observedPseudoButtonNodes.delete(item);
      });
    }
  }, [buttons, shouldUseResizeObserver]);
  (0, _react.useEffect)(function () {
    return function () {
      var resizeObserverButtons = resizeObserverButtonsRef.current;

      if (resizeObserverButtons) {
        resizeObserverButtons.disconnect();
      }
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (buttons.length > 1) {
      setSameHeight();

      _windowOrGlobal.default.addEventListener('resize', setSameHeight);

      return function () {
        return _windowOrGlobal.default.removeEventListener('resize', setSameHeight);
      };
    }
  }, [buttons]);
  /**
   * Set the buttons to have the same height based on the tallest one
   */

  var setSameHeight = function setSameHeight() {
    _windowOrGlobal.default.requestAnimationFrame(function () {
      var containerNode = groupRef.current;

      if (containerNode) {
        (0, _sameHeight.default)(containerNode.getElementsByClassName("".concat(prefix, "--buttongroup-item")));
      }
    });
  };

  return _react.default.createElement("ol", {
    className: "".concat(prefix, "--buttongroup"),
    "data-autoid": "".concat(stablePrefix, "--button-group"),
    ref: groupRef
  }, buttons.map(function (button, key) {
    return _react.default.createElement(_react.Fragment, {
      key: key
    }, _react.default.createElement("li", {
      className: "".concat(prefix, "--buttongroup-item")
    }, _react.default.createElement(_Button.default, (0, _extends2.default)({
      "data-autoid": "".concat(stablePrefix, "--button-group-").concat(key)
    }, button, {
      type: "button",
      kind: key === buttons.length - 1 ? 'primary' : 'tertiary'
    }), button.copy)), !shouldUseResizeObserver ? undefined : _react.default.createElement("li", {
      className: "".concat(prefix, "--buttongroup-item ").concat(prefix, "--buttongroup-item--pseudo")
    }, _react.default.createElement(_Button.default, (0, _extends2.default)({
      tabIndex: -1
    }, button, {
      type: "button",
      kind: key === buttons.length - 1 ? 'primary' : 'tertiary'
    }), button.copy)));
  }));
};

ButtonGroup.propTypes = {
  /**
   * Array of button objects to render.
   * Use the following for each items:
   *
   * | Name         | Data Type | Description                                                                                                                    |
   * | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
   * | `href`       | String    | URL for the button item                                                                                                        |
   * | `copy`       | String    | Button copy                                                                                                                    |
   * | `renderIcon` | Object    | Provide an optional icon for the CTA from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |
   *
   * Visit the [Button documentation](http://react.carbondesignsystem.com/?path=/story/buttons--default)
   * from Carbon for a full list of available props.
   */
  buttons: _propTypes.default.arrayOf(_propTypes.default.shape({
    copy: _propTypes.default.string.isRequired,
    href: _propTypes.default.string.isRequired,
    renderIcon: _propTypes.default.elementType
  })).isRequired,

  /**
   * `true` to make the buttons change their sizes by their contents.
   */
  enableSizeByContent: _propTypes.default.bool
};
ButtonGroup.defaultProps = {
  enableSizeByContent: true
};
var _default = ButtonGroup;
exports.default = _default;